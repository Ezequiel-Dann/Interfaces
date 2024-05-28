"use strict"

class image{
    constructor(ctx,height,width){
        this.ctx=ctx;
        this.height=height;
        this.width=width;
        this.loaded=false;
        this.imageData=null;
    }

    loadImage(fileName){
        let ogWidth = this.width;
        let ogHeight = this.height;

        let myImg = new Image();
        myImg.src = URL.createObjectURL(fileName);
        let context = this.ctx;
        myImg.onload = function(){
            
            const aspectRatio = this.naturalWidth/this.naturalHeight;
            let targetWidth = ogWidth;
            let targetHeight = ogWidth/aspectRatio;

            if(targetHeight>ogHeight){
                targetHeight=ogHeight;
                targetWidth=targetHeight*aspectRatio;
            }
            context.drawImage(this,0,0,targetWidth,targetWidth);
        }
    }
}

class colorSlots{                           //paleta de colores
    constructor(elements){
        this.slots=[];
        for (const iterator of elements) {
            this.slots.push(iterator);
        }
        this.selected=1;
    }

    select(slot){
        this.slots[this.selected].classList.remove("liSelected");
        this.slots[slot].classList.add("liSelected");
        this.selected=slot;
    }

    getColorSelected(){
       return window.getComputedStyle(this.slots[this.selected]).backgroundColor;
    }
}

function eraseCanvas(ctx,fillStyle){
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

let btnLoad = document.getElementById("btnLoad");
let btnPen = document.getElementById("btnPen");
let btnEraser = document.getElementById("btnEraser");
let btnColorPick = document.getElementById("btnColorPick");
let fileInput = document.getElementById("loadImage");
let btnApplyFilter =document.getElementById("btnApplyFilter");
let btnDownload = document.getElementById("btnDownload");
let filterSelect = document.getElementById("filterSelect");
let btnBlankCanvas = document.getElementById("blankCanvas");
let listaColores = document.querySelectorAll("li");
let customColorElement = document.getElementById("color10");

const canvasColor = "white";
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
eraseCanvas(ctx,canvasColor);
let drawing = false;
let pen = new Pen(ctx,customColorElement);
let myImage = new image(ctx,canvas.width,canvas.height);
let filtro = null;
let btnsTools = [btnEraser,btnPen,btnColorPick];
let colorList = new colorSlots(listaColores);


function changeButtonsAppareance(btnPressed){
    for (const btn of btnsTools) {
        if (btn==btnPressed){
            btn.classList.add("pressed");
            btn.classList.remove("unpressed");
        }else{
            btn.classList.remove("pressed");
            btn.classList.add("unpressed");
        }
    }
}

let num = 0;
for (const li of listaColores) {
    eventAdd(li,num);
    num++;
}

function eventAdd(elem,i){
    elem.addEventListener("click",(e)=>{
        colorList.select(i);
        pen.setColor(colorList.getColorSelected(),i);
    })
}
btnColorPick.addEventListener("click", (e)=>{
    changeButtonsAppareance(e.currentTarget);
    pen.choosePick();
});

btnPen.addEventListener("click",(e)=>{
    changeButtonsAppareance(e.currentTarget);
    pen.choosePencil();
    let slot=pen.getColorSlot()
    colorList.select(pen.getColorSlot());
    pen.setColor(colorList.getColorSelected(),slot);
});

btnEraser.addEventListener("click",(e)=>{
    changeButtonsAppareance(e.currentTarget);
    pen.chooseEraser();
    let slot=pen.getColorSlot()
    colorList.select(slot);
    pen.setColor(colorList.getColorSelected(),slot);
});


btnLoad.addEventListener("click",()=>{
    fileInput.click();
});
btnBlankCanvas.addEventListener("click",()=>{
    eraseCanvas(ctx,canvasColor);
});


btnDownload.addEventListener('click', ()=> {
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    let element = document.createElement('a');
    let filename = 'test.png';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);
  
    element.click();
})

btnApplyFilter.addEventListener("click",(e)=>{      

    switch (filterSelect.value) {                   //esto no me agrada mucho;
        case "1": filtro=new Sepia();
            break;
        case "2": filtro=new Binarization();
            break;
        case "3": filtro=new GrayScale();
            break;
        case "4": filtro=new Negative();
            break;
        case "5": filtro=new Blur(1);
            break;
        case "6": filtro=new Saturation(0.05);
            break;
        case "7": filtro=new Brightness(0.05);
        default:
            break;
    }
        filtro.apply(ctx);
});

fileInput.addEventListener("change",(e)=>{
    
    myImage.loadImage(e.target.files[0]);
    e.target.files.value = null;
});
canvas.addEventListener("mousedown",(e)=>{
    let distances = canvas.getBoundingClientRect();
    let x = e.clientX-distances.left;
    let y = e.clientY-distances.top;

    pen.x=x; //TODO get y set
    pen.y=y;
    pen.useTool(x,y)
    drawing=true;
});

canvas.addEventListener("pointermove",(e)=>{
    let distances = canvas.getBoundingClientRect();
    let x = e.clientX-distances.left;
    let y = e.clientY-distances.top;

    if(drawing==true){                                              
        pen.useTool(x,y);                                           
        for(let coalescedEvent of e.getCoalescedEvents()){          //coalescedEvents tiene todos los eventos que fueron comprimidos a uno solo, para evitar lineas punteadas
            y = coalescedEvent.clientY-distances.top;
            x = coalescedEvent.clientX-distances.left;
            pen.useTool(x,y);
        }
    }
});
document.addEventListener("keydown",(e)=>{
    if(e.key == "+"){
        pen.increaceSize();
    }else if(e.key=="-"){
        pen.decreaceSize();
    }
});
document.addEventListener("mouseup",(e)=>{
    drawing=false;  
})

btnPen.click();