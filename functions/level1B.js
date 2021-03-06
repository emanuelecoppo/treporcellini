var level1B = {

    create: function() {
        currentLevel = 'level1B';
        playerX = 482;
        playerY = 1095;
        soffioTrigger = 0;
        musicTrigger = 0;

        // Sound
        game.sound.stopAll();
        music = game.add.audio('fugaMusic', 0).loopFull(); music.fadeTo(2000, .5);
        morso = game.add.audio('morso', .2); morso.allowMultiple = true;
        morteSFX = game.add.audio('morte');
        ramoSFX = game.add.audio('ramoSFX');
        passi = game.add.audio('passi');
        forestaNotte = game.add.audio('foresta-notte', 0).loopFull(); forestaNotte.fadeTo(2000, 3)
        soffioSFX = game.add.audio('soffioSFX', 0).loopFull();
        maialiSFX = game.add.audio('maialiSFX', .5).loopFull();
        game.time.events.add(3000, function() {maialiSFX2 = game.add.audio('maialiSFX', .5).loopFull()});

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
        game.world.setBounds(0, 0, 400*16-50, 100*16);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;

        // Background
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte2');
        parallax0.fixedToCamera = true; parallax1.fixedToCamera = true; parallax2.fixedToCamera = true;

        // Trees
        trees = game.add.group();
        tree1 = trees.create( 19*16, 71*16, 'tree-notte');
        tree2 = trees.create(129*16, 71*16, 'tree-notte');
        //tree3 = trees.create(185*16, 71*16, 'tree-notte');
        tree4 = trees.create(297*16, 71*16, 'tree-notte');
        tree5 = trees.create(385*16, 71*16, 'tree-notte');
        trees.setAll('anchor.x', .5);
        trees.setAll('anchor.y', 1);

        // Rami
        rami = game.add.group();
        rami.enableBody = true;
        game.world.sendToBack(rami); game.world.sendToBack(parallax2); game.world.sendToBack(parallax1); game.world.sendToBack(parallax0);
        rami.create(tree1.right-4, 50*16, 'ramo-notte');
        rami.create(tree2.left +4, 57*16, 'ramoSX-notte').cade=true;
        rami.create(tree2.right-4, 46*16, 'ramo-notte');
        rami.create(tree4.right-4, 47*16, 'ramo-notte');
        rami.create(tree5.left +4, 46*16, 'ramoSX-notte');
        rami.create(tree5.right-4, 58*16, 'ramo-notte').cade=true;

        rami.children.forEach( function(ramo) {
            ramo.posY = ramo.body.y //memorizza Y iniziale
            ramo.anchor.x = .5;
            ramo.body.immovable = true;
            ramo.body.maxVelocity.y = 800;
        })

        // Cartello
        cartelli = game.add.group();
        cartelli.enableBody = true;
        cartelli.create(377*16, 69*16, 'cartello');
        cartelli.setAll('anchor.x', .5);
        cartelli.setAll('anchor.y', 1);

        // Fruits
        cespugli = game.add.group();
        cespugli.create(290*16, 71*16, 'cespuglio');
        cespugli.create( 83*16, 71*16, 'cespuglio');

        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create(tree2.right-20, 600, 'fruit');
        fruits.create(174*16, 1100, 'fruit'); //buco
        fruits.create(247*16, 800, 'fruit'); //tronco caduto
        fruits.create(tree5.left-20, 600, 'fruit');

        cespugli.children.forEach( function(cespuglio) {
            cespuglio.anchor.setTo(.5,1);
            fruits.create(cespuglio.centerX-20, cespuglio.centerY-10, 'fruit').cespuglio = true;
        })
        fruits.children.forEach( function(fruit) {
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
        player.frame = 12;

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 32, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.animations.add('soffia', [0,1,2,3,4,5,6], 20, true);
        game.physics.arcade.enable(soffio);
        soffio.body.setSize(110,90,50,15)

        // Fango
        fango = game.add.group();
        fango.enableBody = true;
        fango.add(game.add.tileSprite( 41*16, 75*16, 15*16, 6*16, 'fango'));
        fango.add(game.add.tileSprite(210*16, 67*16, 15*16, 6*16, 'fango'));
        fango.setAll('body.immovable', true);

        // Slopes
        mappa = game.add.tilemap('level1B');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits]);
        game.slopes.preferY = true;
        ground.alpha = 0;
        game.add.sprite(0,game.world.height,'level1B').anchor.setTo(0,1);

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(-120,69*16, 'maiale-torcia');
        maiale2 = maiali.create(-95, 69*16, 'maiale-torcia');
        maiale3 = maiali.create(-45, 69*16, 'maiale-torcia');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
            maiale.animations.play('walk');

            var torcia = maiale.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);

            torciaA = game.add.tween(torcia).to( {angle: 5+10*Math.random()}, 250+500*Math.random(), sin).delay(250*Math.random());
            torciaB = game.add.tween(torcia).to( {angle:-5-10*Math.random()}, 250+500*Math.random(), sin).delay(250*Math.random());
            torciaA.chain(torciaB, torciaA);
            torciaA.start();
        })

        // Ponte
        ponte = game.add.group();
        ponte.enableBody = true;
        ponteSX = ponte.create(320*16, 1080, 'ponteSX');
        ponteDX = ponte.create(319*16+739, 1080, 'ponteDX'); ponteDX.anchor.x=1;
        ponte.setAll('body.offset.y', 20);
        ponte.setAll('body.immovable', true);

        // Fame
        fame = game.add.graphics(50 , 25);
        fame.beginFill(0xfefefe, .3);
        fame.drawRect(1, 2, 250, 10);
        fame.endFill();
        fame.fixedToCamera = true;
        fame.width = currentFame;
        barra = game.add.graphics(50, 25);
        barra.lineStyle(3, 0xffffff, .8); //0x44392f
        barra.drawRoundedRect(0, 0, 252, 14, 100);
        barra.fixedToCamera = true;
        mela = game.add.sprite(barra.left-5, barra.centerY-5, 'fruit');
        mela.fixedToCamera=true;
        mela.anchor.setTo(.5)
        mela.scale.setTo(1.3);

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
            forestaNotte.fadeOut(500); music.fadeOut(500);
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            forestaNotte.fadeOut(1100); music.fadeOut(1100);
            morteSFX.play('', 0, .5, false, false);
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
            forestaNotte.fadeOut(500); music.fadeOut(500);
            game.camera.fade(0x000000,500);
            game.camera.onFadeComplete.add(function(){game.state.start('level1C')});}
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
            ponte.setAll('body.gravity.y', 1000);
            ponteSX.angle += .5;
            ponteDX.angle -= .5;
        }

        // Collisions
        game.physics.arcade.collide(player, [boundL, boundR]);
        game.physics.arcade.collide([player, fruits], [ground, rami]);
        game.physics.arcade.collide([player, maiali], ponte);

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
        // Passi
        if ((cursors.left.isDown||cursors.right.isDown)
        && (player.body.touching.down||player.body.blocked.down))
            {passi.play('', 0, .3, true, false)}
        else {passi.fadeTo(100, 0)}

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
        fame.width -= .05;
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
                if (fame.width > 200) {fame.width = 250}
                else {fame.width += 50}
            }
        }

        // Cespuglio
        game.physics.arcade.overlap(soffio, fruits, soffioCespuglio, null, this);
        function soffioCespuglio(soffio, fruit) {
            fruit.body.gravity.y = 600;
        }

        // Rami
        rami.children.forEach( function(ramo) {
            if (ramo.body.touching.up && ramo.cade==true) {
                game.time.events.add(200, cadeRamo, this);
                function cadeRamo() {if (ramo.body.touching.up) {ramo.body.gravity.y = 800; ramo.angle += 1.5*Math.random()}}
            }
            if (ramo.y > game.world.height+3000) {
                ramo.body.gravity.y = 0;
                ramo.body.velocity.y = 0;
                ramo.body.y = ramo.posY;
                ramo.angle = 0;
            }
        })

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

        // Sound
        if (ponteDX.y>game.world.height && musicTrigger==0) {
            maialiSFX.stop();
            maialiSFX2.stop();
            music.fadeOut(2000);
            musicTrigger=1;
        }
    },

    render: function() {
        // game.debug.spriteCoords(player, 10, 762);
    }
}
