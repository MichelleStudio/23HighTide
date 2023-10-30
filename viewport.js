class Viewport {
  constructor(sceneHeight){
    // deck perspective 45 degrees
    this.sceneHeight = sceneHeight
    this.deckExtraWidth = height - sceneHeight
    this.sceneWidth = width - 2 * this.deckExtraWidth
    this.deck = [createVector(this.deckExtraWidth, this.sceneHeight),
                createVector(width-this.deckExtraWidth, this.sceneHeight),
                createVector(0,height),
                createVector(width,height)]
  }
  
  backgroundRadient() {
    push()
    var c2 = color(255, 255, 255, 0)
    var c1 = color(240, 191, 167, 200)
    for(let y=0; y<viewport.sceneHeight; y++){
      var n = map(y,0,height,0,1)
      var newc = lerpColor(c1,c2,n)
      stroke(newc)
      line(this.deckExtraWidth,y,width-this.deckExtraWidth, y)
    } 
    pop()
  }

  sunMoon() {
    dayNight = (dayNight + .5 )%360
    push()
    translate(width/2, height/2+180)
    rotate(dayNight + 90)
    imageMode(CENTER)
    image(sunmoonimg, 0, 0, 1600, 1600)
    pop()
  }
  
  render() {
    this.sunMoon()
    
    
    sea.update()
    sea.render()
    
    this.backgroundRadient()
    
    fill(255)
    noStroke()
    rect(0,0,this.deckExtraWidth,height-this.deckExtraWidth)
    rect(width-this.deckExtraWidth,0,this.deckExtraWidth,height)
    rect(0,height-this.deckExtraWidth,width,this.deckExtraWidth)
    
    stroke(0)
    line(this.deckExtraWidth, this.sceneHeight, 0, height)
    line(width-this.deckExtraWidth, this.sceneHeight, width, height)
    line(0,height,width,height)
    
    
  }
  
}