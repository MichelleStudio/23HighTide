class Agent{
  constructor(size){
    //this.pos = viewport.position()
    this.pos = createVector(random(250+20,950-20),random(450,650))
    this.size = size

    this.health = parseInt(random(100, 300)); // Life timer
    
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.friction = 0.99 
    
    this.periscope = new Periscope(createVector (this.pos.x, this.pos.y-300), this)
  }
  
  bounceEdges(){
      if(this.pos.x < viewport.deckExtraWidth || this.pos.x > width-viewport.deckExtraWidth){
        this.vel.x *=-.1
    }
      if(this.pos.x < viewport.deckExtraWidth ){
        this.pos.x = viewport.deckExtraWidth
    }
          if(this.pos.x > width-viewport.deckExtraWidth){
        this.pos.x = width - viewport.deckExtraWidth
        this.vel.x *=-.1
    }
      if(this.pos.y < viewport.sceneHeight || this.pos.y > height){
        this.vel.y*=-.1
    }
          if(this.pos.y < viewport.sceneHeight){
        this.pos.y =viewport.sceneHeight
    }
          if(this.pos.y > height ){
        this.pos.y = height
        this.vel.y*=-.1
    }
  }

  move(x,y){
    this.acc.add(x,y)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }  
  
  stretchX() {   
    // render into the viewport deck, stretch x
    if(this.pos.x >= width/2) {
        return(this.pos.x + (this.pos.y - viewport.sceneHeight))
    } else {
        return(this.pos.x - (this.pos.y - viewport.sceneHeight))
    } 
  }
  
  render(){
    if (!this.dead()) {
      push()
      //rect(this.stretchX(), this.pos.y-this.size, 5, this.size);
      //tint(255, this.health);
      imageMode(CENTER);
      image(agentimg,this.stretchX(), this.pos.y,20,44);
      pop()
    }
  }
  
  update() {
      this.health -= 1;
      this.vel.mult(this.friction)
      this.pos.add(this.vel)
      this.bounceEdges()
  }
  
  dead() {
    // close to agent die

    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}