class Sale {
    constructor( fullName, price, type, isSold) {
       this.fullName = fullName;
       this.price = price;
       this.type = type;
       this.isSold = isSold;
      }
setIsSold(val){
    this.isSold = val;
}
}

export default Sale;