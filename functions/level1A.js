var level1A = {

    create: function() {
        currentLevel = 'level1A';
        if (check1A==true) {playerX = 304*16; playerY = 79*16;}
        else {playerX = 75; playerY = 1720;}
        fuga = 0;
        dialogo = 0;

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

        // World
        game.world.setBounds(0, 0, 480*16-50, 130*16);
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
        grottaBg = game.add.sprite(0, game.world.height, 'grotta-bg').anchor.setTo(0,1);

        // Checkpoint
        check = game.add.sprite(304*16, 82*16, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        if (check1A==true) {check.frame=1}
        else {check.frame=0}

        // Trees
        trees = game.add.group();
        tree1 = trees.create(329*16, 0, 'brown');
        tree2 = trees.create(430*16, 0, 'brown');
        trees.setAll('anchor.x', .5);
        trees.setAll('scale.x', 6*16);
        trees.setAll('scale.y', game.world.height);

        // Rami
        rami = game.add.group();
        rami.enableBody = true;
        rami.create(tree1.left -50, 50*16, 'brown');
        rami.create(tree2.left -50, 70*16, 'brown').cade = true;
        rami.create(tree2.right+50, 60*16, 'brown');

        rami.children.forEach( function(ramo) {
            ramo.posY = ramo.body.y //memorizza Y iniziale
            ramo.anchor.x = .5;
            ramo.scale.setTo(100,16);
            ramo.body.immovable = true;
            ramo.body.maxVelocity.y = 800;
        })

        // Water
        water = game.add.tileSprite(0, game.world.height-15, 3500, 15, 'water');
        game.physics.arcade.enable(water);
        water.body.immovable = true;
        water.animations.add('waves', [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1]);
        water.animations.play('waves', 8, true);

        // Cartello
        cartello = game.add.sprite(500, 2000, 'cartello');
        cartello.anchor.setTo(.5);
        cartello.scale.setTo(.2);
        game.physics.arcade.enable(cartello);
        hint = cartello.addChild(game.add.text (0, -200, "Prova a spostare questo ostacolo,\npremi S per soffiare.", styleC));
        hint.alpha = 0; hint.anchor.x=.5;
        hint.setScaleMinMax(1, 1);

        // Fruits
        cespugli = game.add.group();
        cespugli.create(315*16, 82*16, 'cespuglio');

        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create(274*16, 500, 'fruit'); //dopo grotta
        fruits.create(382*16, 1000, 'fruit'); //metà tronco
        fruits.create(402*16, 1000, 'fruit'); //fine tronco
        fruits.create(tree2.right+40, 900, 'fruit');

        cespugli.children.forEach( function(cespuglio) {
            cespuglio.anchor.setTo(.5,1);
            fruits.create(cespuglio.centerX-20, cespuglio.centerY-10, 'fruit').cespuglio = true;
        })
        fruits.children.forEach( function(fruit) {
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Rametto
        rametto = game.add.sprite(455*16, 80*16, 'rametto');
        rametto.anchor.x = .5;

        // Tronco Stealth (1)
        troncoS = game.add.sprite(350*16-2, 75*16-4, 'tronco-cavo');

        // Maiali Tronco
        maiali = game.add.group();
        maiali.enableBody = true;
        maiale1 = maiali.create(352*16, 75*16, 'maiale-torcia'); maiale1.scale.x = -1;
        maiale2 = maiali.create(375*16, 75*16, 'maiale-torcia'); maiale2.scale.x = -1;
        maiale3 = maiali.create(391*16, 75*16, 'maiale-torcia'); maiale3.scale.x = 1;

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.frame = 12;
            maiale.body.offset.x = 50;

            var torcia = maiale.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);
            game.physics.arcade.enable(torcia);

            torciaA = game.add.tween(torcia).to( {angle: 55}, 750, sin).delay(500+1500*Math.random()).start();
            torciaB = game.add.tween(torcia).to( {angle:  0}, 750, sin).delay(500+1500*Math.random());
            torciaA.onStart.add(function() {game.add.tween(maiale.body).to({width:180}, 750, sin).start(); game.add.tween(maiale.body.offset).to({y:125}, 750, sin).start() });
            torciaB.onStart.add(function() {game.add.tween(maiale.body).to({width:250}, 750, sin).start(); game.add.tween(maiale.body.offset).to({y:  0}, 750, sin).start() });
            torciaA.chain(torciaB, torciaA);
        })

        // Tronco Stealth (2)
        troncoSS = game.add.sprite(troncoS.x, troncoS.y, 'tronco-cavo-sopra');

        // Safe Area
        safe = game.add.group();
        safe.enableBody = true;
        safe.add(game.add.graphics(350*16+15, troncoS.y).lineStyle(1,0xffffff,0).drawRect(0, 0, 18*16-30, 6*16));
        safe.add(game.add.graphics(373*16+15, troncoS.y).lineStyle(1,0xffffff,0).drawRect(0, 0, 20*16-30, 6*16));
        safe.add(game.add.graphics(398*16+15, troncoS.y).lineStyle(1,0xffffff,0).drawRect(0, 0, 12*16-30, 6*16));

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

        // Stalattiti
        stalattiti = game.add.group();
        stalattiti.enableBody = true;
        stalattiti.create(35*16, 98*16, 'stalattite');
        stalattiti.create(74*16, 97*16, 'stalattite');
        stalattiti.create(140*16, 99*16, 'stalattite');
        stalattiti.create(174*16, 99*16, 'stalattite');
        stalattiti.create(222*16, 95*16, 'stalattite');
        stalattiti.setAll('body.immovable', true);
        stalattiti.setAll('anchor.x', .5);

        // Maiali Fuga
        maialiF = game.add.group();
        maialiF.alpha = 0;
        maiale4 = maialiF.create(390*16, 82*16, 'maiale-torcia');
        maiale5 = maialiF.create(390*16, 82*16, 'maiale-torcia');
        maiale6 = maialiF.create(390*16, 82*16, 'maiale-torcia');

        maialiF.children.forEach( function(maialeF) {
            maialeF.anchor.setTo(.5,1);
            maialeF.frame = 12;
            maialeF.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);

            var torcia = maialeF.addChild(game.make.sprite(30, -46, 'torcia'));
            torcia.anchor.setTo(.11,.528);
        })

        maiale4A = game.add.tween(maiale4).to( {x: rametto.x-330}, 2000+500*Math.random()).delay(500);
        maiale5A = game.add.tween(maiale5).to( {x: rametto.x-280}, 2000+500*Math.random()).delay(250);
        maiale6A = game.add.tween(maiale6).to( {x: rametto.x-200}, 2000+500*Math.random()).delay(0);
        playerA =  game.add.tween(player).to(  {x: game.world.width+50}, 1000).delay(1000);
        maiale4A.onStart.add   (function() {maiale4.animations.play('walk')});
        maiale5A.onStart.add   (function() {maiale5.animations.play('walk')});
        maiale6A.onStart.add   (function() {maiale6.animations.play('walk')});
        playerA.onStart.add    (function() {player.animations.play('right')});
        maiale4A.onComplete.add(function() {maiale4.animations.stop(); maiale4.frame = 12});
        maiale5A.onComplete.add(function() {maiale5.animations.stop(); maiale5.frame = 12});
        maiale6A.onComplete.add(function() {maiale6.animations.stop(); maiale6.frame = 12; player.frame = 11});
        maiale6A.chain(playerA);

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(245*16, 105*16, 'sasso');

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,.5);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
            sasso.scale.setTo(1,1);
        })

        // Slopes
        mappa = game.add.tilemap('level1A');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sassi]);
        game.slopes.preferY = true;
        //ground.alpha=.5;
        game.add.sprite(0,game.world.height,'level1A').anchor.setTo(0,1);

        // Dialogo
        text1 = game.add.text(-150, -40, "Perché la mamma\nnon è ancora arrivata?", styleL);
        text2 = game.add.text(   0,-120, "Non ti preoccupare, vedrai\nche ci raggiungerà.", styleC);
        // player.children.forEach(function(text) {text.alpha=0; text.anchor.x=.5})
        text1.anchor.x=.5; text1.alpha=0; text2.anchor.x=.5; text2.alpha=0;
        textA = game.add.tween(text1).to( {alpha: 1}, 250).yoyo(true, 3000).delay(1000);
        textB = game.add.tween(text2).to( {alpha: 1}, 250).yoyo(true, 3000);
        // textB.onComplete.add(function() {game.input.keyboard.start()});
        textA.chain(textB);

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
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            game.physics.arcade.isPaused = true;
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.animations.stop();
            game.time.events.add(1500, function() {
                game.camera.fade(0x000000,100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});
            })
        }
        function nextState() {game.camera.fade(0x000000,500); game.camera.onFadeComplete.add(function(){game.state.start('level1B')});}
        if (player.y > game.world.height+200) {gameOver()};
        if (player.x > game.world.width) {nextState()};

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

        // Collisions
        game.physics.arcade.collide(player, [boundL, boundR]);
        game.physics.arcade.collide([player, fruits], [ground, rami]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

        // Parallax
        parallax0.tilePosition.x = 0;
        parallax1.tilePosition.x = -0.5 * game.camera.x;
        parallax2.tilePosition.x = -0.9 * game.camera.x;

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {check.frame=1; check1A=true}

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
        else if (fuga==0) {
            if (facing=='left') {player.frame = 11}
            else if (facing=='right') {player.frame = 12}
        }

        // Jump
        spacebar.onDown.add(jumpFunction);
        function jumpFunction() {
            if (player.body.touching.down || player.body.blocked.down) {player.body.velocity.y = -jump;}
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

        // Stalattiti
        if (game.physics.arcade.overlap(player, stalattiti)) {gameOver()};
        stalattiti.children.forEach( function(stalattite) {
            if (player.x > stalattite.left-100 && player.x < stalattite.right+100) {stalattite.body.gravity.y = 900};
            if (stalattite.top > game.world.height) {stalattite.kill()};
        })

        // Tronco Stealth
        game.physics.arcade.overlap(player, maiali, visto, null, this)
        function visto(player, maiale) {if (!game.physics.arcade.overlap(player, safe)) {gameOver()} }

        // Rami
        rami.children.forEach( function(ramo) {
            if (ramo.body.touching.up && ramo.cade==true) {
                game.time.events.add(200, cadeRamo, this);
                function cadeRamo() {if (ramo.body.touching.up) {ramo.body.gravity.y = 800}}
            }
            if (ramo.y > game.world.height + 3000) {
                ramo.body.gravity.y = 0;
                ramo.body.velocity.y = 0;
                ramo.body.y = ramo.posY;
            }
        })

        // Inizio Fuga
        if (player.x >= rametto.x && fuga==0) {
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 12;
            maialiF.alpha = 1;
            maiale4A.start(); maiale5A.start(); maiale6A.start();
            fuga ++;
        }

        // Dialogo
        text1.x=player.x-150; text1.y=player.y-40;
        text2.x=player.x; text2.y=player.y-120;
        if (player.x>=1725 && player.x<=1825 && dialogo==0) {
            //game.input.keyboard.stop();
            //cursors.right.isDown = false;
            //cursors.left.isDown = false;
            //player.body.velocity.x = 0;
            //player.animations.stop();
            //player.frame = 11;
            textA.start();
            dialogo ++;
        }

        // Cartello
        if (game.physics.arcade.overlap(player, cartello)) {game.add.tween(hint).to( {alpha: 1}, 50).start()}
        else {game.add.tween(hint).to( {alpha: 0}, 50).start()}

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};
    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(player, 'rgba(0,255,0,.1)');
        //game.debug.body(soffio, 'rgba(0,255,0,.2)');
        //game.debug.body(maiale1); game.debug.body(maiale2); game.debug.body(maiale3);
    }
}
