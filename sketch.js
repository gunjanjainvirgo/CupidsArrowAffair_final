var gameState = "wait"
var splash;
var playbutton
var aboutbutton
var bg1;
var player, player_img;
var heart;
var blackheart;
var heart1_img, heart2_img, heart3_img, heart4_img, heart5_img;
var heartGroup;
var blackheartGroup;
var arrow, arrow_img;
var score = 0;
var life, life_img;
var health = 200;
var max_health = 200;
var arrowGroup;
var monster, monster_img;
var evilarrow, evilarrowGroup, evilarrow_img;
var shootSound, checkPointSound, dieSound, winSound, evilarrowSound, background_music;


function preload() {
    splash = loadImage("assets/splash3.gif")
    bg1 = loadImage("assets/bg2.jpg")
    bg2 = loadImage("assets/bg3.jpg")
    player_img = loadImage("assets/cupid.png")
    heart1_img = loadImage("assets/evil_heart2.png")
    heart2_img = loadImage("assets/red_heart.png")
    heart3_img = loadImage("assets/darkblue_heart.png")
    heart4_img = loadImage("assets/pink_heart.png")
    heart5_img = loadImage("assets/yellow_heart.png")
    arrow_img = loadImage("assets/red_arrow2.png")
    life_img = loadImage("assets/life.png")
    monster_img = loadImage("assets/monster1.png")
    evilarrow_img = loadImage("assets/evilarrow.png")
    shootSound = loadSound("assets/shoot.mp3")
    dieSound = loadSound("assets/die.mp3")
    checkPointSound = loadSound("assets/checkpoint.mp3")
    winSound = loadSound("assets/twinkle.mp3")
    evilarrowSound = loadSound("assets/fire.mp3")
    //background_music = loadSound("assets/bg_music.mp3")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/playButton.png")
    playbutton.position(840, 523)
    playbutton.size(200, 90)
    playbutton.hide()

    aboutbutton = createImg("assets/aboutButton.png")
    aboutbutton.position(580, 520)
    aboutbutton.size(200, 95)
    aboutbutton.hide()

    player = createSprite(130, 400)
    player.addImage("main", player_img)
    player.visible = false;
    player.scale = 0.6

    life = createSprite(1200, 58);
    life.addImage(life_img);
    life.scale = 0.2;
    life.visible = false;

    monster = createSprite(900, 500);
    monster.addImage(monster_img);
    //monster.debug=true;
    monster.setCollider("rectangle", 0, 0, 200, 200)
    //monster.scale = 0.6;
    monster.visible = false;

    heartGroup = new Group();
    arrowGroup = new Group();
    blackheartGroup = new Group();

    evilarrowGroup = new Group();
}

