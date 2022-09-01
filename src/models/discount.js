export default class Discount{
    constructor(id,user, tier, loyaltyPoints){
        this.id = id;
        this.user = user;
        this.loyaltyPoints = loyaltyPoints;
        this.tier = tier;
    }
}