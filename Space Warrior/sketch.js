//variables
var bg,bgIMG
var ss,ssIMG
var alien1,alien2,alien3,alien4,alien5,alien6,alien7,alien8
var score=0
var gameState="play"
var aliengroup,lasergroup
var laser
var edges
function preload() {
    //loading images
    bgIMG=loadImage("assets/background.jpg")
    ssIMG=loadImage("assets/ship.png")
    alien1=loadImage("assets/crawler.png")
    alien2=loadImage("assets/creeper.png")
    alien3=loadImage("assets/eyefish.png")
    alien4=loadImage("assets/faceeater.png")
    alien5=loadImage("assets/clump.png")
    alien6=loadImage("assets/slender-walker.png")
    alien7=loadImage("assets/spinner.png")
    alien8=loadImage("assets/shooter.png")
}
function setup() {
    createCanvas(1600,700)
    bg=createSprite(800,350,1600,700)
    bg.addImage(bgIMG)
    ss=createSprite(150,350)
    ss.addImage(ssIMG)
    aliengroup=new Group();
    lasergroup=new Group();
}
function draw() {
    background(0);
    drawSprites();
    fill(255);
    textFont("bahnschrift")
    textSize(30);
    text("Score: "+score,50,50)
    if(gameState==="play") {
        if(keyDown(UP_ARROW)) {
            ss.y-=5
        }
        if(keyDown(DOWN_ARROW)) {
            ss.y+=5
        }
        if(keyDown("space")) {
            releaseLaser()
        }
        if(aliengroup.isTouching(ss)) {
            gameState="end"
        }
        lasergroup.isTouching(aliengroup,destroyAlien)
        spawnAliens()
    }
    if(gameState==="end") {
        gameOver()
    }
}
function spawnAliens() {
    if(frameCount%150===0) {
        var rand=Math.round(random(100,600));
        alien=createSprite(1600,rand);
        alien.velocityX=-4
        var randIMG=Math.round(random(1,8))
        switch(randIMG) {
            case 1:
                alien.addImage(alien1)
                alien.scale=2
                alien.velocityX=-1
                break
            case 2:
                alien.addImage(alien2)
                alien.scale=2
                alien.velocityX=-2
                break
            case 3:
                alien.addImage(alien3)
                alien.scale=2
                alien.velocityX=-3
                break
            case 4:
                alien.addImage(alien4)
                alien.scale=2
                alien.velocityX=-4
                break
            case 5:
                alien.addImage(alien5)
                alien.scale=2
                alien.velocityX=-5
                break
            case 6:
                alien.addImage(alien6)
                alien.scale=2
                alien.velocityX=-6
                break
            case 7:
                alien.addImage(alien7)
                alien.scale=2
                alien.velocityX=-7
                break
            case 8:
                alien.addImage(alien8)
                alien.scale=2
                alien.velocityX=-8
                break
        }
        alien.lifetime=600
        aliengroup.add(alien);
    }
}
function releaseLaser() {
    laser=createSprite(200,ss.position.y,60,5)
    laser.shapeColor="red"
    laser.velocityX=10
    laser.lifetime=160
    lasergroup.add(laser)
}
function destroyAlien(laser,alien) {
    alien.destroy()
    lasergroup.destroyEach()
    score+=10
}
function gameOver() {
    aliengroup.destroyEach()
    swal({
        title:`Game Over!`,
        text:"You lost the game",
        imageUrl:"assets/Capture.PNG",
        imageSize:"150x150",
        confirmButtonText:"Play Again",
    },
    function(isConfirm){
        if(isConfirm) {
            location.reload()
        }
    }
    )
}
