var gameState = "play"

function preload() {
  alienImg = loadImage("alien.png")
  backgroundImg = loadImage("background.jpg")
  spaceshipImg = loadImage("spaceship.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  ground = createSprite(windowWidth / 2, windowHeight / 2, 10, height * 2)
  ground.velocityX = 0
  ground.velocityY = 2
  ground.addImage(backgroundImg)
  ground.scale = 3

  //alien = createSprite(width / 2, height - 150, 50, 80)
  //alien.addImage(alienImg)
  spaceship = createSprite(width / 2, height - 150, 50, 80)
  spaceship.addImage(spaceshipImg)
  spaceship.scale = 5

  enemyGroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background("blue")

  if (gameState === "play") {
    if (ground.y > height) {
      ground.y = ground.height / 2;
    }

    if (keyDown("left")) {
      spaceship.velocityX = 5
    }

    if (keyDown("right")) {
      spaceship.velocityX = -5
    }
    if (keyDown("space")){
      createBullets()
    }
    if (bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach()
    }

    spawnEnemy()
    drawSprites()
    if (spaceship.isTouching(enemyGroup)) {
      gameState = "end"
    }
  }
  else if (gameState === "end") {
    textSize(32)
    fill("red")
    text("Game Over", windowWidth / 2, windowHeight / 2)
  }
}
function spawnEnemy() {
  if (frameCount % 60 === 0) {
    var enemy = createSprite(Math.round(random(50, width - 50)), 0, 50, 50)
    enemy.velocityY = 5
    enemy.addImage(alienImg)
    enemy.scale = 0.85
    enemyGroup.add(enemy)
    enemy.lifetime = width
  }

}
function createBullets() {
  var bullet = createSprite(spaceship.x, height - 200, 20, 50)
  bullet.velocityY = -4
  bulletGroup.add(bullet)
  bullet.lifetime = width
}