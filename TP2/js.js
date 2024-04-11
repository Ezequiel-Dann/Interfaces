class Figura {
    constructor(x,y,color){
        this.x=x;
        this.y=y;
        this.color=color;
    }

    dibujar(){
    }

    getY(){
        return this.y;
    }
    getX(){
        return this.x;
    }
    ocupa(x,y){

    }
    getColor(){
        return this.color;
    }

    toString(){
        return this.color +" en posicion x:" + this.x +" y: " + this.y;
    }

    setX(x){
        this.x=x;
    }
    setY(y){
        this.y=y;
    }
}
class Circulo extends Figura{
    constructor(diametro,x,y,color){
        super(x,y,color);
        this.radio=diametro/2;
        this.dibujar;
    }
    dibujar(){
        ctx.beginPath()
        ctx.arc(this.getX(),this.getY(),this.getRadio(),0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    getRadio(){
        return this.radio;
    }

    ocupa(x,y){
        let difEnX = x-this.getX();
        let difEnY = y-this.getY();
        let distanciaACentro = Math.sqrt((difEnX*difEnX) + (difEnY*difEnY));
        if (distanciaACentro>this.radio){
            return false;
        }
        return true;
    }

    toString(){
        return "Circulo " + super.toString();
    }
  
}

class Cuadrado extends Figura{

    constructor(lado,x,y,color){
        super(x,y,color);
        this.lado=lado;
    }
    dibujar(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-this.lado/2,this.y-this.lado/2,this.lado,this.lado);
        ctx.strokeRect(this.x-this.lado/2,this.y-this.lado/2,this.lado,this.lado);
    }

    ocupa(x,y){
        if(x>(this.getX()-this.lado/2) && x<(this.getX()+this.lado/2) &&  // dividido dos poruqe x e y de la figura son el centro
            y>(this.getY()-this.lado/2) && y<(this.getY()+this.lado/2)){
                
            return true
            }
        return false;
    }

    toString(){
        return "Cuadrado " + super.toString();
    }
    
}

class Rectangulo extends Cuadrado{ //es 50% mas ancho que alto

    constructor(ancho,x,y,color){
        super(ancho,x,y,color);
        this.alto = Math.floor(ancho*2/3);
    }
    dibujar(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-this.lado/2,this.y-this.alto/2,this.lado,this.alto);
        ctx.strokeRect(this.x-this.lado/2,this.y-this.alto/2,this.lado,this.alto);
    }
    ocupa(x,y){
        if(x>this.getX()-this.lado/2 && x<this.getX()+this.lado/2 &&  // dividido dos poruqe x e y de la figura son el centro
            y>this.getY()-this.alto/2 && y<this.getY()+this.alto/2){
                
            return true
            }
        return false;
    }

    toString(){
        return "Rectangulo " + super.toString();
    }
}
/*
class MyCanvas {
    constructor(canvas){
        this.asd = "imprimiendo";
        this.figuras= [];
        this._formasPosibles=[Circulo,Cuadrado,Rectangulo];
        this._canvas=canvas;
        this._ctx=this._canvas.getContext('2d');
    }

    crearFigura() {
        let tamanio = Math.floor(20+Math.random()*50);

        let x= Math.floor(Math.random() * (elemCanvas.width-(tamanio/2))); //posicion random, que no haga que la figura quede cortada afuera, puede que haya 1 px cortado por el floor?
        let y= Math.floor(Math.random() * (elemCanvas.height-(tamanio/2)));

        let figura = new this._formasPosibles[Math.floor(Math.random()*this._formasPosibles.length)](tamanio,x,y); //elige un tipo de figura y la crea

        figura.dibujar();
        this.figuras.push(figura); //guarda todas las figuras que creo
    } 

    crearCirculo(){
        let tamanio = Math.floor(20+Math.random()*50);

        let x= Math.floor(Math.random() * (elemCanvas.width-(tamanio/2))); //posicion random, que no haga que la figura quede cortada afuera, puede que haya 1 px cortado por el floor?
        let y= Math.floor(Math.random() * (elemCanvas.height-(tamanio/2)));

        let figura = new Circulo(tamanio,x,y,"red"); //elige un tipo de figura y la crea

        figura.dibujar();
        this.figuras.push(figura);
    }

    crearCuadrado(){
        let tamanio = Math.floor(20+Math.random()*50);

        let x= Math.floor(Math.random() * (elemCanvas.width-(tamanio/2))); //posicion random, que no haga que la figura quede cortada afuera, puede que haya 1 px cortado por el floor?
        let y= Math.floor(Math.random() * (elemCanvas.height-(tamanio/2)));

        let figura = new Cuadrado(tamanio,x,y,"blue"); //elige un tipo de figura y la crea

        figura.dibujar();
        this.figuras.push(figura);
    }

    crearRectangulo(){
        let tamanio = Math.floor(20+Math.random()*50);

        let x= Math.floor(Math.random() * (elemCanvas.width-(tamanio/2))); //posicion random, que no haga que la figura quede cortada afuera, puede que haya 1 px cortado por el floor?
        let y= Math.floor(Math.random() * (elemCanvas.height-(tamanio/2)));

        let figura = new Rectangulo(tamanio,x,y,"green"); //elige un tipo de figura y la crea

        figura.dibujar();
        this.figuras.push(figura);
    }
    
    
}*/

