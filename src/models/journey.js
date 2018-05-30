class Journey{

  constructor(origin, destination, datetime){
    this.origin = origin;
    this.destination = destination;
    this.datetime = datetime
  }

  isComplete(){

    return this.origin &&
        this.destination &&
        this.datetime &&
        this.travelers;

  }



}

module.exports = Journey;