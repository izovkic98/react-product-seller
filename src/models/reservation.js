export default class Reservation{
    constructor(user, vehicleModel, vehicleManufacturer, vehicleType, dateFrom, dateTo, reservationDate, 
        price, reservationStatus, parkingType, code){
        this.user = user;
        this.vehicleModel = vehicleModel;
        this.vehicleManufacturer = vehicleManufacturer;
        this.vehicleType = vehicleType;
        this.dateFrom = dateFrom;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.reservationDate = reservationDate;
        this.price = price;
        this.reservationStatus = reservationStatus;
        this.parkingType = parkingType;
        this.code= code;
    }
}