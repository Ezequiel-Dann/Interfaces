class Hitbox {
    //necesaria para hacer modificaciones a la hitbox si no queres que sea todo el espacion que ocupa el sprite
    constructor(x,y,height,width){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    
    }
    
    getHeight(){
        return this.height;
    }
    getWidth(){
        return this.width;
    }
    getLeft(){
        return this.x;
    }
    getTop(){
        return this.y;
    }

    getRight(){
        return this.getLeft()+this.getWidth();
    }
    getBottom(){
        return this.getTop()+this.getHeight();
    }
    
    setLeft(left){
        this.x=left;
    }

    setTop(top){
        this.y= top; 
    }

    setWidth(width){
        this.width=width;
    }

    setHeight(height){
        this.height=height;

    }


    overlaps(otherHitbox){
        return (this.getLeft()<otherHitbox.getRight() && 
                this.getRight()>otherHitbox.getLeft() && 
                this.getBottom() > otherHitbox.getTop() && 
                this.getTop < otherHitbox.getBottom())
    }
}