export default class User {
    constructor(firstName, lastName, address, email, phoneNumber, username, password,
        role, createTime, reservations, token, loyaltyPoints, tier, id){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.createTime = createTime;
        this.token = token;
        this.reservations = reservations;
        this.loyaltyPoints = loyaltyPoints;
        this.tier = tier;
        this.id = id;
    }
}
