class Periscope{
  constructor(l,agent){
    this.agent = agent
    this.viewport = viewport
    this.pos = l.copy()
    this.size = 200
    this.imgs = []
    this.imgCount = 0
    for(let i=0;i<14;i++){
       this.imgs[i] = periscopeimg.get(i*this.size, 0, this.size, this.size)
    }
    
    this.rollimgs = []
    this.rollCount = 0
    this.roll = false
    for(let i=0;i<17;i++){
       this.rollimgs[i] = perirollimg.get(i*this.size, 0, this.size, this.size)
    }
    
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.friction = 0.99 
  }
  
  bounceEdges(){
      if(this.pos.x < viewport.deckExtraWidth+this.size/2 || this.pos.x > width-viewport.deckExtraWidth-this.size){
        this.pos.x = this.size
        this.vel.x *=-0.1
    }
      if(this.pos.y < (this.size+50)/2 || this.pos.y > viewport.sceneHeight - this.size+30){
        this.pos.y =this.size
        this.vel.y*=-0.1
    }
  }

  move(x,y){
    this.acc.add(x,y)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }  

  render(){
    if(this.roll) {
      var imgNo = 8 +   Math.floor(180/PI*Math.atan((this.agent.pos.x-this.pos.x)/(this.pos.y, this.agent.pos.y))/10)
      //console.log(imgNo)
      image(this.rollimgs[imgNo], this.pos.x, this.pos.y, 100, 100) 
    } else {
      image(this.imgs[this.imgCount], this.pos.x, this.pos.y, 100, 100) 
    }
  }
  
  update() {
      if(this.agent.health<20){
        if((this.imgCount > 0) ){
          this.imgCount -= 1
        }
        this.roll = false
      } else {
        if(this.imgCount < 13) {
          this.imgCount += 1
        } else {
          this.roll = true
        }
      }

      this.vel.mult(this.friction)
      this.pos.add(this.vel)
  }
}