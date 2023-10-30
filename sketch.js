var audience = []
var audienceLimit =5

var canvasHeight = 650
var canvasWidth = 1200
var sceneHeight = 450
var agentSize = 50
var viewport
var agent
var agentimg
var periscope
var periscopeimg
var perirollimg

var waveimg

var sea
var dayNight = 0

function preload(){
    agentimg = loadImage('agent.png')
    waveimg = loadImage('waveslice.png')
    periscopeimg = loadImage('cameraappearsprite.png')
    perirollimg = loadImage('camerapansprite.png')
    sunmoonimg = loadImage('sunmooncycle_movedout.png')
    oceansound = createAudio('oceansound.mp3')
}

function setup() { 
  createCanvas(canvasWidth, canvasHeight)
  frameRate(10)
  angleMode(DEGREES)
  
  viewport = new Viewport(sceneHeight)
  
  sea = new Sea(210, 40, 20, 12)
  sea.init()

  //agent = new Agent(agentSize)
  //periscope = new Periscope(createVector (width/3, viewport.sceneHeight/4), agent)
} 

function draw() {
  background(255)

  viewport.render()
  
  if(audience.length < audienceLimit) {
    if(parseInt(random(3))==1) {
      audience.push(new Agent(agentSize))
    }
  }

  for( i=0; i< audience.length; i++) {
    agent = audience[i]
    if(agent.dead()) {
      audience.splice(i,1)   
    } else {
      agent.move(random(-1,1),random(-1,1))
      agent.update()
      agent.render()
      agent.periscope.update()
      agent.periscope.render()
    }
  }
  
  

}  

function mousePressed(){
    getAudioContext().resume() 
    oceansound.play()
    oceansound.loop(true)
    oceansound.volume(0.8)
}