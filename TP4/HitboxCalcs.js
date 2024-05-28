class HitboxCalc{
    get(x,y,height,width){
    }
}

class RollingHitboxCalc extends HitboxCalc{
    get(x,y,height,width){
        let hitbox = new Hitbox(x+width*0.16,y+height*0.5,height*0.5,width*0.66); //
        return hitbox;
    }
}

class JumpingHitboxCalc extends HitboxCalc{
    get(x,y,height,width){ 
        let hitbox = new Hitbox(x+width*0.16,y,height,width*0.66); // hitbox se mas angosta
        return hitbox;
    }
}

class RunningHitboxCalc extends HitboxCalc{
    get(x,y,height,width){ 
        let hitbox = new Hitbox(x,y,height,width);
        return hitbox;
    }
}
