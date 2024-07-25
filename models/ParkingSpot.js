class ParkingSpot{
    constructor(id,floor,size,number){
        this.id=id,
        this.floor=floor,
        this.number=number,
        this.size=size,
        this.isOccupied=false,
        this.vechial=null
    }
}

module.exports=ParkingSpot