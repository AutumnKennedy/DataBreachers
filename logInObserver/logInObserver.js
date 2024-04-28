class observer{
    constructor(){
        this.isLoggedIn = False;
        this.observer= [];
    }
    update(theUpdate){
        console.log("Logged in status: " + theUpdate);
    }
    addObserver(observerForLogin){
        this.observer.push(observerForLogin);
    }
    deleteObserver(observerToDelete){
        this.observer = this.observer.filter(x => x != observerToDelete);
    }
    notify() {
        if (this.observer) {
          this.observer.update(this.isLoggedIn);
        }
      }
    login(){
        this.isLoggedIn = true;
        this.update(this.isLoggedIn);
    }
    logout(){
        this.isLoggedIn = false;
        this.update(this.isLoggedIn);
    }
}