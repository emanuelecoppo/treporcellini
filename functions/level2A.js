var level2A = {

    create: function() {
        currentLevel = 'level2A';
        if (check2A==true) {playerX = 88*32; playerY = 18*32;}
        else {playerX = 25*32; playerY = 68*32;}
        lavaTrigger = 0;
        soffioTrigger = 0;

        // Sound
        game.sound.stopAll();
        music = game.add.audio('fortezzaMusic').loopFull();
        lavaSFX = game.add.audio('lavaSFX', 0).loopFull(); lavaSFX.fadeTo(2000, .2);
        morso = game.add.audio('morso', .2); morso.allowMultiple = true;
        morteSFX = game.add.audio('morte');
        passi = game.add.audio('passi');
        soffioSFX = game.add.audio('soffioSFX', 0).loopFull();

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
        fiammaCheck = check.addChild(game.make.sprite(0, -check.height, 'fiamma-check'));
        fiammaCheck.anchor.setTo(.5,1.2);
        fiammaCheck.animations.add('fiammaCheck', [0,1,2,1], 10, true);
        fiammaCheck.animations.play('fiammaCheck');
        if (check2A==true) {fiammaCheck.scale.setTo(1)}
        else {fiammaCheck.scale.setTo(0)}

        // Player
        player = game.add.sprite(playerX, playerY, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.body.setSize(pW,pH,pX,pY);
        player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
        player.animations.add('right', [12,13,14,15,16,17,18,19,20,21,22,23], 20, true);
        player.frame = 12;

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 32, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.animations.add('soffia', [0,1,2,3,4,5,6], 20, true);
        game.physics.arcade.enable(soffio);
        soffio.body.setSize(110,90,50,15)

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create( 12*32,  68*32, 'fruit'); //cella
        fruits.create( 13*32,  68*32, 'fruit'); //cella
        fruits.create( 80*32,  47*32, 'fruit'); //lava
        fruits.create( 63*32,  13*32, 'fruit'); //lava
        fruits.create( 4150,  590, 'fruit'); //fiamme
        fruits.create( 3560,  1870, 'fruit'); //fiamme
        fruits.create( 4220,  1870, 'fruit'); //fiamme

        fruits.children.forEach( function(fruit) {
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Fiamme
        fiamme = game.add.group();
        fiamme.enableBody = true;
        fiamma1 = fiamme.create(3490, 10*32, 'fiamma'); fiamma1.scale.y=-1.2;
        fiamme.create(3930, 10*32, 'fiamma').scale.y=-1.2;
        fiamme.create(4020, 40*32, 'fiamma').scale.y= 1.2;
        fiamme.create(3690, 40*32, 'fiamma').scale.y= 1.2;
        fiamme.create(3425, 40*32, 'fiamma').scale.y= 1.2;

        fiamme.children.forEach( function(fiamma) {
            fiamma.body.setSize(130,270,400,250);
            fiamma.anchor.setTo(.5, 1);
            fiamma.scale.x = 1.2;
            fiamma.frame = 7;
            fiamma.animations.add('fuoco', [0,1,2,3,2,3,2,3,2,3,2,3,4,5,6,7], 10);
            game.time.events.loop(2500+2000*Math.random(), function(){fiamma.animations.play('fuoco')});
        })

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(18*32, 70*32, 'sasso').scale.setTo(.75);

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,1);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
            sasso.body.setSize(150,140,5,5);
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

        blocco = game.add.graphics(59*32, 58*32).beginFill('#000', 1).drawRect(0, 0, 32, 5*32).endFill();
        game.physics.arcade.enable(blocco);
        blocco.body.immovable = true;
        blocco.body.offset.y = -200;
        blocco.alpha = 0;

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

        // Pausa
        pausa = game.add.sprite(0,0,'schermata-pausa');
        pausa.alpha = 0;
        continua = game.add.graphics(461, 401).beginFill(0xffffff, 0).drawRect(0, 0, 103, 33).endFill();
        tornaMenu = game.add.graphics(439, 450).beginFill(0xffffff, 0).drawRect(0, 0, 146, 33).endFill();
        continua.events.onInputUp.add(pauseGame);
        tornaMenu.events.onInputUp.add(backMenu);
        pausa.fixedToCamera = true; continua.fixedToCamera = true; tornaMenu.fixedToCamera = true;

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
            pausa.alpha = (pausa.alpha) ? 0 : 1;
            continua.inputEnabled = (game.paused) ? true : false;
            tornaMenu.inputEnabled = (game.paused) ? true : false;
            continua.input.useHandCursor = (game.paused) ? true : false;
            tornaMenu.input.useHandCursor = (game.paused) ? true : false;
        }
        function backMenu() {
            music.fadeOut(500); lavaSFX.fadeOut(500);
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            morteSFX.play('', 0, .5, false, false);
            music.fadeOut(1100); lavaSFX.fadeOut(1100);
            game.physics.arcade.isPaused = true;
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.animations.stop();
            game.time.events.add(1000, function() {
                game.camera.fade(0x000000,100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});
            })
        }
        function nextState() {
            music.fadeOut(500); lavaSFX.fadeOut(500);
            game.camera.fade(0x000000,500);
            game.camera.onFadeComplete.add(function(){game.state.start('level2B')});}
        if (player.x<130*32 && player.y>game.world.height) {gameOver()};
        if (player.x>130*32 && player.y>game.world.height) {nextState()}

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

        // Collisions
        game.physics.arcade.collide([player, fruits], [ground, blocco]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {
            if (check2A==false) {game.add.tween(fiammaCheck.scale).to( {y:1,x:1}, 100, sin).start()}
            check2A=true;
        }

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

        // Passi
        if ((cursors.left.isDown||cursors.right.isDown)
        && (player.body.touching.down||player.body.blocked.down))
            {passi.play('', 0, .3, true, false)}
        else {passi.fadeTo(100, 0)}

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
            if (soffioTrigger==0) {soffioTrigger=1; soffioSFX.fadeTo(500, .2)};
        }
        else {
            soffio.kill();
            if (soffioTrigger==1) {soffioTrigger=0; soffioSFX.fadeTo(500, .001)};
        }

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
                morso.play();
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
        if (player.x > 65*32 && lavaTrigger==0) {
            lavaAlza.start();
            lavaTrigger++;
            blocco.alpha = 1;
            blocco.body.offset.y = 0;
        }

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

        // Fiamme
        game.physics.arcade.overlap(player, fiamme, brucia, null, this);
        function brucia(player, fiamma) {
            if (fiamma.frame>=1 && fiamma.frame<=5) {gameOver()}
        }
    },

    render: function() {
        // game.debug.spriteCoords(player, 10, 762);
        // game.debug.body(fiamma1);

    }
}
