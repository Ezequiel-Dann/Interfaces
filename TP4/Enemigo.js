class Enemigo extends Personaje {


    constructor() {
        super();
        
        this.enemigo = document.createElement("div");
        this.enemigo.classList.add("enemigo");
        document.getElementById("contenedor").appendChild(this.enemigo);


    }

    stop(){
        this.enemigo.classList.add("stopAnimation");
    }
    isPast(runner){
        let runnerHitbox = runner.getHitbox();
        let myHitbox = this.enemigo.getBoundingClientRect();
        if(runnerHitbox.getLeft() > myHitbox.right){
            return true;
        }
        return false;
    }

    collides(runner){
        let runnerHitbox = runner.getHitbox();
        let myHitbox = this.enemigo.getBoundingClientRect();
        

        if(!(runnerHitbox.getRight() < myHitbox.left ||
            runnerHitbox.getLeft() > myHitbox.right ||
            runnerHitbox.getBottom() < myHitbox.top ||
            runnerHitbox.getTop() > myHitbox.bottom)) {
                console.log("runner" + runnerHitbox);
                console.log(runnerHitbox);
                console.log("obstacle");
                console.log(myHitbox);
                return true;
        }
        return false;
    }
    status() {
        super.status();
    }
}