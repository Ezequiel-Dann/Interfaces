class Pen {
    constructor(ctx,customColorElement){
        this._ctx=ctx;
        this.x=0;
        this.y=0;
        this.pencil= new DrawingTool(2,1,0);           
        this.eraser= new Eraser(8,2,1);
        this.colorPick = new ColorPick(1,10,10,customColorElement)
        this.tool=this.pencil;             //herramienta actual
    }

    useTool(toX,toY){
        this.tool.apply(this.x,this.y,this._ctx);
        this.x=toX;
        this.y=toY;
    }
    getColorSlot(){
        return this.tool.getColorSlot();
    }
    getColor(){
        this.tool.getColor();
    }
    setColor(color,slot){
        this.tool.setColor(color,slot);
    }
    chooseEraser(){
        this.tool=this.eraser;
    }
    choosePencil(){
        this.tool=this.pencil;
    }
    choosePick(){
        this.tool=this.colorPick;
    }
    increaceSize(){
        this.tool.setSize(this.tool.getSize()+1);
    }
    decreaceSize(){
        this.tool.setSize(this.tool.getSize()-1);
    }
    setTool(tool){
        this.tool=tool;
    }
    /*draw(x,y){
        if(this.usingPencil){
            ctx.beginPath();
            ctx.strokeStyle = this.penColor.toStringRGBA();
            ctx.lineWidth = 1;
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(x,y);
            ctx.stroke();
            this.x=x;
            this.y=y;
        }else{ //erasing
            ctx.fillStyle = this.eraserColor.asString();
            ctx.fillRect(x,y,this.eraserSize,this.eraserSize);
            
        }
    }*/

    fill(x,y){ //relleno pero muy ineficiente
        let index = (x + y*canvas.width)*4;
        let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);

        let r= imgData.data[index];
        let g = imgData.data[index+1];
        let b = imgData.data[index+2];
        let a = imgData.data[index+3];
        let colorOriginal= new Color(r,g,b,a); //color que se quiere reemplazar

        let positionsX=[x];
        let positionsY=[y];

        if(this.penColor.equals(colorOriginal)){ //si ya es del color que se quiere pintar no hace nada
            return;
        }
        while(positionsX.length>0){ 
            /*cada posicion se guarda en los arreglos positionsX y positionsY
            se pinta el pixel sacado de los arreglos del color del relleno
            cada pixel adjacente del mismo color que el pixel original que se pinto se guarda en los arreglos
            lo intente hacer recursivo pero tiro call stack size exceeded
            */
            let x=positionsX.pop();
            let y=positionsY.pop();

            let index = (x + y*imgData.height)*4;
            
            imgData.data[index]=this.penColor.getRed();                                         //se pinta del color seleccionado
            imgData.data[index+1]=this.penColor.getGreen();
            imgData.data[index+2]=this.penColor.getBlue();
            imgData.data[index+3]=255;

            if(x+1>=0 && x<imgData.width && pixelColor(imgData,index+4).equals(colorOriginal)){
                positionsX.push(x+1);
                positionsY.push(y);
            }
            if(x-1>=0 && x<imgData.width && pixelColor(imgData,index-4).equals(colorOriginal)){
                positionsX.push(x-1);
                positionsY.push(y);
            }
            if(y+1>=0 && y<imgData.height && pixelColor(imgData,index+imgData.height*4).equals(colorOriginal)){
                positionsX.push(x);
                positionsY.push(y+1);
            }
            if(y-1>=0 && y<imgData.height && pixelColor(imgData,index-imgData.height*4).equals(colorOriginal)){
                positionsX.push(x);
                positionsY.push(y-1);
            }
        
        }

        ctx.putImageData(imgData,0,0);
    }


    /*fill3(x,y,colorOriginal,imgData){
        let positionsX=[x];
        let positionsY=[y];
        if(this.penColor.equals(colorOriginal)){
            return;
        }
        while(positionsX.length>0){
            
            let x=positionsX.pop();
            let y=positionsY.pop();

            let index = (x + y*imgData.height)*4;
            console.log("x "+x + "y " + y + "red " + pixelColor(imgData,index).getRed()+ "og red " + colorOriginal.getRed());
            
            imgData.data[index]=this.penColor.getRed();                                         //se pinta del color seleccionado
            imgData.data[index+1]=this.penColor.getGreen();
            imgData.data[index+2]=this.penColor.getBlue();
            imgData.data[index+3]=255;
            console.log("x "+x + "y " + y + "red " + pixelColor(imgData,index).getRed());
            if(x+1>=0 && x<imgData.width && pixelColor(imgData,index+4).equals(colorOriginal)){
                positionsX.push(x+1);
                positionsY.push(y);
            }
            if(x-1>=0 && x<imgData.width && pixelColor(imgData,index-4).equals(colorOriginal)){
                positionsX.push(x-1);
                positionsY.push(y);
            }
            if(y+1>=0 && y<imgData.height && pixelColor(imgData,index+imgData.height*4).equals(colorOriginal)){
                positionsX.push(x);
                positionsY.push(y+1);
            }
            if(y-1>=0 && y<imgData.height && pixelColor(imgData,index-imgData.height*4).equals(colorOriginal)){
                positionsX.push(x);
                positionsY.push(y-1);
            }
        
        }
    }*/
    
    /*fillRecursivp(x,y,colorOriginal,imgData){ //recursivamente pinta los pixeles tira call stack exceeded
        let index = (x + y*canvas.width)*4;
        let color = pixelColor(imgData,index);
        if(x>=0 && x<imgData.width && y>=0 && y<imgData.height && color.equals(colorOriginal)){ //pixel actual existe dentro del canvas y es del color que se esta remplazando
            
            imgData.data[index]=this.penColor.getRed();                                         //se pinta del color seleccionado
            imgData.data[index+1]=this.penColor.getGreen();
            imgData.data[index+2]=this.penColor.getBlue();
            imgData.data[index+3]=255;

            this.fill2(x+1,y,colorOriginal,imgData);            //der
            this.fill2(x-1,y,colorOriginal,imgData);            //izq
            this.fill2(x,y+1,colorOriginal,imgData);            //abajo
            this.fill2(x,y-1,colorOriginal,imgData);            //arriba
        }
    }*/
}

