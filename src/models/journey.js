class Journey{
  
  constructor(){

  }

  isComplete(){

    return this.origin &&
        this.destination &&
        this.datetime &&
        this.travelers;

  }



}