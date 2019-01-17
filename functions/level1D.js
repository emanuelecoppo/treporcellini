var level1D = {

    create: function() {
        currentLevel = 'level1D';
        if (check1D==true) {playerX = 220*16; playerY = 43*16;}
        else {playerX = 200; playerY = 1618;}
        cattura = 0;

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);
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
        game.world.setBounds(0, 0, 533*16-50, 138*16);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;

        // Background
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'giorno0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'giorno1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'giorno2');
        parallax0.fixedToCamera = true; parallax1.fixedToCamera = true; parallax2.fixedToCamera = true;

        // Checkpoint
        check = game.add.sprite(220*16, 48*16, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        if (check1D==true) {check.frame=1}
        else {check.frame=0}

        // Trees
        trees = game.add.group();
        tree1 = trees.create(492*16, 0, 'brown');
        trees.setAll('anchor.x', .5);
        trees.setAll('scale.x', 6*16);
        trees.setAll('scale.y', game.world.height);

        // Waterfall
        waterfall = game.add.tileSprite(240*16, 48*16, 216*16, 100*16, 'waterfall');

        // Tronchi
        tronchi = game.add.group();
        tronchi.enableBody = true;
        game.time.events.add(   0, function() { game.time.events.loop(4000, function() {tronchi.create(302*16,waterfall.y,'brown')}, this) }, this);
        game.time.events.add(2000, function() { game.time.events.loop(4000, function() {tronchi.create(339*16,waterfall.y,'brown')}, this) }, this);
        game.time.events.add(   0, function() { game.time.events.loop(3000, function() {tronchi.create(395*16,waterfall.y,'brown')}, this) }, this);
        game.time.events.add(2000, function() { game.time.events.loop(3000, function() {tronchi.create(411*16,waterfall.y,'brown')}, this) }, this);

        // Fruits
        cespugli = game.add.group();
        cespugli.create(  8*16, 104*16, 'cespuglio');
        cespugli.create(230*16,  46*16, 'cespuglio');
        cespugli.create(485*16,  47*16, 'cespuglio');

        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create( 10*16,  38*16, 'fruit'); //sopra sasso
        fruits.create( 17*16,  48*16, 'fruit'); //sopra sasso
        fruits.create(120*16, 112*16, 'fruit'); //sotto sasso
        fruits.create(201*16,  65*16, 'fruit'); //maiale
        fruits.create(376*16,  61*16, 'fruit'); //cascata
        fruits.create(476*16, 73*16, 'fruit'); //segreto
        fruits.create(478*16, 73*16, 'fruit'); //segreto
        fruits.create(480*16, 73*16, 'fruit'); //segreto

        cespugli.children.forEach( function(cespuglio) {
            cespuglio.anchor.setTo(.5,1);
            cespuglio.scale.setTo(.5,.5);
            fruits.create(cespuglio.centerX-20, cespuglio.centerY-10, 'fruit').cespuglio = true;
        })
        fruits.children.forEach( function(fruit) {
            fruit.scale.setTo(.1,.1);
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Player
        player = game.add.sprite(playerX, playerY, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.body.setSize(pW,pH,pX,pY);
        player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
        player.animations.add('right', [12,13,14,15,16,17,18,19,20,21,22,23], 20, true);

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.alpha = .2;
        game.physics.arcade.enable(soffio);

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(42*16, 65*16, 'sasso').scale.setTo(1.3,1.3);

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,.5);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
        })

        // Segreti
        segreto = game.add.graphics(454*16, 61*16);
        segreto.beginFill(0x21572f, 1);
        segreto.drawRect(0, 0, 33*16, 15*16);
        segreto.endFill();

        // Slopes
        mappa = game.add.tilemap('level1D');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sassi]);
        game.slopes.preferY = true;

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(205*16, 67*16, 'maiale-torcia');
        game.time.events.loop(2000, function(){maiale1.scale.x*=-1}, this);
        maiale4 = maiali.create(game.world.width-1500, 47*16, 'maiale-torcia');
        maiale3 = maiali.create(game.world.width-1400, 47*16, 'maiale-torcia');
        maiale2 = maiali.create(game.world.width+ 300, 47*16, 'maiale-torcia');
        maiale2.scale.x=-1; maiale2.alpha=0; maiale3.alpha=0; maiale4.alpha=0;

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
            maiale.body.setSize(250,120,50,0);

            var torcia = maiale.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);
        })

        maiale2A = game.add.tween(maiale2).to( {x: 517*16}, 1500).delay(   0);
        maiale3A = game.add.tween(maiale3).to( {x: 470*16}, 1500).delay(1000);
        maiale4A = game.add.tween(maiale4).to( {x: 468*16}, 1500).delay(1000);
        maiale2A.onStart.add(function() {maiale2.animations.play('walk')});
        maiale3A.onStart.add(function() {maiale3.animations.play('walk')});
        maiale4A.onStart.add(function() {maiale4.animations.play('walk')});
        maiale2A.onComplete.add(function() {maiale2.animations.stop(); maiale2.frame = 0; playerA.start()});
        maiale3A.onComplete.add(function() {maiale3.animations.stop(); maiale3.frame = 0});
        maiale4A.onComplete.add(function() {maiale4.animations.stop(); maiale4.frame = 0});
        playerA =  game.add.tween(player).to(  {x: 492*16}, 1000).delay( 200);
        playerA.onStart.add(function() {player.animations.play('left')});
        playerA.onComplete.add(function()  {player.animations.stop();  player.frame = 11; maiale2B.start(); maiale3B.start(); maiale4B.start()});
        maiale2B = game.add.tween(maiale2).to( {x: 496*16}, 1500).delay(1500);
        maiale3B = game.add.tween(maiale3).to( {x: 488*16}, 1500).delay(1500);
        maiale4B = game.add.tween(maiale4).to( {x: 488*16}, 1500).delay(1500);
        maiale2B.onStart.add(function() {maiale2.animations.play('walk')});
        maiale3B.onStart.add(function() {maiale3.animations.play('walk')});
        maiale4B.onStart.add(function() {maiale4.animations.play('walk')});

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
            game.paused = false;
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            game.time.events.add(500, function() {
                game.camera.fade('#000',100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});
            })
        }
        function nextState() {game.camera.fade('#000',500); game.camera.onFadeComplete.add(function(){game.state.start('level2A')});}
        if (player.y > game.world.height+200) {gameOver()};
        if (player.x > game.world.width) {nextState()}
        maiale2B.onComplete.add(nextState);

        // Camera
        if (player.x > 230*16) {
             game.camera.follow(player, .1, .1);
             game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 768/2, 200, 0);
        }
        else {
            game.camera.follow(player, .1, .1);
            game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);
        }

        // Collisions
        game.physics.arcade.collide(player, [boundL, boundR]);
        game.physics.arcade.collide([player, fruits], [ground, tronchi]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

        // Parallax
        parallax0.tilePosition.x = 0;
        parallax1.tilePosition.x = -0.5 * game.camera.x;
        parallax2.tilePosition.x = -0.9 * game.camera.x;
        waterfall.tilePosition.y += 2;

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {check.frame=1; check1D=true}

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
        else if (cattura==0) {
            if (facing == 'left') {player.frame = 11}
            else if (facing == 'right') {player.frame = 12}
        }

        // Jump
        spacebar.onDown.add(jumpFunction);
        function jumpFunction() {
            if (player.body.touching.down) {
                player.body.velocity.y = -jump;
            }
        }

        // Soffio
        if (soffia.isDown) {
            soffio.revive();
            if (facing=='left') {soffio.x = -25; soffio.scale.setTo(-.2,.2)}
            else if (facing=='right') {soffio.x = 25; soffio.scale.setTo(.2,.2)}
        }
        else {soffio.kill();}

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

        // Cespuglio
        game.physics.arcade.overlap(soffio, fruits, soffioCespuglio, null, this);
        function soffioCespuglio(soffio, fruit) {
            fruit.body.gravity.y = 600;
        }

        // Sasso
        game.physics.arcade.overlap(soffio, sassi, soffiaSasso, null, this);
        function soffiaSasso(soffio, sasso) {
            if (facing=='left') {sasso.body.velocity.x -= 5}
            else if (facing=='right') {sasso.body.velocity.x += 5}
        }

        // Tronchi
        tronchi.children.forEach( function(tronco) {
            tronco.anchor.setTo(.5,.5);
            tronco.scale.setTo(100, 20);
            tronco.body.immovable = true;
            tronco.body.acceleration.y = 50;
            tronco.body.maxVelocity.y = 180;
            if (tronco.y > game.world.height) {tronco.destroy()}
        })

        // Maiali
        game.physics.arcade.overlap(player, maiale1, gameOver, null, this);

        // Segreto
        if (player.x > segreto.left && player.y > segreto.top) {segreto.alpha = 0}
        else {segreto.alpha = 1}

        // Cattura
        if (player.x >= 505*16 && cattura==0) {
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 12;
            maiale2.alpha = 1; maiale3.alpha = 1; maiale4.alpha = 1;
            maiale2A.start(); maiale3A.start(); maiale4A.start();
            cattura ++;
        }

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(maiale1);
    }
}
