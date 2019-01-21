var level1C = {

    create: function() {
        currentLevel = 'level1C';
        if (check1C==true) {playerX = 243*16; playerY = 1220;}
        else {playerX = 310; playerY = 1200;}
        maialiTrigger = 0;
        moscheTrigger = 0;
        soffioTrigger = 0;

        // Sound
        game.sound.stopAll();
        morso = game.add.audio('morso', .2); morso.allowMultiple = true;
        morteSFX = game.add.audio('morte');
        ramoSFX = game.add.audio('ramoSFX');
        forestaGiorno = game.add.audio('foresta-giorno', 0).loopFull(); forestaGiorno.fadeTo(2000, 1.5);
        maialiSFX = game.add.audio('maialiSFX', 0).loopFull();
        moscheSFX = game.add.audio('moscheSFX', 0).loopFull();
        passi = game.add.audio('passi');
        soffioSFX = game.add.audio('soffioSFX', 0).loopFull();

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
        game.world.setBounds(0, 0, 610*16-50, 100*16);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;

        // Background
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'palude0');
        shrek = game.add.sprite(30*16, 43*16, 'shrek'); shrek.anchor.setTo(.5,1);
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'palude1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'palude2');
        parallax0.fixedToCamera = true;
        parallax1.fixedToCamera = true;
        parallax2.fixedToCamera = true;
        shrek.fixedToCamera = true;

        // Checkpoint
        check = game.add.sprite(243*16, 79*16, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        fiammaCheck = check.addChild(game.make.sprite(0, -check.height, 'fiamma-check'));
        fiammaCheck.anchor.setTo(.5,1.2);
        fiammaCheck.animations.add('fiammaCheck', [0,1,2,1], 10, true);
        fiammaCheck.animations.play('fiammaCheck');
        if (check1C==true) {fiammaCheck.scale.setTo(1)}
        else {fiammaCheck.scale.setTo(0)}

        // Trees
        trees = game.add.group();
        tree1 = trees.create( 20*16, 78*16, 'tree'); //inizio
        tree2 = trees.create( 55*16, 80*16, 'tree'); //inizio
        tree3 = trees.create( 85*16, 80*16, 'tree'); //inizio
        tree4 = trees.create(143*16, 78*16, 'tree'); //sasso
        tree5 = trees.create(220*16, game.world.height, 'tree'); //burrone
        tree6 = trees.create(285*16, 81*16, 'tree'); //inizio lago
        tree7 = trees.create(358*16, 81*16, 'tree'); //lago
        tree8 = trees.create(410*16, 81*16, 'tree'); //lago
        tree9 = trees.create(514*16, 78*16, 'tree'); //maiale
        tree10= trees.create(543*16, 78*16, 'tree'); //maiale
        tree11= trees.create(game.world.width-300, 0, 'tree'); //fine
        trees.setAll('anchor.x', .5);
        trees.setAll('anchor.y', 1);

        // Rami
        rami = game.add.group();
        rami.enableBody = true;
        game.world.sendToBack(rami); game.world.sendToBack(parallax2); game.world.sendToBack(parallax1); game.world.sendToBack(shrek); game.world.sendToBack(parallax0);
        rami.create( tree1.right-4, 67*16, 'ramo').cade=true;
        rami.create( tree1.left +4, 55*16, 'ramoSX');
        rami.create( tree1.right-4, 43*16, 'ramo').cade=true;
        rami.create( tree2.left +4, 62*16, 'ramoSX').cade=true;
        rami.create( tree2.right-4, 50*16, 'ramo'); //fruit
        rami.create( tree3.left +4, 62*16, 'ramoSX').cade=true;
        rami.create( tree3.right-4, 50*16, 'ramo').cade=true;
        rami.create( tree4.left +4, 55*16, 'ramoSX');
        rami.create( tree5.left +4, 55*16, 'ramoSX').cade=true
        rami.create( tree5.right-4, 88*16, 'ramo'); //fruit
        rami.create( tree7.left +4, 57*16, 'ramoSX');
        rami.create( tree7.right-4, 68*16, 'ramo').cade=true;
        // rami.create( tree8.left +4, 55*16, 'ramoSX');
        rami.create( tree9.left +4, 67*16, 'ramoSX').cade=true;
        rami.create( tree9.right-4, 55*16, 'ramo').cade=true;
        rami.create(tree10.right-4, 67*16, 'ramo').cade=true;
        rami.create(tree10.left +4, 57*16, 'ramoSX').cade=true;
        rami.create(tree10.right-4, 45*16, 'ramo'); //fruit

        rami.children.forEach( function(ramo) {
            ramo.posY = ramo.body.y //memorizza Y iniziale
            ramo.anchor.x = .5;
            ramo.body.immovable = true;
            ramo.body.maxVelocity.y = 800;
        })

        // Cartello
        cartelli = game.add.group();
        cartelli.enableBody = true;
        cartelli.create(9590, 78*16, 'cartello');
        cartelli.setAll('anchor.x', .5);
        cartelli.setAll('anchor.y', 1);

        // Fruits
        cespugli = game.add.group();
        cespugli.create( 10*16, 78*16, 'cespuglio');
        cespugli.create(160*16, 78*16, 'cespuglio');
        cespugli.create(256*16, 79*16, 'cespuglio');
        cespugli.create(432*16, 77*16, 'cespuglio');
        cespugli.create(530*16, 78*16, 'cespuglio');
        cespugli.create(game.world.width-300, 78*16, 'cespuglio');

        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create(tree2.right-20, 750, 'fruit');
        fruits.create(tree4.left-20, 800, 'fruit');
        fruits.create(tree5.right-20, 1300, 'fruit');
        fruits.create(tree7.left-20, 800, 'fruit');
        fruits.create(463*16, 76*16, 'fruit'); //radice
        fruits.create(tree10.right-20, 670, 'fruit');

        cespugli.children.forEach( function(cespuglio) {
            cespuglio.anchor.setTo(.5,1);
            fruits.create(cespuglio.centerX-20, cespuglio.centerY-10, 'fruit').cespuglio = true;
        })
        fruits.children.forEach( function(fruit) {
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Water
        water = game.add.tileSprite(270*16, 79*16, 150*16, 15*16, 'water');
        game.physics.arcade.enable(water);
        water.body.immovable = true;

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

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(122*16, 65*16, 'sasso').scale.setTo(.75);

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,1);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
            sasso.body.setSize(150,140,5,5);
        })

        // Zattera
        zattera = game.add.sprite(273*16, 78*16+5, 'zattera')
        game.physics.arcade.enable(zattera);
        zattera.body.bounce.x = 0.5;
        zattera.body.drag.x = 50;
        zattera.body.maxVelocity.x = 125;
        game.add.tween(zattera).to( {y: zattera.y+5}, 1000, sin, true, 0, -1, true);

        // Water
        waterD = game.add.tileSprite(270*16, 79*16, 150*16, 15*16, 'water');
        waterD.alpha = .7;
        water.animations.add('waves', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]);
        waterD.animations.add('waves', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]);
        water.animations.play('waves', 8, true);
        waterD.animations.play('waves', 8, true);

        // Fango
        fango = game.add.group();
        fango.enableBody = true;
        fango.add(game.add.tileSprite( 38*16, 78*16, 64*16, 10*16, 'fango')); //inizio
        fango.add(game.add.tileSprite(464*16, 78*16, 64*16, 10*16, 'fango')); //radice
        fango.add(game.add.tileSprite(557*16, 78*16, 64*16, 10*16, 'fango')); //fine
        fango.setAll('body.immovable', true);

        // Mosche
        mosche = game.add.group();
        mosche.enableBody = true;
        mosche1 = mosche.add(game.make.sprite(301*16, 1000, 'flies'));
        mosche2 = mosche.add(game.make.sprite(326*16, 1000, 'flies'));
        mosche3 = mosche.add(game.make.sprite(384*16, 1000, 'flies'));

        mosche.children.forEach( function(mosca) {
            mosca.anchor.setTo(.5,1);
            mosca.animations.add('sciame', [0,1,2,3,4,5,6,7,8], 15, true);
            mosca.animations.play('sciame');
            mosca.scale.setTo(.7);
            // mosca.body.setCircle(170);
            mosca.body.setSize(220,250,60,60);
            game.add.tween(mosca).to( {y: zattera.top}, 1700+250*Math.random(), sin, true, 0, -1, true);
        })

        // Slopes
        mappa = game.add.tilemap('level1C');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sassi, zattera]);
        game.slopes.preferY = true;
        ground.alpha = 0;
        game.add.sprite(0,game.world.height, 'level1C').anchor.setTo(0,1);

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(549*16, 78*16, 'maiale-torcia');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
            maiale.body.setSize(250,120,50,0);

            var torcia = maiale.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);

            maialeA = game.add.tween(maiale).to( {x: maiale.x-40*16}, 5000).delay(2000).start();
            maialeB = game.add.tween(maiale).to( {x: maiale.x      }, 5000).delay(2000);
            maialeA.onStart.add   (function() {maiale.scale.x=-1; maiale.animations.play('walk')});
            maialeB.onStart.add   (function() {maiale.scale.x= 1; maiale.animations.play('walk')});
            maialeA.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 0});
            maialeB.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 0});
            maialeA.chain(maialeB, maialeA);
        })

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
            forestaGiorno.fadeOut(500);
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            forestaGiorno.fadeOut(1100);
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
            forestaGiorno.fadeOut(500);
            game.camera.fade(0x000000,500);
            game.camera.onFadeComplete.add(function(){game.state.start('level1D')});}
        if (player.y > game.world.height+200) {gameOver()};
        if (player.x > game.world.width) {nextState()}

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

        // Collisions
        game.physics.arcade.collide(player, [boundL, boundR]);
        game.physics.arcade.collide([player, fruits], [ground, rami]);
        sassi.setAll('body.immovable', true); zattera.body.immovable = true; game.physics.arcade.collide([sassi, zattera], player);
        sassi.setAll('body.immovable', false); zattera.body.immovable = false; game.physics.arcade.collide([sassi, zattera], ground);

        // Parallax
        parallax0.tilePosition.x = 0;
        parallax1.tilePosition.x = -0.5 * game.camera.x;
        parallax2.tilePosition.x = -0.9 * game.camera.x;

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {
            if (check1C==false) {game.add.tween(fiammaCheck.scale).to( {y:1,x:1}, 100, sin).start()}
            check1C=true;
        }

        // Velocity
        player.body.velocity.x = 0.8 * player.body.velocity.x;
        player.body.drag.x = 1600;

        if (game.physics.arcade.overlap(player, fango)) {
            walk = 100;
            jump = 75;
            player.body.gravity.y = 150;
        }
        else if (game.physics.arcade.overlap(player, water)) {
            walk = 150;
            jump = 150;
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

        // Sasso
        game.physics.arcade.overlap(soffio, sassi, soffiaSasso, null, this);
        function soffiaSasso(soffio, sasso) {
            if (facing=='left') {sasso.body.velocity.x -= 5}
            else if (facing=='right') {sasso.body.velocity.x += 5}
        }

        // Zattera
        if (soffia.isDown && zattera.body.touching.up==true) {
            if (facing=='left') {zattera.body.velocity.x += 5}
            else if (facing=='right') {zattera.body.velocity.x -= 5}
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

        // Mosche & Maiali
        game.physics.arcade.overlap(player, mosche, gameOver, null, this);
        game.physics.arcade.overlap(player, maiali, gameOver, null, this);

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

        // Sound
        if (player.x>=7600 && maialiTrigger==0) {
            maialiTrigger=1;
            maialiSFX.fadeTo(1000, .1);
        }
        else if (player.x<7600 && maialiTrigger==1) {
            maialiTrigger=0;
            maialiSFX.fadeTo(1000, .01);
        }
        if (player.x>=280*16 && player.x<=420*16 && moscheTrigger==0) {
            moscheTrigger=1;
            moscheSFX.fadeTo(1000, .5);
        }
        else if (player.x<280*16 || player.x>420*16 && moscheTrigger==1) {
            moscheTrigger=0;
            moscheSFX.fadeTo(1000, .01);
        }
    },

    render: function() {
        // game.debug.spriteCoords(player, 10, 762);
        // game.debug.body(mosche1);game.debug.body(mosche2);game.debug.body(mosche3);
    }
}
