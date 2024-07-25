const ParkingFacade = require('./facade/ParkngFacade');

const parkingFacade = new ParkingFacade();

async function simulateParking() {
  try {
    const spot1 = await parkingFacade.checkIn('ABC123', 'car');
    console.log(`Vehicle ABC123 parked in spot ${spot1.id}`);
    
    const spot2 = await parkingFacade.checkIn('XYZ789', 'car');
    console.log(`Vehicle XYZ789 parked in spot ${spot2.id}`);

    setTimeout(async () => {
      const transaction1 = await parkingFacade.checkOut('ABC123');
      console.log(`Vehicle ABC123 checked out. Fee: $${transaction1.fee}`);

      const transaction2 = await parkingFacade.checkOut('XYZ789');
      console.log(`Vehicle XYZ789 checked out. Fee: $${transaction2.fee}`);
    }, 5000);
  } catch (error) {
    console.error(error.message);
  }
}

simulateParking();
