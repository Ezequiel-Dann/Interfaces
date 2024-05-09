class Figure {
    constructor(x,y,color,ctx){
        this.x=x;
        this.y=y;
        this.color=color;
        this._ctx = ctx;
        this.selected = false;
    }

    draw(){
        if(this.selected){
            this._ctx.lineWidth = 5;
            this._ctx.strokeStyle = "red"
        }else{
            this._ctx.lineWidth = 1;
            this._ctx.strokeStyle = "black"
        }
        this._ctx.fillStyle = this.color;
    }

    getY(){
        return this.y;
    }
    getX(){
        return this.x;
    }
    ocuppiesPos(x,y){
    }

    getColor(){
        return this.color;
    }

    toString(){
    }

    select(){
        this.selected = true;
        this.draw();
    }
    deselect(){
        this.selected = false;
        this.draw();
    }
    setX(x){
        this.x=Math.floor(x);
    }
    setY(y){
        this.y=Math.floor(y);
    }
}
class Circle extends Figure{
    constructor(size,x,y,color,ctx){
        super(x,y,color,ctx);
        this.radius=size/2;
        this.draw;
    }
    draw(){
        this._ctx.beginPath();

        super.draw();        
        this._ctx.arc(this.getX(),this.getY(),this.getRadius(),0,2*Math.PI);
        this._ctx.fill();
        
        this._ctx.stroke();
    }

    getRadius(){
        return this.radius;
    }

    ocuppiesPos(x,y){
        let difX = x-this.getX();
        let difY = y-this.getY();
        let distToCenter = Math.sqrt((difX*difX) + (difY*difY));
        if (distToCenter>this.radius){
            return false;
        }
        return true;
    }

    toString(){
        return "Circulo con centro en la posicion x:" + this.getX() + " y:" + this.getY();
    }
  
}

class Square extends Figure{

    constructor(side,x,y,color,ctx){
        super(x,y,color,ctx);
        this.side=side;
    }
    draw(){
        
        super.draw();
        
        this._ctx.fillRect(this.x-this.side/2,this.y-this.side/2,this.side,this.side);
        this._ctx.strokeRect(this.x-this.side/2,this.y-this.side/2,this.side,this.side);
    }

    ocuppiesPos(x,y){
        if(x>(this.getX()-this.side/2) && x<(this.getX()+this.side/2) &&  // dividido dos poruqe x e y de la figure son el centro
            y>(this.getY()-this.side/2) && y<(this.getY()+this.side/2)){
                
            return true
            }
        return false;
    }

    toString(){
        return "Cuadrado con centro en la posicion x:" + this.getX() + " y:" + this.getY();
    }
    
}

class Rectangle extends Square{ //es 50% mas width que height

    constructor(width,x,y,color,ctx){
        super(width,x,y,color,ctx);
        this.height = Math.floor(width*2/3);
    }
    draw(){
        if(this.selected){
            this._ctx.lineWidth = 5;
            this._ctx.strokeStyle = "red"
        }else{
            this._ctx.lineWidth = 1;
            this._ctx.strokeStyle = "black"
        }
        this._ctx.fillStyle = this.color;
        this._ctx.fillRect(this.x-this.side/2,this.y-this.height/2,this.side,this.height);
        this._ctx.strokeRect(this.x-this.side/2,this.y-this.height/2,this.side,this.height);
    }
    ocuppiesPos(x,y){
        if(x>this.getX()-this.side/2 && x<this.getX()+this.side/2 &&  // dividido dos poruqe x e y de la figure son el centro
            y>this.getY()-this.height/2 && y<this.getY()+this.height/2){
                
            return true
            }
        return false;
    }

    toString(){
        return "Rectangulo con centro en la posicion x:" + this.getX() + " y:" + this.getY() ;
    }
}

class MyCanvas {
    constructor(canvas,backgroundColor){
        this.figures= [];
        //this._shapes=[Circle,Square,Rectangle];
        this._canvas=canvas;
        this._ctx=this._canvas.getContext('2d');
        this.background = backgroundColor;
        this.redraw();
    }

    /*addRandomFigure() {
        let size = Math.floor(50+Math.random()*100);
        let x= Math.floor(size/2 + Math.random()*(canvas.width-(size)));
        let y= Math.floor(size/2 + Math.random()*(canvas.height-(size)));
        shapes=[Circle,Square,Rectangle];
        let figure = new shapes[Math.floor(Math.random()*shapes.length)](size,x,y);
    
        figure.draw();
        figures.push(figure);
        console.log(figures.length)
    }*/
    
