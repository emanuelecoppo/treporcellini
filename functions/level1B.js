var level1B = {

    create: function() {
        game.input.keyboard.start();
        currentLevel = 'level1B';
        playerX = 482;
        playerY = 1095;
        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);

        // World
        game.world.setBounds(0, 0, 400*16-50, 100*16);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;

        // Controllli
        cursors = game.input.keyboard.createCursorKeys();
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);

        // Background
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax2');
        parallax0.fixedToCamera = true;
        parallax1.fixedToCamera = true;
        parallax2.fixedToCamera = true;

        // Trees
        trees = game.add.group();
        trees.create(19*16, 0, 'brown');
        trees.create(130*16, 0, 'brown');
        trees.create(205*16, 0, 'brown');
        trees.create(297*16, 0, 'brown');
        trees.create(385*16, 0, 'brown');
        trees.setAll('anchor.x', .5);
        trees.setAll('scale.x', 6*16);
        trees.setAll('scale.y', game.world.height);

        // Water (dietro)
        waterPonte = game.add.sprite(0, game.world.height-10*16, 'blue');
        waterPonte.scale.setTo(game.world.width, 10*16);

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        for (var i = 0; i < 100; i++) { fruit = fruits.create(i*550, 0, 'fruit'); }
        fruits.setAll('body.gravity.y', 600);
        fruits.setAll('scale.x', .1);
        fruits.setAll('scale.y', .1);
        fruits.setAll('body.drag.x', 1000);

        // Player
        player = game.add.sprite(playerX, playerY, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.scale.setTo(.9,.9);
        player.body.setSize(40,100,40,-3);
        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
        player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.alpha = .2;
        game.physics.arcade.enable(soffio);

        // Sasso
        sasso = game.add.sprite(3165*16, 45*16, 'sasso');
        sasso.anchor.setTo(.5,.5);
        game.physics.arcade.enable(sasso);
        sasso.body.gravity.y = 1000;
        sasso.body.drag.x = 100;
        sasso.body.maxVelocity.x = 100;
        sasso.scale.setTo(1.5,1.5);

        // Fango
        fango = game.add.group();
        fango.enableBody = true;
        fango.alpha = .95;
        fango.create(1285*16, 150*16, 'brown');
        fango.create(1494*16, 150*16, 'brown');
        fango.create(2200*16, 150*16, 'brown');
        fango.create(2390*16, 150*16, 'brown');
        fango.create(2531*16, 150*16, 'brown');
        fango.setAll('body.immovable', true);
        fango.setAll('scale.x', 82*16);
        fango.setAll('scale.y', 10*16);

        // Torcia
        torce = game.add.grou

        // Slopes
        mappa = game.add.tilemap('level1B');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sasso]);
        game.slopes.preferY = true;

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(-100,66*16, 'lupo');
        maiale2 = maiali.create(-75, 66*16, 'lupo');
        maiale3 = maiali.create(-25, 66*16, 'lupo');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,.5);
            maiale.scale.x = -1;
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
            maiale.animations.play('walk');

            var torcia = maiale.addChild(game.make.sprite(0, 0, 'torcia'));
            torcia.anchor.setTo(1,.5);
            torcia.scale.setTo(.5,.5);
            torcia.alpha = .5;

            torciaA = game.add.tween(torcia).to( {angle: 20+20*Math.random()}, 1000+1000*Math.random(), sin).delay(250*Math.random());
            torciaB = game.add.tween(torcia).to( {angle:-20-20*Math.random()}, 1000+1000*Math.random(), sin).delay(250*Math.random());
            torciaA.chain(torciaB, torciaA);
            torciaA.start();
        })

        // Ponte
        ponte = game.add.sprite(319*16, 69*16, 'brown');
        ponte.scale.setTo(46*16, 70);
        game.physics.arcade.enable(ponte);
        ponte.body.immovable = true;

        // Barra Fame
        barra = game.add.graphics(25, 25);
        barra.lineStyle(2, 0xffffff, .8);
        barra.drawRect(0, 0, 250, 20);
        barra.fixedToCamera = true;
        fame = game.add.graphics(25, 25);
        fame.beginFill(0xfefefe, .3);
        fame.drawRect(0, 0, 250, 20);
        fame.endFill();
        fame.fixedToCamera = true;

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
        // Shortcuts
        key1.onDown.add(function(){game.state.start('level1A')});
        key2.onDown.add(function(){game.state.start('level1B')});
        key3.onDown.add(function(){game.state.start('level1C')});
        key4.onDown.add(function(){game.state.start('level1D')});
        key5.onDown.add(function(){game.state.start('level1E')});
        key6.onDown.add(function(){game.state.start('level2A')});
        key7.onDown.add(function(){game.state.start('level2B')});

        // States
        function gameOver() {game.camera.fade('#000',100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});}
        function nextState() {game.camera.fade('#000',500); game.camera.onFadeComplete.add(function(){game.state.start('level1C')});}
        if (player.y > game.world.height+200) {gameOver()};
        if (player.x > game.world.width) {nextState()}

        // Camera
        maiali.x += 4;
        game.camera.unfollow();
        game.camera.y = 40*16;
        game.camera.x += 4;
        if (player.x < game.camera.x) {gameOver()}

        if (maiali.left >= ponte.centerX-100) {
            maiali.children.forEach( function(maiale) {maiale.body.gravity.y = 100+1500*Math.random()});
            ponte.body.gravity.y = 1500;
        }

        // Collisions
        game.physics.arcade.collide(player, [boundL, boundR]);
        game.physics.arcade.collide([player, fruits], ground);
        game.physics.arcade.collide([player, maiali], ponte);
        sasso.body.immovable = true; game.physics.arcade.collide(sasso, player);
        sasso.body.immovable = false; game.physics.arcade.collide(sasso, ground);
        game.physics.arcade.overlap(player, fruits, eatFruit, null, this);

        // Parallax
        parallax0.tilePosition.x = 0;
        parallax1.tilePosition.x = -0.5 * game.camera.x;
        parallax2.tilePosition.x = -0.9 * game.camera.x;

        // Velocity
        player.body.velocity.x = 0.8 * player.body.velocity.x;
        player.body.drag.x = 1600;

        if (game.physics.arcade.overlap(player, fango)) {
            walk = 100;
            jump = 75;
            player.body.gravity.y = 150;
        }
        else {
            walk = 300;
            jump = 900;
            player.body.gravity.y = 2000;
        }

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
            if (player.body.touching.down) {
                player.body.velocity.y = -jump;
            }
        }

        // Soffio
        if (s.isDown) {
            soffio.revive();
            if (facing == 'left') {
                soffio.x = -25;
                soffio.scale.setTo(-.2,.2);
            }
            else if (facing == 'right') {
                soffio.x = 25;
                soffio.scale.setTo(.2,.2);
            }
            // Sasso
            if (game.physics.arcade.overlap(soffio, sasso)) {
                if (facing == 'left') {sasso.body.velocity.x -= 5}
                else if (facing == 'right') {sasso.body.velocity.x += 5}
            }
        }
        else {
            soffio.kill();
        }

        // Vola (per test)
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {player.body.gravity.y = 0}

        // Barra Fame
        fame.width -= .025;
        if (fame.width <= 0) {gameOver();} //muore
        else if (fame.width <= 50) {fame.tint = 0xff0000;} //rosso
        else if (fame.width <= 100) {fame.tint = 0xffff00;} //giallo
        else if (fame.width > 100) {fame.tint = 0xfefefe;} //bianco

        // Fruits
        function eatFruit(player, fruit) {
            fruit.kill();
            if (fame.width > 225) {fame.width = 250}
            else {fame.width += 25}
        }
    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
    }
}
