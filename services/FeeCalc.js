class FeeCalc{
    calcFee(transaction){
        const duration = (transaction.exitTime - transaction.entryTime) / 1000; // duration in seconds
        let rate;
        switch (transaction.vehicle.type) {
          case 'motorcycle':
            rate = 1; // Rate per second for motorcycle
            break;
          case 'car':
            rate = 2; // Rate per second for car
            break;
          case 'bus':
            rate = 3; // Rate per second for bus
            break;
          default:
            rate = 0;
        }
        return duration * rate;
      
    }

}
module.exports=FeeCalc