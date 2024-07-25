const Vehicle = require('../models/Vehicle');

class VehicleFactory {
  createVehicle(numberPlate, type) {
    return new Vehicle(numberPlate, type);
  }
}

module.exports = VehicleFactory;