    addCircle(){
        let size = Math.floor(50+Math.random()*50);
    
        let x= Math.floor(size/2 + Math.random()*(this._canvas.width-(size)));
        let y= Math.floor(size/2 + Math.random()*(this._canvas.height-(size)));
    
        let figure = new Circle(size,x,y,"rgb(204, 46, 209)",ctx); //TODO hardcoded color
    
        figure.draw();
        this.figures.push(figure);
    }
    
    addSquare(){
        let size = Math.floor(50+Math.random()*50);
    
        let x= Math.floor(size/2 + Math.random()*(this._canvas.width-(size)));
        let y= Math.floor(size/2 + Math.random()*(this._canvas.height-(size)));
    
        let figure = new Square(size,x,y,"rgb(51, 209, 46)",ctx); //TODO hardcoded color
    
        figure.draw();
        this.figures.push(figure);
    }
    
    addRectangle(){
        let size = Math.floor(50+Math.random()*50);
    
        let x= Math.floor(size/2 + Math.random()*(this._canvas.width-(size)));
        let y= Math.floor(size/2 + Math.random()*(this._canvas.height-(size)));
    
        let figure = new Rectangle(size,x,y,"blue",ctx); //TODO hardcoded color
    
        figure.draw();
        this.figures.push(figure);
    }
    
    figInPos(mouseX,mouseY){
        let distances = this._canvas.getBoundingClientRect();
        let x = mouseX-distances.left;
        let y = mouseY-distances.top;
    
        for (let index = this.figures.length-1; index >= 0; index--) { //empieza desde el final, entonces selecciona la figura que esta por encima(se dibujo ultima) si se superponen
            const figure = this.figures[index];

            if(figure.ocuppiesPos(x,y)){         
            this.figures.splice(index,1);       //pone la figura al final del arreglo, lo que hace que se dibuje ultima y "quede arriba" cuando se dibuje
                this.figures.push(figure);
                this.redraw();                      //queria dibujar solo la figura y no todo pero tenia problema con el borde resaltado que se sobresalia de la figura
                return figure;
            }
        }
        return null;
    }
    
    redraw(){
        this._ctx.fillStyle = this.background;
        this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height);
        for (const figure of this.figures) {
            figure.draw();
        }
    }
}
    
    
/*
function addRandomFigure() {
    let size = Math.floor(50+Math.random()*100);
    let x= Math.floor(size/2 + Math.random()*(canvas.width-(size)));
    let y= Math.floor(size/2 + Math.random()*(canvas.height-(size)));
    shapes=[Circle,Square,Rectangle];
    let figure = new shapes[Math.floor(Math.random()*shapes.length)](size,x,y);

    figure.draw();
    figures.push(figure);
    console.log(figures.length)
}

function addCircle(){
    let size = Math.floor(20+Math.random()*50);

    let x= Math.floor(size/2 + Math.random()*(canvas.width-(size)));
    let y= Math.floor(size/2 + Math.random()*(canvas.height-(size)));

    let figure = new Circle(size,x,y,"red"); //elige un tipo de figure y la crea

    figure.draw();
    figures.push(figure);
}

function addSquare(){
    let size = Math.floor(20+Math.random()*50);

    let x= Math.floor(size/2 + Math.random()*(canvas.width-(size)));
    let y= Math.floor(size/2 + Math.random()*(canvas.height-(size)));

    let figure = new Square(size,x,y,"blue"); //elige un tipo de figure y la crea

    figure.draw();
    figures.push(figure);
}

function addRectangle(){
    let size = Math.floor(20+Math.random()*50);

    let x= Math.floor(size/2 + Math.random()*(canvas.width-(size)));
    let y= Math.floor(size/2 + Math.random()*(canvas.height-(size)));

    let figure = new Rectangle(size,x,y,"green"); //elige un tipo de figure y la crea

    figure.draw();
    figures.push(figure);
}

function figInPos(mouseX,mouseY){
    let distances = canvas.getBoundingClientRect();
    let x = mouseX-distances.left;
    let y = mouseY-distances.top;

    for (let index = 0; index < figures.length; index++) {
        const figure = figures[index];
        if(figure.ocuppiesPos(x,y)){
            figures.splice(index,1);
            figures.push(figure);
            return figure;
        }
    }
    return null;
}

function redraw(){
    ctx.reset();
    for (const figure of figures) {
        figure.draw();
    }
}*/

