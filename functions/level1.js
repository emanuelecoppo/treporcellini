var level1 = {

    create: function() {

        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);

        // Controls
        cursors = game.input.keyboard.createCursorKeys();
        spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        s = game.input.keyboard.addKey(Phaser.Keyboard.S);

        // World
        game.world.setBounds(0, 0, 4200*16, 200*16);

        // Parallax
        parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax0');
        parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax1');
        parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax2');
        parallax0.fixedToCamera = true;
        parallax1.fixedToCamera = true;
        parallax2.fixedToCamera = true;

        // Cascata
        // Alberi
        // Rami

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        for (var i = 0; i < 15; i++) { fruit = fruits.create(i*550, 0, 'fruit'); }
        fruits.setAll('body.gravity.y', 600);
        fruits.setAll('scale.x', .1);
        fruits.setAll('scale.y', .1);
        fruits.setAll('body.drag.x', 1000);

        // Maiale
        maiali = game.add.group();
        maiali.create(10300, 2000, 'lupo');
        maiali.create(10900, 2000, 'lupo');
        maiali.create(11500, 2000, 'lupo');

        maiali.children.forEach( function(maiale) {

            maiale.posX = maiale.x; //memorizza posizione X iniziale
            maiale.anchor.setTo(.5,.5);
            maiale.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
            maiale.frame = 11;
            game.physics.arcade.enable(maiale);
            maiale.body.gravity.y = 1000;
            maiale.body.maxVelocity.x = 0;
        });


            maiali.children.forEach( function(maiale) {
                torcia = maiale.addChild(game.make.sprite(0, 0, 'torcia'));
                torcia.anchor.setTo(1,.5);
                torcia.scale.setTo(.5,.5);
                torcia.alpha = .5;
                game.physics.arcade.enable(torcia);

            });

            maiali.children.forEach( function(maiale) {

            maialeA = game.add.tween(maiale).to( {x: maiale.posX-200}, 2000, 'Linear').delay(2000);
            maialeB = game.add.tween(maiale).to( {x: maiale.posX    }, 2000, 'Linear').delay(2000);
            maialeC = game.add.tween(maiale).to( {x: maiale.posX+200}, 2000, 'Linear').delay(2000);
            maialeD = game.add.tween(maiale).to( {x: maiale.posX    }, 2000, 'Linear').delay(2000);
            maialeA.onStart.add   (function(){ maiale.animations.play('walk'); torcia.revive() });
            maialeB.onStart.add   (function(){ maiale.scale.x *= -1; maiale.animations.play('walk') });
            maialeC.onStart.add   (function(){ maiale.animations.play('walk'); torcia.revive() });
            maialeD.onStart.add   (function(){ maiale.scale.x *= -1; maiale.animations.play('walk') });
            maialeA.onComplete.add(function(){ maiale.animations.stop(); maiale.frame = 11 });
            maialeB.onComplete.add(function(){ maiale.animations.stop(); maiale.frame = 11; torcia.kill() });
            maialeC.onComplete.add(function(){ maiale.animations.stop(); maiale.frame = 11 });
            maialeD.onComplete.add(function(){ maiale.animations.stop(); maiale.frame = 11; torcia.kill() });
            maialeA.chain(maialeB, maialeC, maialeD, maialeA);
            maialeA.start();

        });

        // Player
        player = game.add.sprite(10670, 2000, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.scale.setTo(.8,.8);
        player.body.setSize(40,100,40,-3);
        player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
        player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);

        /* -- FLIES -- */

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.alpha = .2;
        game.physics.arcade.enable(soffio);

        // Rocks
        // Tronchi
        // Rain
        // Sasso
        // Zattera
        // Mud

        // Water
        water = game.add.group();
        water.enableBody = true;
        water.alpha = 0.4;
        waterGrotta = water.create(1130, game.world.height-25, 'water');
        waterGrotta.scale.setTo(4070, 25);
        waterPonte = water.create(17400, game.world.height-600, 'water');
        waterPonte.scale.setTo(910, 600);
        water.setAll('body.immovable', true);

        // Arcade Slopes
        mappa = game.add.tilemap('level1');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');

        game.slopes.enable([player, fruits, maiali]);
        game.slopes.preferY = true;

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

        // Fuga
        fuga = game.add.graphics(11800, 0);
        fuga.beginFill(0xffffff, .05);
        fuga.drawRect(0, 0, 3000, game.world.height);
        fuga.endFill();
        game.physics.arcade.enable(fuga);

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

    },

    update: function() {

        if (game.physics.arcade.overlap(player, fuga)) {
            game.camera.unfollow();
            game.camera.x += 4;
            if (player.x <= game.camera.x) {respawn()}
        }
        else {
            game.camera.follow(player, .1, .1);
        }

        // Collisions
        game.physics.arcade.collide([player, maiali], [ground]);
        game.physics.arcade.collide(fruits, [ground]);

        // Parallax
        parallax0.tilePosition.x = 0;
        parallax1.tilePosition.x = -0.5 * game.camera.x;
        parallax2.tilePosition.x = -0.9 * game.camera.x;

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
            if (facing == 'left') {
                player.frame = 11;
            }
            else if (facing == 'right') {
                player.frame = 12;
            }
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
                if (facing == 'left') {
                    sasso.body.velocity.x -= 5;
                }
                else if (facing == 'right') {
                    sasso.body.velocity.x += 5;
                }
            }
            // Zattera
            if (zattera.body.touching.up == true) {
                if (facing == 'left') {
                    zattera.body.velocity.x += 5;
                }
                else if (facing == 'right') {
                    zattera.body.velocity.x -= 5;
                }
            }
        }
        else {
            soffio.kill();
        }

        // Respawn
        function respawn() {
            game.state.start('gameOver');
        }

        // Out of bounds
        if (player.y > game.world.height + player.height) {
            respawn();
        }

        // Vola (per test)
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {
            player.body.gravity.y = 0;
        }

        // Barra Fame
        fame.width -= .025;
        if (fame.width <= 0) {respawn();} //muore
        else if (fame.width <= 50) {fame.tint = 0xff0000;} //rosso
        else if (fame.width <= 100) {fame.tint = 0xffff00;} //giallo
        else if (fame.width > 100) {fame.tint = 0xfefefe;} //bianco

        // Fruits
        function eatFruit(player, fruit) {
            fruit.kill();
            if (fame.width > 225) { //evita scatto della barra fuori dal bordo
                fame.width = 250;
            }
            else {
                fame.width += 25;
            }
        }
        game.physics.arcade.overlap(player, fruits, eatFruit, null, this)

        // // Maiale
        // if (game.physics.arcade.overlap(player, torcia)) {
        //    respawn();
        // }

    },

    render: function() {
        // game.context.fillStyle = 'rgba(255,0,0,0.05)';
        // game.context.fillRect(game.camera.deadzone.x, game.camera.deadzone.y, game.camera.deadzone.width, game.camera.deadzone.height);
        game.debug.spriteCoords(player, 10, 762);
    }
}