function crearFigura() {
    let tamanio = Math.floor(50+Math.random()*100);
    let x= Math.floor(tamanio/2 + Math.random()*(elemCanvas.width-(tamanio)));
    let y= Math.floor(tamanio/2 + Math.random()*(elemCanvas.height-(tamanio)));
    formasPosibles=[Circulo,Cuadrado,Rectangulo];
    let figura = new formasPosibles[Math.floor(Math.random()*formasPosibles.length)](tamanio,x,y);

    figura.dibujar();
    figuras.push(figura);
    console.log(figuras.length)
}

function crearCirculo(){
    let tamanio = Math.floor(20+Math.random()*50);

    let x= Math.floor(tamanio/2 + Math.random()*(elemCanvas.width-(tamanio)));
    let y= Math.floor(tamanio/2 + Math.random()*(elemCanvas.height-(tamanio)));

    let figura = new Circulo(tamanio,x,y,"red"); //elige un tipo de figura y la crea

    figura.dibujar();
    figuras.push(figura);
}

function crearCuadrado(){
    let tamanio = Math.floor(20+Math.random()*50);

    let x= Math.floor(tamanio/2 + Math.random()*(elemCanvas.width-(tamanio)));
    let y= Math.floor(tamanio/2 + Math.random()*(elemCanvas.height-(tamanio)));

    let figura = new Cuadrado(tamanio,x,y,"blue"); //elige un tipo de figura y la crea

    figura.dibujar();
    figuras.push(figura);
}

function crearRectangulo(){
    let tamanio = Math.floor(20+Math.random()*50);

    let x= Math.floor(tamanio/2 + Math.random()*(elemCanvas.width-(tamanio)));
    let y= Math.floor(tamanio/2 + Math.random()*(elemCanvas.height-(tamanio)));

    let figura = new Rectangulo(tamanio,x,y,"green"); //elige un tipo de figura y la crea

    figura.dibujar();
    figuras.push(figura);
}

function figEnPos(mouseX,mouseY){
    let distancias = elemCanvas.getBoundingClientRect();
    let x = mouseX-distancias.left;
    let y = mouseY-distancias.top;

    for (let index = 0; index < figuras.length; index++) {
        const figura = figuras[index];
        if(figura.ocupa(x,y)){
            figuras.splice(index,1);
            figuras.push(figura);
            return figura;
        }
    }
    return null;
}

function redibujar(){
    ctx.reset();
    for (const figure of figuras) {
        figure.dibujar();
    }
}

let aviso = document.getElementById("aviso");

let arrastrando = false;
let figArrastrada = null;
let inicial = [];
let figuras = [];

const elemCanvas = document.getElementById("myCanvas");
const ctx = elemCanvas.getContext('2d');
elemCanvas.addEventListener("click",(e)=>{


    let fig = figEnPos(e.clientX,e.clientY);
        if (fig!=null){
            aviso.innerHTML="Se clickeo en un "+ fig.toString();
        }else{
            aviso.innerHTML=("No se clickeo en ninguna figura");
        }
})

elemCanvas.addEventListener("mousedown",(e)=>{
    let fig = figEnPos(e.clientX,e.clientY);
    if (fig!=null){
        arrastrando = true;
        figArrastrada = fig;
    }
})

elemCanvas.addEventListener("mouseup",(e)=>{
    arrastrando = false;
    figArrastrada =null;
})

elemCanvas.addEventListener("mousemove",(e)=>{
    if(arrastrando){
        figArrastrada.setX(figArrastrada.getX() + e.movementX);
        figArrastrada.setY(figArrastrada.getY() + e.movementY);
        redibujar();
    }
})



for (let index = 0; index < 4; index++) {
    crearCuadrado();
    crearCirculo();
    crearRectangulo();
    
}
//let objCanvas = new MyCanvas(elemCanvas);

//let boton =document.getElementById("boton");
//boton.addEventListener("click",crearFigura);