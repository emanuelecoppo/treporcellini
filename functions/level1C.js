var level1C = {

    create: function() {
        game.input.keyboard.start();
        currentLevel = 'level1C';
        if (check1C==true) {playerX = 243*16; playerY = 1220;}
        else {playerX = 310; playerY = 1200;}

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);

        /// World
        game.world.setBounds(0, 0, 610*16-50, 100*16);
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
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'notte2');
        parallax0.fixedToCamera = true;
        parallax1.fixedToCamera = true;
        parallax2.fixedToCamera = true;

        // Checkpoint
        check = game.add.sprite(243*16, 79*16, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        if (check1C==true) {check.frame=1}
        else {check.frame=0}

        // Trees
        trees = game.add.group();
        tree1 = trees.create( 20*16, 0, 'brown'); //inizio
        tree2 = trees.create( 55*16, 0, 'brown'); //inizio
        tree3 = trees.create( 85*16, 0, 'brown'); //inizio
        tree4 = trees.create(143*16, 0, 'brown'); //sasso
        tree5 = trees.create(220*16, 0, 'brown'); //burrone
        tree6 = trees.create(285*16, 0, 'brown'); //inizio lago
        tree7 = trees.create(358*16, 0, 'brown'); //trap
        tree8 = trees.create(410*16, 0, 'brown'); //trap
        tree9 = trees.create(514*16, 0, 'brown'); //maiale
        tree10= trees.create(543*16, 0, 'brown'); //maiale
        tree11= trees.create(game.world.width-300, 0, 'brown'); //fine
        trees.setAll('anchor.x', .5);
        trees.setAll('scale.x', 6*16);
        trees.setAll('scale.y', game.world.height);

        // Rami
        rami = game.add.group();
        rami.enableBody = true;

        rami.create( tree1.right+50, 67*16, 'brown').cade=true;
        rami.create( tree1.left -50, 55*16, 'brown');
        rami.create( tree1.right+50, 43*16, 'brown').cade=true;
        rami.create( tree2.left -50, 62*16, 'brown').cade=true;
        rami.create( tree2.right+50, 50*16, 'brown'); //fruit
        rami.create( tree3.left -50, 62*16, 'brown').cade=true;
        rami.create( tree3.right+50, 50*16, 'brown').cade=true;
        rami.create( tree4.left -50, 55*16, 'brown');
        rami.create( tree5.left -50, 55*16, 'brown').cade=true
        rami.create( tree5.right+50, 88*16, 'brown'); //fruit
        rami.create( tree7.left -50, 45*16, 'brown').trap=true;
        rami.create( tree7.right+50, 60*16, 'brown').trap=true;
        rami.create( tree8.left -50, 55*16, 'brown').trap=true;
        rami.create( tree9.left -50, 67*16, 'brown').cade=true;
        rami.create( tree9.right+50, 55*16, 'brown').cade=true;
        rami.create(tree10.right+50, 67*16, 'brown').cade=true;
        rami.create(tree10.left -50, 57*16, 'brown').cade=true;
        rami.create(tree10.right+50, 45*16, 'brown'); //fruit

        rami.children.forEach( function(ramo) {
            ramo.posY = ramo.body.y //memorizza Y iniziale
            ramo.anchor.x = .5;
            ramo.scale.setTo(100,16);
            ramo.body.immovable = true;
            ramo.body.maxVelocity.y = 800;
        })

        // Fruits
        cespugli = game.add.group();
        cespugli.create( 10*16, 78*16, 'cespuglio');
        cespugli.create(160*16, 78*16, 'cespuglio');
        cespugli.create(256*16, 79*16, 'cespuglio');
        cespugli.create(432*16, 77*16, 'cespuglio');
        cespugli.create(533*16, 78*16, 'cespuglio');
        cespugli.create(game.world.width-250, 78*16, 'cespuglio');

        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create(tree2.right+40, 750, 'fruit');
        fruits.create(tree4.left -60, 800, 'fruit');
        fruits.create(tree5.right+40, 1300, 'fruit');
        fruits.create(463*16, 76*16, 'fruit'); //radice
        fruits.create(tree10.right+40, 670, 'fruit');

        cespugli.children.forEach( function(cespuglio) {
            cespuglio.anchor.setTo(.5,1);
            //cespuglio.scale.setTo(.5,.5);
            fruits.create(cespuglio.centerX-20, cespuglio.centerY-10, 'fruit').cespuglio = true;
        })
        fruits.children.forEach( function(fruit) {
            fruit.scale.setTo(.1,.1);
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Water (dietro)
        water = game.add.sprite(270*16, 79*16, 'blue');
        water.scale.setTo(150*16, 20*16);
        game.physics.arcade.enable(water);
        water.body.immovable = true;

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
        sassi.create(122*16, 65*16, 'sasso');

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,.5);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
            sasso.scale.setTo(1,1);
        })

        // Zattera
        zattera = game.add.sprite(273*16, 78*16+5, 'zattera')
        game.physics.arcade.enable(zattera);
        zattera.body.bounce.x = 0.5;
        zattera.body.drag.x = 50;
        zattera.body.maxVelocity.x = 125;
        zattera.scale.setTo(.2,.2);
        game.add.tween(zattera).to( {y: zattera.y+5}, 1000, sin, true, 0, -1, true);

        // Water (davanti)
        waterD = game.add.sprite(270*16, 79*16, 'blue')
        waterD.scale.setTo(150*16, 20*16);
        waterD.alpha = .6;

        // Fango
        fango = game.add.group();
        fango.enableBody = true;
        fango.create( 38*16, 78*16, 'brown').scale.x = 64*16; //inizio
        fango.create(464*16, 78*16, 'brown').scale.x = 37*16; //radice
        fango.create(557*16, 78*16, 'brown').scale.x = 26*16; //fine
        fango.setAll('body.immovable', true);
        fango.setAll('scale.y', 10*16);

        // Mosche
        mosche = game.add.group();
        mosche.enableBody = true;
        mosche.create(301*16, 1000, 'flies');
        mosche.create(326*16, 1000, 'flies');
        mosche.create(384*16, 1000, 'flies');

        mosche.children.forEach( function(mosca) {
            mosca.anchor.setTo(.5,1);
            mosca.scale.setTo(.18,.18);
            game.add.tween(mosca).to( {y: zattera.top}, 1700+250*Math.random(), sin, true, 0, -1, true);
            game.add.tween(mosca).to( {x: mosca.x+15}, 1000+500*Math.random(), sin, true, 0, -1, true);
        })

        // Slopes
        mappa = game.add.tilemap('level1C');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, sassi, zattera]);
        game.slopes.preferY = true;

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
        function nextState() {game.camera.fade('#000',500); game.camera.onFadeComplete.add(function(){game.state.start('level1D')});}
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
        function checkpoint() {check.frame=1; check1C=true}

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

        // Zattera
        if (s.isDown && zattera.body.touching.up==true) {
            if (facing=='left') {zattera.body.velocity.x += 5}
            else if (facing=='right') {zattera.body.velocity.x -= 5}
        }

        // Rami
        rami.children.forEach( function(ramo) {
            if (ramo.body.touching.up && ramo.cade==true) {
                game.time.events.add(200, cadeRamo, this);
                function cadeRamo() {if (ramo.body.touching.up) {ramo.body.gravity.y = 800}}
            }
            else if (player.x>ramo.left-50 && player.x<ramo.right+50 && ramo.trap==true) {
                ramo.body.gravity.y = 800;
            }
            if (ramo.y > game.world.height+3000 && !ramo.trap==true) {
                ramo.body.gravity.y = 0;
                ramo.body.velocity.y = 0;
                ramo.body.y = ramo.posY;
            }
            if (game.physics.arcade.collide(player, ramo) && ramo.trap==true) {gameOver()}
        })

        // Mosche & Maiali
        game.physics.arcade.overlap(player, mosche, gameOver, null, this);
        game.physics.arcade.overlap(player, maiali, gameOver, null, this);

        // Vola
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {player.body.gravity.y = 0};

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(maiale1);
    }
}
