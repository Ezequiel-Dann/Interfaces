"use strict"

class Filtro{
    apply(ctx){};
}

class GrayScale extends Filtro{
    apply(ctx){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let max = imageData.height*imageData.width*4;
        for(let i = 0;i<max;i+=4){
            let gris = (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;
            imageData.data[i]=gris;
            imageData.data[i+1]=gris;
            imageData.data[i+2]=gris;
        }
        ctx.putImageData(imageData,0,0);
    }
}

class Negative extends Filtro{
    apply(ctx){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let max = imageData.height*imageData.width*4;
        for(let i = 0;i<max;i+=4){
            imageData.data[i]=255-imageData.data[i];
            imageData.data[i+1]=255-imageData.data[i+1];
            imageData.data[i+2]=255-imageData.data[i+2];
        }
        ctx.putImageData(imageData,0,0);
    }
}

class Binarization extends Filtro{
    apply(ctx){
        let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        let max = imageData.height*imageData.width*4;
        for(let i = 0;i<max;i+=4){
            let avg = (imageData.data[i]+imageData.data[i+1]+imageData.data[i+2])/3;
            if(avg>255/2){
                imageData.data[i]=255;
                imageData.data[i+1]=255;
                imageData.data[i+2]=255;
            }else{
                imageData.data[i]=0;
                imageData.data[i+1]=0;
                imageData.data[i+2]=0;
            }
        }
        ctx.putImageData(imageData,0,0);
    }
}
class Sepia extends Filtro{
    apply(ctx){
        let imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        let max = imageData.height*imageData.width*4;
        for(let i = 0;i<max;i+=4){
            let red = imageData.data[i];
            let green = imageData.data[i+1];
            let blue = imageData.data[i+2];
            imageData.data[i]=(red * .393) + (green *.769) + (blue * .189);
            imageData.data[i+1]=(red * .349) + (green *.686) + (blue * .168);
            imageData.data[i+2]=(red * .272) + (green *.534) + (blue * .131);
        }
        ctx.putImageData(imageData,0,0);
    }
}

class Blur extends Filtro{

    constructor(offset){
        super();
        this.offset=Math.abs(offset); //offset es la cantidad de pixeles en cada direccion que promedia;

    }

    setOffset(num){
        this.offset=Math.abs(num);
    }

    apply(ctx){
        this.applyPartial(ctx,ctx.canvas.width,ctx.canvas.height);
    }
    applyPartial(ctx,deltaX,deltaY,xStart=0,yStart=0){ //inicio es la posicion donde empieza la zona donde se aplica el filtro y delta es el alto y ancho
        let imageDataOg = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        let imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);

        let cantPixelesBlur = Math.pow(this.offset*2+1,2); // this.offset*2+1 es el tamaño del lado
        for(let x = xStart;x<xStart+deltaX;x++){
            for(let y=yStart;y<yStart+deltaY;y++){   //cada posicion de la matriz
                let r = 0;
                let g = 0;
                let b = 0;
                for(let j =this.offset*-1;j<=this.offset;j++){   //para correr x a izquierda y derecha
                    let xToAvg = x+j;                           //cada x de las posiciones a promediar

                    if(xToAvg<0){                               //si se pasa de los bordes espeja la imagen
                        xToAvg+=Math.abs(j*2);
                    }else if(xToAvg>imageData.width-1){
                        xToAvg = xToAvg - j*2;
                    }
                    
                    for(let k=this.offset*-1;k<=this.offset;k++){          //para correr y abajo y arriba;
                        let yToAvg = y+k;                       //cada y de las posiciones a promediar

                        if(yToAvg<0){                           //si se pasa de los bordes espeja la imagen
                            yToAvg+=Math.abs(k*2)
                        }else if(yToAvg>imageData.height-1){ 
                            yToAvg = yToAvg - k*2;
                        }

                        let indexToAvg = (xToAvg+yToAvg*imageData.width)*4;
                        r+=imageDataOg.data[indexToAvg];          //se suman los valores de cada rgb que hay que promediar
                        g+=imageDataOg.data[indexToAvg+1];
                        b+=imageDataOg.data[indexToAvg+2];
                    }
                }
                r = r/cantPixelesBlur;                  //calculo promedio
                g = g/cantPixelesBlur;
                b = b/cantPixelesBlur;

                let index = (x+y*imageData.width)*4;   //index del pixel que se esta calculando;
                imageData.data[index]=r;
                imageData.data[index+1]=g;
                imageData.data[index+2]=b;
            }

        }
        ctx.putImageData(imageData,0,0);
    }

}

