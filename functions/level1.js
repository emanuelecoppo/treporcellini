var level1 = {

    create: function() {

        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);

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

        // World
        game.world.setBounds(0, 0, 3870*16, 200*16);

        // Background
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax2');
        parallax0.fixedToCamera = true;
        parallax1.fixedToCamera = true;
        parallax2.fixedToCamera = true;
        grottaBg = game.add.sprite(0, game.world.height, 'grottaBg');
        grottaBg.anchor.y = 1;
        // grottaBg = game.add.graphics(0, game.world.height-58*16);
        // grottaBg.beginFill(0x221100, 1);
        // grottaBg.drawRect(0, 0, 443*16, 58*16);
        // grottaBg.endFill();

        // Trees (quelli con i rami)
        trees = game.add.group();
        tree1 = trees.create(1414*16, 0, 'brown');
        tree2 = trees.create(1460*16, 0, 'brown');
        tree3 = trees.create(1510*16, 0, 'brown');
        tree4 = trees.create(1556*16, 0, 'brown');
        tree5 = trees.create(1630*16, 0, 'brown');
        tree6 = trees.create(2230*16, 0, 'brown');
        tree7 = trees.create(2267*16, 0, 'brown');
        tree8 = trees.create(2343*16, 0, 'brown');
        tree9 = trees.create(2465*16, 0, 'brown');
        tree10 = trees.create(2515*16, 0, 'brown');
        tree11 = trees.create(2644*16, 0, 'brown');
        trees.setAll('anchor.x', .5);
        trees.setAll('scale.x', 6*16);
        trees.setAll('scale.y', game.world.height);

        // Rami
        rami = game.add.group();
        rami.enableBody = true;
        rami.create( tree1.left -50, 129*16, 'brown');
        rami.create( tree2.left -50, 119*16, 'brown');
        rami.create( tree2.right+50, 110*16, 'brown');
        rami.create( tree2.right+50, 129*16, 'brown');
        rami.create( tree2.right+50, 139*16, 'brown');
        rami.create( tree3.left -50, 139*16, 'brown');
        rami.create( tree3.right+50, 129*16, 'brown');
        rami.create( tree4.left -50, 134*16, 'brown');
        rami.create( tree4.right+50, 128*16, 'brown');
        rami.create( tree5.left -50, 133*16, 'brown');
        rami.create( tree6.left -50, 129*16, 'brown');
        rami.create( tree7.left -50, 141*16, 'brown');
        rami.create( tree7.right+50, 129*16, 'brown');
        rami.create( tree8.left -50, 134*16, 'brown');
        rami.create( tree8.right+50, 141*16, 'brown');
        rami.create( tree9.left -50, 136*16, 'brown');
        rami.create( tree9.right+50, 129*16, 'brown');
        rami.create(tree10.left -50, 138*16, 'brown');
        rami.create(tree10.right+50, 128*16, 'brown');
        rami.create(tree11.left -50, 139*16, 'brown');

        rami.children.forEach( function(ramo) {
            ramo.posY = ramo.body.y //memorizza Y iniziale
            ramo.anchor.x = .5;
            ramo.scale.setTo(100,16);
            ramo.body.immovable = true;
            ramo.body.maxVelocity.y = 800;
        })

        // Stalattiti
        stalattiti = game.add.group();
        stalattiti.enableBody = true;
        stalattiti.create(45*16, 168*16, 'stalattite');
        stalattiti.create(84*16, 167*16, 'stalattite');
        stalattiti.create(149*16, 166*16, 'stalattite');
        stalattiti.create(184*16, 169*16, 'stalattite');
        stalattiti.create(216*16, 169*16, 'stalattite');
        stalattiti.create(252*16, 165*16, 'stalattite');
        stalattiti.create(299*16, 162*16, 'stalattite');
        stalattiti.create(363*16, 165*16, 'stalattite');
        stalattiti.setAll('body.immovable', true);
        stalattiti.setAll('anchor.x', .5);

        // Water
        water = game.add.group();
        water.enableBody = true;
        water.alpha = 0.4;
        waterCascata = water.create(3380*16, 44*16, 'blue');
        waterCascata.scale.setTo(370*16, 156*16);
        waterGrotta = water.create(70*16, game.world.height-25, 'blue');
        waterGrotta.scale.setTo(250*16, 25);
        waterPonte = water.create(1080*16, game.world.height-400, 'blue');
        waterPonte.scale.setTo(70*16, 400);
        waterZattera = water.create(1730*16, game.world.height-49*16, 'blue');
        waterZattera.scale.setTo(253*16, 49*16);
        water.setAll('body.immovable', true);

        // Tronchi
        tronchi = game.add.group();
        tronchi.enableBody = true;

        game.time.events.loop(Phaser.Timer.SECOND*4, creaTronco, game);
        function creaTronco() {
            tronchi.create(3463*16, 43*16, 'brown');
            tronchi.create(3493*16, 43*16, 'brown');
            tronchi.create(3536*16, 43*16, 'brown');
            tronchi.create(3554*16, 34*16, 'brown');
            tronchi.create(3587*16, 42*16, 'brown');
            tronchi.create(3615*16, 45*16, 'brown');
            tronchi.create(3625*16, 18*16, 'brown');
            tronchi.create(3633*16, 35*16, 'brown');
            tronchi.create(3668*16, 43*16, 'brown');
        }

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        for (var i = 0; i < 100; i++) { fruit = fruits.create(i*550, 0, 'fruit'); }
        fruits.setAll('body.gravity.y', 600);
        fruits.setAll('scale.x', .1);
        fruits.setAll('scale.y', .1);
        fruits.setAll('body.drag.x', 1000);

        // Maiali
        maiali = game.add.group();
        maiali.create(10300, 2000, 'lupo');
        maiali.create(10900, 2000, 'lupo');
        maiali.create(11500, 2000, 'lupo');

        maiali.children.forEach( function(maiale) {
            maiale.posX = maiale.x; //memorizza x iniziale
            maiale.anchor.setTo(.5,.5);
            maiale.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
            maiale.frame = 11;
            game.physics.arcade.enable(maiale);
            maiale.body.gravity.y = 1000;
            maiale.body.maxVelocity.x = 0;

            var torcia = maiale.addChild(game.make.sprite(0, 0, 'torcia'));
            torcia.anchor.setTo(1,.5);
            torcia.scale.setTo(.5,.5);
            torcia.alpha = .5;
            game.physics.arcade.enable(torcia);

            maialeA = game.add.tween(maiale).to( {x: maiale.posX-200}, 2000, 'Linear').delay(2000);
            maialeB = game.add.tween(maiale).to( {x: maiale.posX    }, 2000, 'Linear').delay(2000);
            maialeC = game.add.tween(maiale).to( {x: maiale.posX+200}, 2000, 'Linear').delay(2000);
            maialeD = game.add.tween(maiale).to( {x: maiale.posX    }, 2000, 'Linear').delay(2000);
            maialeA.onStart.add   (function() {maiale.animations.play('walk'); torcia.revive()});
            maialeB.onStart.add   (function() {maiale.scale.x *= -1; maiale.animations.play('walk')});
            maialeC.onStart.add   (function() {maiale.animations.play('walk'); torcia.revive()});
            maialeD.onStart.add   (function() {maiale.scale.x *= -1; maiale.animations.play('walk')});
            maialeA.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 11});
            maialeB.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 11; torcia.kill()});
            maialeC.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 11});
            maialeD.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 11; torcia.kill()});
            maialeA.chain(maialeB, maialeC, maialeD, maialeA);
            maialeA.start();
        });

        // Player
        player = game.add.sprite(50600, 600, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.scale.setTo(.8,.8);
        player.body.setSize(40,100,40,-3);
        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
        player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.alpha = .2;
        game.physics.arcade.enable(soffio);

        // Rain

        // Sasso
        sasso = game.add.sprite(3165*16, 45*16, 'sasso');
        sasso.anchor.setTo(.5,.5);
        game.physics.arcade.enable(sasso);
        sasso.body.gravity.y = 1000;
        sasso.body.drag.x = 100;
        sasso.body.maxVelocity.x = 100;
        sasso.scale.setTo(1.5,1.5);

        // Zattera
        zattera = game.add.sprite(1740*16, game.world.height-49.5*16, 'zattera')
        game.physics.arcade.enable(zattera);
        zattera.body.bounce.x = 0.5;
        zattera.body.drag.x = 50;
        zattera.body.maxVelocity.x = 125;
        zattera.scale.setTo(.2,.2)

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

        // Slopes
        mappa = game.add.tilemap('level1');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([player, fruits, maiali, sasso, zattera]);
        game.slopes.preferY = true;

        // Segreti
        segreto = game.add.graphics(3750*16, 50*16);
        segreto.beginFill(0x21572f, 1);
        segreto.drawRect(0, 0, 60*16, 22*16);
        segreto.endFill();

        // Fuga
        fuga = game.add.graphics(11800, 0);
        fuga.beginFill(0xffffff, .05);
        fuga.drawRect(0, 0, 5000, game.world.height);
        fuga.endFill();

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
        pauseOverlay.beginFill(0x000000, 1);
        pauseOverlay.drawRect(0, 0, 1024, 768);
        pauseOverlay.endFill();
        pauseOverlay.alpha = 0;
        pauseOverlay.fixedToCamera = true;

        pauseText = game.add.text(1024/2, 768/2, 'Paused', {font: "50px Arial", fill:'#fff'});
        pauseText.anchor.setTo(.5,.5);
        pauseText.alpha = 0;
        pauseText.fixedToCamera = true;

        pause = game.add.sprite(1024-25, 25, 'pause');
        pause.fixedToCamera = true;
        pause.anchor.setTo(1,0);
        pause.scale.setTo(.1,.1);
        pause.inputEnabled = true;
        pause.input.useHandCursor = true;
        pause.events.onInputUp.add(pauseGame);
        enter.onDown.add(pauseGame)

        function pauseGame() {
            game.paused = (game.paused) ? false : true;
            pauseOverlay.alpha = (pauseOverlay.alpha) ? 0 : .5;
            pauseText.alpha = (pauseText.alpha) ? 0 : 1;
        }
    },

    update: function() {

        // Camera
        if (player.x > fuga.left && player.x < fuga.right) {
            game.camera.unfollow();
            game.camera.x += 4;
            if (player.x <= game.camera.x) {respawn()}
        }
         else if (player.x > waterCascata.left && player.x < waterCascata.right-15*16) {
             game.camera.follow(player, .1, .1);
             game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 768/2, 200, 0);
        }
        else {
            game.camera.follow(player, .1, .1);
            game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);
        }

        // Segreti
        if (player.x > segreto.left && player.x < segreto.right && player.y > segreto.top) {segreto.alpha = 0}
        else {segreto.alpha = 1}

        // Collisions
        game.physics.arcade.collide([player, maiali, fruits], [ground, tronchi, rami]);
        zattera.body.immovable = true; sasso.body.immovable = true; game.physics.arcade.collide([sasso, zattera], player);
        zattera.body.immovable = false; sasso.body.immovable = false; game.physics.arcade.collide([sasso, zattera], ground);
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
            // Zattera
            if (zattera.body.touching.up == true) {
                if (facing == 'left') {zattera.body.velocity.x += 5}
                else if (facing == 'right') {zattera.body.velocity.x -= 5}
            }
        }
        else {
            soffio.kill();
        }

        // Respawn
        function respawn() {game.state.start('gameOver')}

        // Out of bounds
        if (player.y > game.world.height + player.height) {respawn()}

        // Vola (per test)
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {player.body.gravity.y = 0}

        // Barra Fame
        fame.width -= .025;
        if (fame.width <= 0) {respawn();} //muore
        else if (fame.width <= 50) {fame.tint = 0xff0000;} //rosso
        else if (fame.width <= 100) {fame.tint = 0xffff00;} //giallo
        else if (fame.width > 100) {fame.tint = 0xfefefe;} //bianco

        // Fruits
        function eatFruit(player, fruit) {
            fruit.kill();
            if (fame.width > 225) {fame.width = 250}
            else {fame.width += 25}
        }

        // // Maiale
        // if (game.physics.arcade.overlap(player, torcia)) {
        //    respawn();
        // }

        // Teleport
        key1.onDown.add( function() {player.position.setTo(0, 170*16)});
        key2.onDown.add( function() {player.position.setTo(450*16, 150*16)});
        key3.onDown.add( function() {player.position.setTo(1490*16, 140*16)});
        key4.onDown.add( function() {player.position.setTo(1970*16, 140*16)});
        key5.onDown.add( function() {player.position.setTo(3070*16, 115*16)});
        key6.onDown.add( function() {player.position.setTo(3370*16, 38*16)});
        key7.onDown.add( function() {player.position.setTo(3600*16, 38*16)});

        // Tronchi
        tronchi.children.forEach( function(tronco) {
            tronco.anchor.setTo(.5, 0);
            tronco.scale.setTo(100, 20);
            tronco.body.immovable = true;
            tronco.body.acceleration.y = 50;
            tronco.body.maxVelocity.y = 180;
            tronco.alpha = 0;
            if (tronco.y >= 43*16) {tronco.alpha = 1}
            if (tronco.y > game.world.height) {tronco.destroy()}
        })

        // Rami
        rami.children.forEach( function(ramo) {
            if (ramo.body.touching.up) {
                game.time.events.add(Phaser.Timer.SECOND*0.2, cadeRamo, this);

                function cadeRamo() {
                    if (ramo.body.touching.up) {ramo.body.gravity.y = 800}
                }
            }
            if (ramo.y > game.world.height + 3000) {
                ramo.body.gravity.y = 0;
                ramo.body.velocity.y = 0;
                ramo.body.y = ramo.posY;
            }
        })

        // Stalattiti
        stalattiti.children.forEach( function(stalattite) {
            if (player.x > stalattite.left-100 && player.x < stalattite.right+100) {stalattite.body.gravity.y = 900};
            if (game.physics.arcade.overlap(player, stalattiti)) {respawn()};
            if (stalattite.top > game.world.height) {stalattite.kill()};
        })

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
    }
}
