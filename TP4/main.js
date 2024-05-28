"use strict"

let runner = new Runner();
let obstacles = [];
let waitingForDelete = [];
let background = document.getElementById("cielo");
let piso = document.getElementById("piso");
const timeLimit = 60000;
let timePassed=0;
let enemyMaxInterval = 1200

document.addEventListener('keydown', (e) => {
    if(e.key=="ArrowDown"){
        runner.roll();
    }else if(e.key=="ArrowUp"){
        runner.jump();
    }

});

let clock = document.getElementById("clock");
let clocknr = 60;
/* cada 50 milisegundos verifica estado del juego */
let gameLoopInterval = setInterval(gameLoop, 50);



/* cada 1 segundo genera un enemigo */
let enemyGeneration = setInterval(generarEnemigo, 1200);



/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {
    if(timePassed<timeLimit){


        if(timePassed%1000==0){
            clock.innerHTML=clocknr--;
        }
        timePassed+=50;




        let seguir=true;
        while(seguir && obstacles.length>0){
            if(obstacles[0].isPast(runner)){                     //el obstaculo ya fue superado
                obstacles.shift();
       
                //agregarPuntuacion;    //TODO
                               
            }else{                                  
                //como los obstaculos son secuenciales una vez que se encuentra uno que no se haya superado los que le siguen estan mas lejos, por lo que
                //sabemos que aun no van a chocar el personaje
                seguir=false;
                
                if(obstacles[0].collides(runner)){
                    //animar interaccion con obstaculo
                    stopAnimations();
                }
    
            }      
            
        }

    }else{
        stopAnimations();
    }
}

function stopAnimations(){
    clearInterval(enemyGeneration);
    clearInterval(gameLoopInterval);
    background.classList.add("stopAnimation");
    piso.classList.add("stopAnimation");
    runner.stop();
    for (const obstacle of obstacles) {
        obstacle.stop();;
    }
}

function generarEnemigo() {
   let obstacle = new Enemigo();
   obstacles.push(obstacle);
}