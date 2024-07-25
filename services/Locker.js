class LockService {

    constructor() {
     if(LockService.instance){
      return LockService.instance
     } 
       this.locks={}
       LockService.instance=this
    }
    
    acquireLock(key) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (!this.locks[key]) {
            this.locks[key] = true;
            clearInterval(interval);
            resolve();
          }
        }, 10); 
      });
    }
  
    releaseLock(key) {
      delete this.locks[key];
    }
  }
  
  
  module.exports = new LockService();
  