let aviso = document.getElementById("aviso");

let isDragging = false;
let draggingFigure = null;
let inicial = [];
let figures = [];

const canvasElement = document.getElementById("myCanvas");
const canvas = new MyCanvas(canvasElement,"#d5b59c");
const ctx = canvasElement.getContext('2d');


canvasElement.addEventListener("mousedown",(e)=>{
    let fig = canvas.figInPos(e.clientX,e.clientY);
    if (fig!=null){
        isDragging = true;
        draggingFigure = fig;
        prevX =e.clientX;
        prevY =e.clientY;
    }
    if(figMovingKey!=null && figMovingKey!=draggingFigure){ //figura seleccionada previamente para mover con flechas es distinta a la que se va a arrastrar
        figMovingKey.deselect();
        figMovingKey=null;
        figEsperando=null;
        canvas.redraw();
    }
})

document.addEventListener("mouseup",(e)=>{  //evento en el document para que se suelte la figura si suelto el click fuera del canvas
    isDragging = false;
    draggingFigure =null;
})
let prevX = null;
let prevY = null;
canvasElement.addEventListener("mousemove",(e)=>{
    if(isDragging){
        draggingFigure.setX(draggingFigure.getX() + e.clientX-prevX);
        draggingFigure.setY(draggingFigure.getY() + e.clientY-prevY);
        prevX= e.clientX;
        prevY = e.clientY;
        canvas.redraw();
    }
})

let figMovingKey = null;
let idTimeout = null;
let waitingForSecondClick = false;
let figEsperando = null;

canvasElement.addEventListener("click",(e)=>{
    let fig = canvas.figInPos(e.clientX,e.clientY);
    if (fig!=null){
         aviso.innerHTML="Se clickeo en un "+ fig.toString();
    }else{
        aviso.innerHTML=("No se clickeo en ninguna figura");
    }
    doubleClickHandler(fig);
})

function doubleClickHandler(fig){
    if(fig!=null && fig == figEsperando){                   //si se hizo click en la misma figura y no paso el timeout se selecciona
        clearTimeout(idTimeout);
        figMovingKey = fig;
        figMovingKey.select();
        return;
    }
    if (fig == null || fig!= figMovingKey){           //se hizo click fuera de la figura que esta moviendose
        /*if (figMovingKey!=null){                     
            figMovingKey.deselect();
            figMovingKey=null;
    
        }*/
        figEsperando = fig;                           //nueva figura esperando ser seleccionada por el segundo click, o null;
        idTimeout = setTimeout(()=>{                //tiempo para hacer el segundo click
            figEsperando = null;
            figMovingKey = null;
        },300);
    return;
    }

}

let startTime;
let accel = 0;

document.addEventListener("keydown",(e)=>{
    if(startTime==null){
        startTime = new Date();
    }
    if(figMovingKey!=null){
        let timeNow = new Date();
        accel = (timeNow.getTime()-startTime.getTime())/300;// el factor de movimiento con flechas aumenta cada 0.3s

        if(e.key=="ArrowUp"){
            figMovingKey.setY(figMovingKey.getY()-Math.max(1,accel));     //se mueve al menos 1 pixel
        }
        if(e.key=="ArrowRight"){
            figMovingKey.setX(figMovingKey.getX()+Math.max(1,accel));
        }
        if(e.key=="ArrowDown"){
            figMovingKey.setY(figMovingKey.getY()+Math.max(1,accel));
        }
        if(e.key=="ArrowLeft"){
            figMovingKey.setX(figMovingKey.getX()-Math.max(1,accel));
        }
        canvas.redraw();

    }
    
});

document.addEventListener("keyup",(e)=>{
    if(e.key=="ArrowUp" || e.key=="ArrowRight" || e.key=="ArrowDown" || e.key=="ArrowLeft"){ //reinicia tiempo inicial de apretado de flechas de movimiento
        startTime = null;
    }
});




for (let index = 0; index < 4; index++) {
    canvas.addSquare();
    canvas.addCircle();
    canvas.addRectangle();
    
}

//let boton =document.getElementById("boton");
//boton.addEventListener("click",addRandomFigure);