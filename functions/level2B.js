var level2B = {

    create: function() {
        game.input.keyboard.start();
        currentLevel = 'level2B';
        playerX = 5*32;
        playerY = 0;

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#333";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /// World
        game.world.setBounds(0, 0, 1024, 768);
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

        // Boss
        boss = game.add.sprite(800, 150, 'boss');

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create( 10*16,  38*16, 'fruit');

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
        player.scale.setTo(.9,.9);
        player.body.setSize(40,100,40,-3);
        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
        player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);

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

        // Tilemap
        mappa = game.add.tilemap('level2B');
        mappa.addTilesetImage('castle', 'castle');
        mappa.setCollisionBetween(1, 6);
        ground = mappa.createLayer('ground');

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(205*16, 64*16, 'lupo');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,.5);
            maiale.animations.add('walk', [12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
            maiale.frame = 12;
            maiale.body.setSize(250,100,50,0);

            var torcia = maiale.addChild(game.make.sprite(15, 0, 'torcia'));
            torcia.anchor.y = .5;
            torcia.scale.setTo(.5,.5);
            torcia.alpha = .5;
        })

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
        function nextState() {game.camera.fade('#000',500); game.camera.onFadeComplete.add(function(){game.state.start('level2B')});}
        if (player.x > game.world.width) {nextState()}

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
        game.physics.arcade.collide([player, fruits], [ground]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

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
        if (s.isDown) {
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

        // Sasso
        game.physics.arcade.overlap(soffio, sassi, soffiaSasso, null, this);
        function soffiaSasso(soffio, sasso) {
            if (facing=='left') {sasso.body.velocity.x -= 5}
            else if (facing=='right') {sasso.body.velocity.x += 5}
        }

        // Maiali
        game.physics.arcade.overlap(player, maiale1, gameOver, null, this);

        // Vola
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {player.body.gravity.y = 0};

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(maiale1);
    }
}