function draw() {
    if (gameState == "wait") {

        //background_music.loop();
        background(splash)
        playbutton.show()
        aboutbutton.show()

    }

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    })

    if (gameState == "about") {
        aboutgame();
    }

    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    if (gameState == "play") {
        //background_music.stop();

        background(bg1);

        player.visible = true;
        spawnHearts();
        spawnBlackHearts();
        movement();
        healthlevel1();

        for (var i = 0; i < heartGroup.length; i++) {
            if (arrowGroup.isTouching(heartGroup.get(i))) {
                score += 5;
                heartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        for (var i = 0; i < blackheartGroup.length; i++) {
            if (arrowGroup.isTouching(blackheartGroup.get(i))) {
                score += 10;
                blackheartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        for (var i = 0; i < blackheartGroup.length; i++) {
            if (player.isTouching(blackheartGroup.get(i))) {
                dieSound.play();
                health -= 20;
                blackheartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        if (health == 0) {
            dieSound.play()

            gameState = "gameOver";

        }

        if (gameState == "gameOver") {

            heartGroup.destroyEach()
            blackheartGroup.destroyEach()
            arrowGroup.destroyEach()
            player.visible = false;

            lost();
        }

        if (health > 0 && score >= 50) {

            gameState = "nextlevelinfo"
            arrowGroup.destroyEach()
            heartGroup.destroyEach()
            blackheartGroup.destroyEach()
            player.visible = false
            checkPointSound.play()

        }

        if (gameState == "nextlevelinfo") {

            nextlevelpopup();

        }
    }

    if (gameState == "level2") {
        //background_music.stop();

        background(bg2);

        player.visible = true;
        spawnHeartsL2();
        spawnBlackHeartsL2();
        movement();
        healthlevel1();

        for (var i = 0; i < heartGroup.length; i++) {
            if (arrowGroup.isTouching(heartGroup.get(i))) {
                score += 5;
                heartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        for (var i = 0; i < blackheartGroup.length; i++) {
            if (arrowGroup.isTouching(blackheartGroup.get(i))) {
                score += 10;
                blackheartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        for (var i = 0; i < blackheartGroup.length; i++) {
            if (player.isTouching(blackheartGroup.get(i))) {
                dieSound.play();
                health -= 20;
                blackheartGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        if (score >= 100 && health > 0) {

            monster.visible = true;
            monsterMovement();

            spawnEvilarrows();

            heartGroup.destroyEach()
            blackheartGroup.destroyEach()


            for (var i = 0; i < evilarrowGroup.length; i++) {
                if (player.isTouching(evilarrowGroup.get(i))) {
                    health -= 20;
                    evilarrowGroup.get(i).remove();
                    //gameState = "gameOver";

                }
            }

            // if (gameState == "gameOver") {
            //     dieSound.play();
            //     heartGroup.destroyEach()
            //     blackheartGroup.destroyEach()
            //     arrowGroup.destroyEach()
            //     evilarrowGroup.destroyEach()
            //     player.visible = false;
            //     monster.visible = false;
            //     lost();
            // }

            for (var i = 0; i < arrowGroup.length; i++) {
                if (arrowGroup.isTouching(monster)) {
                    score += 20;
                    //monster.remove()
                    //gameState = "win";
                    dieSound.play();
                    arrowGroup.destroyEach()
                    monster.visible=false;
                    gameState="die"
                }

                if(gameState=="die"){
                    gameState="level2"
                }

                if (health > 0 && score >= 200) {

                    gameState = "win"
                    // arrowGroup.destroyEach()
                    // heartGroup.destroyEach()
                    // blackheartGroup.destroyEach()
                    // player.visible = false
                    // checkPointSound.play()
        
                }

                if (gameState == "win") {
                    winSound.play();
                    heartGroup.destroyEach()
                    blackheartGroup.destroyEach()
                    arrowGroup.destroyEach()
                    evilarrowGroup.destroyEach()
                    player.visible = false;
                    monster.visible = false;
                    win();
                }


            }



        }

        if (health <= 0) {
            dieSound.play()

            gameState = "gameOver";

        }

        if (gameState == "gameOver") {

            heartGroup.destroyEach()
            blackheartGroup.destroyEach()
            arrowGroup.destroyEach()
            player.visible = false;
            monster.visible = false;

            lost();
        }


    }



    if (gameState == "play" || gameState == "level2" || gameState == "gameOver" || gameState == "nextlevelinfo" || gameState == "win") {
        fill("black");
        textSize(25);
        text("SCORE: " + score, 50, 50);

    }

    drawSprites();
}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Shoot the hearts and escape from the black hearts!\nUse Arrow Keys to move up and down and Space Bar to release the Arrows",
        textAlign: "center",
        imageUrl: "assets/logo.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's fly!",
        confirmButtonColor: "purple",
    },

        function () {
            gameState = "wait"
        }
    )

}


function spawnArrows() {

    arrow = createSprite(player.x + 15, player.y + 15, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.4;
    arrow.velocityX = 10;

    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);


}

function keyReleased() {
    if (keyCode === 32) {
        shootSound.play();
        spawnArrows();

    }
}

function movement() {

    if (player.y <= 80) {
        player.y = 80
    }

    if (player.y >= 525) {
        player.y = 525
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

}

function spawnHearts() {

    if (frameCount % 50 == 0) {

        var randy = Math.round(random(80, 600))
        heart = createSprite(width, randy);
        heart.scale = 0.5
        heart.velocityX = -8;

        var randimg = Math.round(random(2, 5))
        switch (randimg) {

            case 1:
                heart.addImage(heart1_img)
                heart.scale = 0.5;
                //heart.velocityX = -15;
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                heart.addImage(heart2_img)
                heart.scale = 0.6
                heart.setCollider("rectangle", 0, 0, heart.width, heart.height)
                break;

            case 3:
                heart.addImage(heart3_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 4:
                heart.addImage(heart4_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 5:
                heart.addImage(heart5_img)
                heart.scale = 0.15
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            default: break;

        }

        heart.depth = player.depth;
        player.depth = player.depth + 1;

        heartGroup.add(heart);

    }

}

function spawnBlackHearts() {

    if (frameCount % 80 == 0) {

        var randy = Math.round(random(80, 590))
        blackheart = createSprite(width, randy);
        blackheart.scale = 0.5
        blackheart.velocityX = -12;
        blackheart.addImage(heart1_img)
        blackheart.setCollider("rectangle", 0, 0, 250, 300)

        blackheart.depth = player.depth;
        player.depth = player.depth + 1;

        blackheartGroup.add(blackheart);

    }

}

function healthlevel1() {

    life.visible = true;

    stroke("black")
    strokeWeight(2)
    noFill()
    rect(1200, 50, max_health, 20)

    noStroke()
    fill("red")
    rect(1200, 50, health, 20)

}

function lost() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/gameover.jpg",
        imageSize: "300x300",
        confirmButtonText: "Try Again",
        confirmButtonColor: "purple",
    },
        function () {
            window.location.reload();

        }

    )

}

function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "You defeated the evil hearts:\n Make a score of 100 and kill the evil cupid to win!",
        imageUrl: "assets/levelup.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "purple",
    },

        function () {

            gameState = "level2"
        }

    )

}

function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/youwin.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}

function monsterMovement() {
    if (monster.y == 500) {
        monster.velocityY = -5;
        monster.y -= 5;


    }

    if (monster.y == 80) {
        monster.y = monster.y + 5;
        monster.velocityY = 5;
    }

}

function spawnHeartsL2() {

    if (frameCount % 50 == 0) {

        var randy = Math.round(random(80, 600))
        heart = createSprite(width, randy);
        heart.scale = 0.5
        heart.velocityX = -10;

        var randimg = Math.round(random(2, 5))
        switch (randimg) {

            case 1:
                heart.addImage(heart1_img)
                heart.scale = 0.5;
                //heart.velocityX = -15;
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                heart.addImage(heart2_img)
                heart.scale = 0.6
                heart.setCollider("rectangle", 0, 0, heart.width, heart.height)
                break;

            case 3:
                heart.addImage(heart3_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 4:
                heart.addImage(heart4_img)
                heart.scale = 0.4
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 5:
                heart.addImage(heart5_img)
                heart.scale = 0.15
                heart.setCollider("rectangle", 0, 0, 250, 300)
                break;

            default: break;

        }

        heart.depth = player.depth;
        player.depth = player.depth + 1;

        heartGroup.add(heart);

    }

}

function spawnBlackHeartsL2() {

    if (frameCount % 80 == 0) {

        var randy = Math.round(random(80, 590))
        blackheart = createSprite(width, randy);
        blackheart.scale = 0.5
        blackheart.velocityX = -15;
        blackheart.addImage(heart1_img)
        blackheart.setCollider("rectangle", 0, 0, 250, 300)

        blackheart.depth = player.depth;
        player.depth = player.depth + 1;

        blackheartGroup.add(blackheart);

    }

}

function spawnEvilarrows() {
    if (frameCount % 100 == 0) {

        evilarrow = createSprite(monster.x + 3, monster.y + 15, 20, 20);
        evilarrow.addImage(evilarrow_img);
        evilarrow.setCollider("rectangle", 0, 0, evilarrow.width, evilarrow.height);
        //evilarrow.debug=true;
        evilarrow.scale = 0.2;
        evilarrow.velocityX = -10;
        evilarrowSound.play();

        evilarrow.depth = monster.depth;
        monster.depth = monster.depth + 1;

        evilarrowGroup.add(evilarrow);
    }

}