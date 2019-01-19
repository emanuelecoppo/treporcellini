var level2A = {

    create: function() {
        currentLevel = 'level2A';
        if (check2A==true) {playerX = 88*32; playerY = 18*32;}
        else {playerX = 25*32; playerY = 68*32;}
        lavaTrigger = 0;

        music = game.add.audio('fortezzaMusic').play();
        music.fadeIn(5000);
        music.loopFull();

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.input.keyboard.start();

        // Controllli
        cursors = game.input.keyboard.createCursorKeys();
        destra = game.input.keyboard.addKey(Phaser.Keyboard.A);
        sinistra = game.input.keyboard.addKey(Phaser.Keyboard.D);
        soffia = game.input.keyboard.addKey(Phaser.Keyboard.E);
        vola = game.input.keyboard.addKey(Phaser.Keyboard.F);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key0.onDown.add(function(){game.state.start('intro')});
        key1.onDown.add(function(){game.state.start('level1A')});
        key2.onDown.add(function(){game.state.start('level1B')});
        key3.onDown.add(function(){game.state.start('level1C')});
        key4.onDown.add(function(){game.state.start('level1D')});
        key5.onDown.add(function(){game.state.start('level2A')});
        key6.onDown.add(function(){game.state.start('level2B')});

        /// World
        game.world.setBounds(0, 0, 153*32, 77*32);
        game.add.sprite(0,game.world.height,'fortezza-bg').anchor.setTo(0,1);

        // Checkpoint
        check = game.add.sprite(88*32, 20*32, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        if (check2A==true) {check.frame=1}
        else {check.frame=0}

        // Player
        player = game.add.sprite(playerX, playerY, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.body.setSize(pW,pH,pX,pY);
        player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
        player.animations.add('right', [12,13,14,15,16,17,18,19,20,21,22,23], 20, true);

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 32, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.animations.add('soffia', [0,1,2,3,4,5,6], 20, true);
        game.physics.arcade.enable(soffio);
        soffio.body.setSize(110,90,50,15)

        // Colonne
        colonne = game.add.group();
        colonne.enableBody = true;
        colonne.add(game.add.graphics(105*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());
        colonne.add(game.add.graphics(115*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());
        colonne.add(game.add.graphics(125*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiali.create(135*32, 20*32, 'maiale-torcia');
        maiali.create(120*32, 20*32, 'maiale-torcia');
        maiali.create(105*32, 20*32, 'maiale-torcia');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
            maiale.body.setSize(250,120,50,0);

            var torcia = maiale.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);

            maialeA = game.add.tween(maiale).to( {x: maiale.x-20*32}, 5000).delay(1000+2000*Math.random()).start();
            maialeB = game.add.tween(maiale).to( {x: maiale.x      }, 5000).delay(1000+2000*Math.random());
            maialeA.onStart.add   (function() {maiale.scale.x=-1; maiale.animations.play('walk')});
            maialeB.onStart.add   (function() {maiale.scale.x= 1; maiale.animations.play('walk')});
            maialeA.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 0});
            maialeB.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 0});
            maialeA.chain(maialeB, maialeA);
        })

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create( 12*32,  67*32, 'fruit'); //cella
        fruits.create( 13*32,  67*32, 'fruit'); //cella
        fruits.create( 80*32,  47*32, 'fruit'); //lava
        fruits.create( 63*32,  13*32, 'fruit'); //lava

        fruits.children.forEach( function(fruit) {
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Fiamme
        fiamme = game.add.group();
        fiamme.create(125*32, 40*32, 'maiale-torcia');
        fiamme.create(115*32, 40*32, 'maiale-torcia');
        fiamme.create(105*32, 40*32, 'maiale-torcia');

        fiamme.children.forEach( function(fiamma) {
            fiamma.anchor.setTo(.5, 1);
            fiammaA = game.add.tween(fiamma.scale).to( {y:0, x:0}, 100, sin).delay(1000+1000*Math.random()).start().yoyo(true, 3000+1000*Math.random());
            fiammaA.chain(fiammaA);
        })

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(18*32, 68*32, 'brown').scale.setTo(100,70);

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,.5);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
        })

        // Tilemap
        mappa = game.add.tilemap('level2A');
        mappa.addTilesetImage('castle', 'castle');
        mappa.setCollisionBetween(1, 6);
        ground = mappa.createLayer('ground');
        ground.alpha = 0;
        game.add.sprite(0,game.world.height,'level2A').anchor.setTo(0,1);

        // Lava
        lava = game.add.tileSprite(60*32, 63*32, 22*32, 70*32, 'lava');
        lava.animations.add('waves', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]);
        lava.animations.play('waves', 10, true);
        game.physics.arcade.enable(lava);
        lavaAlza = game.add.tween(lava).to( {y: 21*32}, 15000, sin);

        // Fame
        barra = game.add.graphics(25, 25);
        barra.lineStyle(2, 0xffffff, .8);
        barra.drawRect(0, 0, 250, 20);
        barra.fixedToCamera = true;
        fame = game.add.graphics(25, 25);
        fame.beginFill(0xfefefe, .3);
        fame.drawRect(0, 0, 250, 20);
        fame.endFill();
        fame.fixedToCamera = true;
        fame.width = currentFame;

        // Pause
        pauseOverlay = game.add.graphics(0, 0);
        pauseOverlay.beginFill('#000', 1);
        pauseOverlay.drawRect(0, 0, 1024, 768);
        pauseOverlay.endFill();
        pauseOverlay.alpha = .5;

        pauseText = game.add.text(1024/2, 768/2, 'PAUSA', {font: "60px Arial", fill:'#fff'});
        pauseText.anchor.setTo(.5,.5);

        continua = game.add.text(1024/2, 768-200, 'Continua', {font: "30px Arial", fill:'#fff'});
        continua.anchor.setTo(.5,.5);
        continua.events.onInputUp.add(pauseGame);

        tornaMenu = game.add.text(1024/2, 768-150, 'Torna al Menu', {font: "30px Arial", fill:'#fff'});
        tornaMenu.anchor.setTo(.5,.5);
        tornaMenu.events.onInputUp.add(backMenu);

        pauseScreen = game.add.group();
        pauseScreen.fixedToCamera = true;
        pauseScreen.alpha = 0;
        pauseScreen.add(pauseOverlay); pauseScreen.add(pauseText); pauseScreen.add(continua); pauseScreen.add(tornaMenu);

        pauseButton = game.add.sprite(1024-25, 25, 'pause');
        pauseButton.anchor.setTo(1,0);
        pauseButton.scale.setTo(.1,.1);
        pauseButton.fixedToCamera = true;
        pauseButton.inputEnabled = true;
        pauseButton.input.useHandCursor = true;
        pauseButton.events.onInputUp.add(pauseGame);

        enter.onDown.add(pauseGame);

        function pauseGame() {
            game.paused = (game.paused) ? false : true;
            pauseScreen.alpha = (pauseScreen.alpha) ? 0 : 1;
            continua.inputEnabled = (game.paused) ? true : false;
            tornaMenu.inputEnabled = (game.paused) ? true : false;
            continua.input.useHandCursor = (game.paused) ? true : false;
            tornaMenu.input.useHandCursor = (game.paused) ? true : false;
        }
        function backMenu() {
            music.fadeOut(500-100);
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            music.fadeOut(500-100);
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            game.time.events.add(500, function() {
                game.camera.fade(0x000000,100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});
            })
        }
        function nextState() {music.fadeOut(500-100); game.camera.fade(0x000000,500); game.camera.onFadeComplete.add(function(){game.state.start('level2B')});}
        if (player.x<130*32 && player.y>game.world.height) {gameOver()};
        if (player.x>130*32 && player.y>game.world.height) {nextState()}

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

        // Collisions
        game.physics.arcade.collide([player, fruits], [ground]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {check.frame=1; check2A=true}

        // Velocity
        player.body.velocity.x = 0.8 * player.body.velocity.x;
        player.body.drag.x = 1600;

        walk = 300;
        jump = 900;
        player.body.gravity.y = 2000;

        player.body.maxVelocity.y = jump;
        player.body.maxVelocity.x = walk;

        // Walk
        if (cursors.left.isDown) {
            player.body.velocity.x = -walk;
            player.animations.play('left')
            facing = 'left';
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = walk;
            player.animations.play('right')
            facing = 'right';
        }
        else {
            if (facing == 'left') {player.frame = 11}
            else if (facing == 'right') {player.frame = 12}
        }

        // Jump
        spacebar.onDown.add(jumpFunction);
        function jumpFunction() {
            if (player.body.touching.down || player.body.blocked.down) {
                player.body.velocity.y = -jump;
            }
        }

        // Soffio
        if (soffia.isDown) {
            soffio.revive();
            soffio.animations.play('soffia');
            if (facing=='left') {soffio.x = 25; soffio.scale.x=-1}
            else if (facing=='right') {soffio.x = -25; soffio.scale.x=1}
        }
        else {soffio.kill()}
        
        // Fame
        fame.width -= .025;
        currentFame = fame.width;
        if (fame.width <= 0) {gameOver();} //muore
        else if (fame.width <= 50) {fame.tint = 0xff0000;} //rosso
        else if (fame.width <= 100) {fame.tint = 0xffff00;} //giallo
        else if (fame.width > 100) {fame.tint = 0xfefefe;} //bianco

        // Fruits
        game.physics.arcade.overlap(player, fruits, eatFruit, null, this);
        function eatFruit(player, fruit) {
            if (!fruit.body.gravity.y==0) {
                fruit.kill();
                if (fame.width > 225) {fame.width = 250}
                else {fame.width += 25}
            }
        }

        // Sasso
        game.physics.arcade.overlap(soffio, sassi, soffiaSasso, null, this);
        function soffiaSasso(soffio, sasso) {
            if (facing=='left') {sasso.body.velocity.x -= 5}
            else if (facing=='right') {sasso.body.velocity.x += 5}
        }

        // Lava
        game.physics.arcade.overlap(player, lava, gameOver, null, this);
        if (player.x > 65*32 && lavaTrigger==0) {lavaAlza.start(); lavaTrigger++}

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(maiale1);
    }
}
