var level1D = {

    create: function() {
        currentLevel = 'level1D';
        if (check1D==true) {playerX = 220*16; playerY = 43*16;}
        else {playerX = 200; playerY = 1618;}
        cattura = 0;
        maialiTrigger = 0;
        soffioTrigger = 0;

        // Sound
        game.sound.stopAll();
        morso = game.add.audio('morso', .2); morso.allowMultiple = true;
        morteSFX = game.add.audio('morte');
        cascataSFX = game.add.audio('cascataSFX', 0).loopFull(); cascataSFX.fadeTo(4000, .2);
        forestaGiorno = game.add.audio('foresta-giorno', 0).loopFull(); forestaGiorno.fadeTo(2000, 1.5);
        maialiSFX = game.add.audio('maialiSFX', 0).loopFull();
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
        game.world.setBounds(0, 0, 533*16-50, 138*16);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;

        // Background
        game.add.sprite(0, 0, 'cascata-bg');

        // Checkpoint
        check = game.add.sprite(220*16, 48*16, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        fiammaCheck = check.addChild(game.make.sprite(0, -check.height, 'fiamma-check'));
        fiammaCheck.anchor.setTo(.5,1.2);
        fiammaCheck.animations.add('fiammaCheck', [0,1,2,1], 10, true);
        fiammaCheck.animations.play('fiammaCheck');
        if (check1D==true) {fiammaCheck.scale.setTo(1)}
        else {fiammaCheck.scale.setTo(0)}

        // Trees
        trees = game.add.group();
        tree1 = trees.create(492*16, 47*16, 'tree');
        trees.setAll('anchor.x', .5);
        trees.setAll('anchor.y', 1);

        // Cartello
        cartelli = game.add.group();
        cartelli.enableBody = true;
        cartelli.create(472*16, 47*16, 'cartello');
        cartelli.setAll('anchor.x', .5);
        cartelli.setAll('anchor.y', 1);

        // Waterfall
        waterfall = game.add.tileSprite(240*16, 48*16, 216*16, 100*16, 'waterfall');
        waterfall2 = game.add.tileSprite(240*16, 48*16, 216*16, 100*16, 'waterfall');
        waterfall2.alpha = .2; waterfall2.tilePosition.x = 90;
        cresta = game.add.tileSprite(waterfall.x, waterfall.y-30, waterfall.width, 62, 'cresta'); cresta.animations.add('schiuma', [0,1,2,3], 5, true); cresta.animations.play('schiuma');
        cresta2 = game.add.tileSprite(waterfall.x, waterfall.y-30, waterfall.width, 62, 'cresta'); cresta2.animations.add('schiuma2', [2,3,0,1], 6, true); cresta2.animations.play('schiuma2'); cresta2.tilePosition.x = 20; cresta2.alpha=.5;
        cresta3 = game.add.tileSprite(waterfall.x, waterfall.y-30, waterfall.width, 62, 'cresta'); cresta3.animations.add('schiuma3', [1,2,3,0], 4, true); cresta3.animations.play('schiuma3'); cresta3.tilePosition.x = 30; cresta3.alpha=.3;

        // Tronchi
        tronchi = game.add.group();
        tronchi.enableBody = true;
        game.time.events.add(   0, function() { game.time.events.loop(4000, function() {tronchi.create(302*16,waterfall.y,'tronco-cascata')}, this) }, this);
        game.time.events.add(2000, function() { game.time.events.loop(4000, function() {tronchi.create(339*16,waterfall.y,'tronco-cascata')}, this) }, this);
        game.time.events.add(   0, function() { game.time.events.loop(3000, function() {tronchi.create(395*16,waterfall.y,'tronco-cascata')}, this) }, this);
        game.time.events.add(2000, function() { game.time.events.loop(3000, function() {tronchi.create(411*16,waterfall.y,'tronco-cascata')}, this) }, this);

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

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(42*16, 70*16, 'sasso');

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,1);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
            sasso.body.setSize(150,140,5,5);
        })

        // Segreti
        segreto = game.add.sprite(0,0,'level1D-segreto');

        // Slopes
        mappa = game.add.tilemap('level1D');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sassi]);
        game.slopes.preferY = true;
        ground.alpha = 0;
        game.add.sprite(0,0,'level1D');

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;

        maiale1 = maiali.create(3330, 67*16, 'maiale-lanciafiamme'); maiale1.scale.x = -1;
        maiale4 = maiali.create(game.world.width-1500, 47*16, 'maiale-lanciafiamme');
        maiale3 = maiali.create(game.world.width-1400, 47*16, 'maiale-lanciafiamme');
        maiale2 = maiali.create(game.world.width+ 300, 47*16, 'maiale-lanciafiamme');
        maiale2.scale.x=-1; maiale2.alpha=0; maiale3.alpha=0; maiale4.alpha=0;

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,1);
            maiale.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
            maiale.body.setSize(310,120,50,0);
        })

        fiamma = maiale1.addChild(game.make.sprite(60,-38,'fiamma'));
        fiamma.anchor.setTo(.5, 1);
        fiamma.frame = 7;
        fiamma.angle = 90;
        fiamma.animations.add('fuoco', [0,1,2,3,2,3,2,3,2,3,2,3,4,5,6,7], 10);
        game.time.events.loop(3500, function(){fiamma.animations.play('fuoco')});

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
        fame = game.add.graphics(50 , 25);
        fame.beginFill(0xfefefe, .3);
        fame.drawRect(1, 2, 250, 16);
        fame.endFill();
        fame.fixedToCamera = true;
        fame.width = currentFame;
        barra = game.add.graphics(50, 25);
        barra.lineStyle(3, 0xffffff, .8); //0x44392f
        barra.drawRoundedRect(0, 0, 252, 20, 100);
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
            cascataSFX.fadeOut(500); forestaGiorno.fadeOut(500); maialiSFX.stop();
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            cascataSFX.fadeOut(1100); forestaGiorno.fadeOut(1100); maialiSFX.stop();
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
            cascataSFX.fadeOut(500); forestaGiorno.fadeOut(500); maialiSFX.stop();
            game.camera.fade(0x000000,500);
            game.camera.onFadeComplete.add(function(){game.state.start('intermezzoState')})
        }
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
        waterfall.tilePosition.y += 2;
        waterfall2.tilePosition.y += 3;

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {
            if (check1D==false) {game.add.tween(fiammaCheck.scale).to( {y:1,x:1}, 100, sin).start()}
            check1D=true;
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
        else if (cattura==0) {
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
            tronco.anchor.setTo(.5);
            tronco.body.immovable = true;
            tronco.body.acceleration.y = 50;
            tronco.body.maxVelocity.y = 180;
            if (tronco.y > game.world.height) {tronco.destroy()}
        })

        // Maiali
        game.physics.arcade.overlap(player, maiale1, brucia, null, this);
        function brucia() {
            if (fiamma.frame>=1 && fiamma.frame<=5) {gameOver()}
        }

        // Segreto
        if (player.x > 7250 && player.y > 1000) {segreto.alpha = 0}
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
            maialiSFX.fadeTo(1000, .4);
        }

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};

        // Sound
        if (player.x>=2650 && player.x<=3850 && maialiTrigger==0) {
            maialiTrigger=1;
            maialiSFX.fadeTo(1000, .2);
        }
        else if (player.x<2650 || player.x>3850 && maialiTrigger==1) {
            maialiTrigger=0;
            maialiSFX.fadeTo(1000, .01);
        }

    },

    render: function() {
        // game.debug.spriteCoords(player, 10, 762);
        // game.debug.body(maiale1);
        //game.debug.body(sasso1);
    }
}
