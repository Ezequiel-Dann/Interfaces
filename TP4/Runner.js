class Runner extends Personaje {

    constructor() {
        super();
        this.personaje = document.getElementById("personaje");
        this.hitboxCalc = new RunningHitboxCalc();
        //achicar el rectangulo que se usa para la deteccion de colision para que no sea todo el div que se usa para la animacion
        /*console.log(this.hitbox);
        this.hitbox.setLeft(this.hitbox.getLeft + this.hitbox.width/4);
        this.hitbox.setWidth(this.hitbox.getWidth()/2);
        this.hitbox.setHeight(this.hitbox.getHeight()*2/3);
        console.log(this.personaje.getBoundingClientRect());*/
        
    }

    getHitbox() {
        let pos = this.personaje.getBoundingClientRect();
        return this.hitboxCalc.get(pos.x,pos.y,pos.height,pos.width);
    }

    stop(){
        this.personaje.classList.add("stopAnimation");
    }
    run() {
        this.hitboxCalc = new RunningHitboxCalc();
        this.clean();
        this.personaje.classList.add("running"); 
    }

    createHitbox(){

    }
    roll(){
        //this.hitbox.setHeight(this.hitbox.getHeight*1/2); // hitbox mas chica cuando rollea
        this.hitboxCalc= new RollingHitboxCalc();
        if(this.personaje.classList.contains("running")){
            this.clean();
            this.personaje.classList.add("rolling");
            this.personaje.addEventListener("animationend", () => {
                this.run();
              //  this.restoreHeight();
            }); 
        }
    }
    jump() {
        this.hitboxCalc = new JumpingHitboxCalc();
        if(this.personaje.classList.contains("running")) {       
            this.clean(); 
            this.personaje.classList.add("jumping");
            this.personaje.addEventListener("animationend", () => {
                this.run();
            });
        }
    }

    clean() {
        this.personaje.classList.remove("running"); 
        this.personaje.classList.remove("jumping");
        this.personaje.classList.remove("rolling"); 
        this.personaje.removeEventListener("animationend", () => {}); 
    }
}


