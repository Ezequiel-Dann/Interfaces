console.log();


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


let opciones = ["yellow","black","blue","gray","red","white"];
let boton = document.getElementById("boton");
let body = document.getElementById("body");
debugger;
let a = "";
let b = "";
boton.addEventListener("click",()=>{
    if(boton.color!=null){
        boton.classList.remove(boton.color);
        body.classList.remove(body.color);
        a = boton.color;
        b = body.color;
    }
     

    let posicion = Math.floor(Math.random()*opciones.length/2)*2; //elige una posicion par
    boton.color = opciones.splice(posicion,1)[0];                   //saca el color para el boton
    body.color = opciones.splice(posicion,1)[0];                     // y su correspondiente para el body
    if(a!=""){
        opciones.push(a);                                              //se agregan los colores previos a los valores posibles
        opciones.push(b);

    }

    boton.classList.add(boton.color);                  
    body.classList.add(body.color);
});

ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 200, 100);