class HSBFilter extends Filtro{  //superclase para los filtros que modifican un valor en la representacion HSB
    // funciona para saturacion y brillo nomas, para que funcione con hue hue tiene que estar entre 0 y 1
    constructor(dValue,posHSB){
        super();
        this.dValue=Math.max(dValue,-1); 
        this.posHSB=posHSB; //indica si se modifica hue, saturation o brightness
    }
    apply(ctx){
        let imageData = ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
        let max = imageData.height*imageData.width*4;

        for(let i = 0;i<max;i+=4){
            let r = imageData.data[i];
            let g = imageData.data[i+1];
            let b = imageData.data[i+2];
            let HSB = toHSB([r,g,b]);            //traduccion del color rgb a hsb

            HSB[this.posHSB] = HSB[this.posHSB]*(1+this.dValue);    //modificacion de un valor hsb
            HSB[this.posHSB]= Math.min(1,HSB[this.posHSB]);

            
            let RGB = toRGB(HSB);                       //traduccion hsb a rgb
            imageData.data[i]=RGB[0];
            imageData.data[i+1]=RGB[1];
            imageData.data[i+2]=RGB[2];   
        }
        ctx.putImageData(imageData,0,0);
    }
}
class Saturation extends HSBFilter{
    constructor(dValue){
        super(dValue,1);
    }
    apply(ctx){
        super.apply(ctx);
    }
}

class Brightness extends HSBFilter{
    constructor(dValue){
        super(dValue,2);
    }
    apply(ctx){
        super.apply(ctx);
    }
}




function toHSB(rgb){ //recibe un arreglo con los valores de rojo verde y azul en las pos 0 1 y 2 respectivamente y devuelve un arreglo con los valor de hue, saturation
                     //y brillo en las posiciones 0 1 y 2 de un arreglo
    let r=rgb[0]/255;
    let g=rgb[1]/255;
    let b=rgb[2]/255;

    let hue = 0;
    let sat = 0;
    let bright = 0;

    let cMax = Math.max(r,g,b);
    let cMin = Math.min(r,g,b);
    let delta = cMax-cMin;

    if(delta!=0){
        if(cMax==r){
            hue = 60 * (((g-b)/delta) % 6);
        }else if(cMax==g){
            hue = 60 * (((b-r)/delta) + 2);
        }else if(cMax==b){
            hue = 60 * (((r-g)/delta) + 4);
        }
        if(cMax!=0){
            sat=delta/cMax;
        }
    }
    if (hue<0){
        hue = 360+hue;
    }

    bright = cMax;

    return [hue,sat,bright];
}

function toRGB(hsb){ //recibe un arreglo con los valores de hue,saturation y brightness en las pos 0 1 y 2 respectivamente y devuelve un arreglo con los valores de rojo verde y azul
                     //en las posiciones 0 1 y 2 de un arreglo

    let hue =hsb[0];
    let sat = hsb[1];
    let bright =hsb[2];
    let c = bright*sat;
    let x = c*(1-Math.abs(((hue/60)%2)-1));
    let m = bright- c;

    let r = 0;
    let g = 0;
    let b = 0;

    let int = Math.floor(hue/60);{
        switch (int) {
            case 0:
                r=c;
                g=x;
                b=0;
                break;
            case 1:
                r=x;
                g=c;
                b=0;
                break;
            case 2:
                r=0;
                g=c;
                b=x;
                break;
            case 3:
                r=0;
                g=x;
                b=c;
                break;
            case 4:
                r=x;
                g=0;
                b=c;
                break;
            case 5:
                r=c;
                g=0;
                b=x;
                break;
            default:
                break;
        }
    }
    r=(r+m)*255;
    g=(g+m)*255;
    b=(b+m)*255;

    return [r,g,b];
}