class Tool{
    constructor(size=1,color="rgba(255,255,255,255)",slot){
        this.size=size;
        this.color=color;
        this.colorSlot=slot;
    }

    setSize(size){
        size=Math.max(1,size);
        size=Math.min(50,size);
        this.size=size;

    }
    setColor(color,slot){
        this.color=color;
        this.colorSlot=slot;

    }
    getColorSlot(){
        return this.colorSlot;
    }
    getColor(){
        return this.color;
    }
    getSize(){
        return this.size;
    }
    
}

class DrawingTool extends Tool{   
    apply(x,y,ctx){                     //dibuja un circulo en la posicion x,y, es el lapiz
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(x,y,this.size/2,0,2*Math.PI);
        ctx.fill();
        
        ctx.stroke();
    }
}

class ColorPick extends Tool{   
    constructor(size,color,slot,customColorElement){
        super(size,color,slot);
        this.customColorElement=customColorElement;
    }
    apply(x,y,ctx){                     //guarda el color del pixel donde esta el puntero en la paleta
        y = Math.floor(y);
        x= Math.floor(x);
        let imgData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        let index = (x+y*imgData.width)*4;
        this.color= `rgb(${imgData.data[index]},${imgData.data[index+1]},${imgData.data[index+2]})`;
        this.customColorElement.style.backgroundColor = this.color;
        
    }
}

class Eraser extends Tool{  
    apply(x,y,ctx){                     //crea un cuadrado en la posicion x , y para simular una goma
        let halfSide= this.size/2;
        ctx.fillStyle = this.color;
        ctx.fillRect(x-halfSide,y-halfSide,this.size,this.size);
    }
}