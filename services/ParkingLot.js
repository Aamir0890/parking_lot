const ParkingSpot = require('../models/ParkingSpot');
const ParkingTrans = require('../models/ParkingTrans');

const lockService = require('./Locker');
const ParkingFeeCalculator = require('./FeeCalc');


class ParkingLot{
    constructor(spots){
           this.spots=spots,
           this.transactions=[],
           this.feeCalculator = new ParkingFeeCalculator();
    }

    async findAvailabelSpace(vechileSize){
         await lockService.acquireLock('spots')
         const spot=this.spots.find(spot=>spot.size===vechileSize&&!spot.isOccupied)
         lockService.releaseLock('spots')
         return spot;
    }

    async checkIn(vehicle){
         const spot=this.findAvailabelSpace(vehicle.type)
         if(spot){
          await lockService.acquireLock(`spot-${spot.id}`);
          if (!spot.isOccupied) {
               spot.isOccupied = true;
               spot.vehicle = vehicle;
               vehicle.entryTime = new Date();
               vehicle.parkingSpot = spot;
               const transaction = new ParkingTrans(vehicle.entryTime, null, vehicle, 0);
               this.transactions.push(transaction);
               lockService.releaseLock(`spot-${spot.id}`);
               return spot;
             } else {
               lockService.releaseLock(`spot-${spot.id}`);
               throw new Error('Spot already occupied. Try again.');
             }
           } else {
             throw new Error('No available parking spot for this vehicle size.');
           }
         }
     
         async checkOut(licensePlate) {
          await lockService.acquireLock('transactions');
    const transaction = this.transactions.find(
      t => t.vehicle.numberPlate === licensePlate && t.exitTime === null
    );
    if (transaction) {
      transaction.exitTime = new Date();
      transaction.vehicle.exitTime = transaction.exitTime;
      const spot = transaction.vehicle.parkingSpot;
      await lockService.acquireLock(`spot-${spot.id}`);
      spot.isOccupied = false;   // Mark the spot as available
      spot.vehicle = null;       // Remove the vehicle reference
      lockService.releaseLock(`spot-${spot.id}`);
      lockService.releaseLock('transactions');
      transaction.fee = this.feeCalculator.calcFee(transaction);
      return transaction;
    } else {
      lockService.releaseLock('transactions');
      throw new Error('Vehicle not found or already checked out.');
    }
        }
}

module.exports=ParkingLot
