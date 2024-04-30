class MessageObserver{
    constructor(){
        this.sentMessage = False;
        this.observer= [];
    }
    update(theUpdate){
        console.log("Message status: " + theUpdate);
    }
    addObserver(observerForMessage){
        this.observer.push(observerForMessage);
    }
    deleteObserver(observerToDelete){
        this.observer = this.observer.filter(x => x != observerToDelete);
    }
    notify() {
        if (this.observer) {
            this.observer.forEach(observer => {
                observer.update(this.isLoggedIn);
            });
        }
    }
    login(){
        this.sentMessage = true;
        this.update(this.sentMessage);
    }
    logout(){
        this.sentMessage= false;
        this.update(this.sentMessage);
    }
}