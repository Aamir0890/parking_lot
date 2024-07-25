const ParkingLot = require('../services/ParkingLot');
const VehicleFactory = require('../services/VehicleFactory');
const ParkingSpot = require('../models/ParkingSpot');

class ParkingFacade {
  constructor() {
    const spots = [
      new ParkingSpot(1, 1, 'car', 'C1'),
      new ParkingSpot(2, 1, 'motorcycle', 'M1'),
      new ParkingSpot(3, 1, 'bus', 'B1'),
      new ParkingSpot(4, 1, 'car', 'C2'),
    ];
    this.parkingLot = new ParkingLot(spots);
    this.vehicleFactory = new VehicleFactory();
  }
   
  async checkIn(numberPlate, type) {
    const vehicle = this.vehicleFactory.createVehicle(numberPlate, type);
    return await this.parkingLot.checkIn(vehicle);
  }

  async checkOut(numberPlate) {
    return await this.parkingLot.checkOut(numberPlate);
  }
}

module.exports = ParkingFacade;
