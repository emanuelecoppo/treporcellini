var level2B = {

    create: function() {
        currentLevel = 'level2B';
        playerX = 5*32;
        playerY = 0;
        crollo = 0;

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
        game.world.setBounds(0, 0, 1024, 768);
        boundL = game.add.graphics(0, 0).drawRect(0, 0, 1, game.world.height);
        boundR = game.add.graphics(game.world.width+50, 0).drawRect(0, 0, 1, game.world.height);
        game.physics.arcade.enable([boundL, boundR]);
        boundL.body.immovable = true;
        boundR.body.immovable = true;
        game.add.sprite(0,0,'boss-bg');

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
        boss = game.add.sprite(1024, 21*32, 'boss');
        boss.animations.add('boss', [0,1,2,3,2,1], 20, true);
        boss.animations.play('boss')
        boss.anchor.setTo(1);
        game.physics.arcade.enable(boss);
        boss.body.setSize(240, boss.height, boss.width-240, 0)
        boss.body.immovable = true;
        boss.vite = 3;
        timeDelay = 0;

        bossRed = boss.addChild(game.make.sprite(0,0,'boss'));
        bossRed.anchor.setTo(1);
        bossRed.tint = 0xff0000;
        bossRed.alpha = 0;

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        game.time.events.loop(15000, function() {fruits.create(5*32, -10,'fruit')}, this);

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

        // Weapon
        arma = game.add.weapon(4, 'bomb');
        arma.trackSprite(boss, -boss.width, 117-boss.height, true);
        arma.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        arma.bulletLifespan = 4000;
        arma.bulletCollideWorldBounds = true;
        arma.autofire = false;
        game.time.events.add(3000, function() {arma.autofire=true} );
        arma.fireRateVariance = 500;
        arma.bulletSpeed = -400;
        arma.bulletSpeedVariance = 150;
        arma.fireAngle = 45;
        arma.bulletAngleVariance = 30;
        arma.bulletGravity.y = 500;

        arma.bullets.forEach( function(bomb) {
            bomb.anchor.setTo(.5);
            bomb.scale.setTo(.05);
            bomb.body.drag.x = 150;
            bomb.body.bounce.x = .5;
        })

        // Tilemap
        mappa = game.add.tilemap('level2B');
        mappa.addTilesetImage('castle', 'castle');
        mappa.setCollisionBetween(1, 6);
        ground = mappa.createLayer('ground');
        //ground.alpha=.1;

        // Explosions
        explosions = game.add.group();

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
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            game.time.events.add(500, function() {
                game.camera.fade(0x000000,100); game.camera.onFadeComplete.add(function(){game.state.start('gameOver')});
            })
        }

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
        game.physics.arcade.collide(player, [boundL, boundR, boss]);
        game.physics.arcade.collide([player, fruits, arma.bullets], [ground]);

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
        else if (crollo==0) {
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
        if (soffia.isDown) {
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
        fruits.children.forEach( function(fruit) {
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
            game.time.events.add(10000, function() {fruit.kill()}, this);
        })
        game.physics.arcade.overlap(player, fruits, eatFruit, null, this);
        function eatFruit(player, fruit) {
            if (!fruit.body.gravity.y==0) {
                fruit.kill();
                if (fame.width > 225) {fame.width = 250}
                else {fame.width += 25}
            }
        }

        // Weapon
        // game.physics.arcade.overlap(player, arma.bullets, hitBomb, null, this)
        // function hitBomb(player, bomb) {
        //     if (bomb.body.velocity.y>0) {gameOver()}
        // }
        game.physics.arcade.overlap(soffio, arma.bullets, soffiaBomb, null, this)
        function soffiaBomb(soffio, bomb) {
            if (facing=='left') {bomb.body.velocity.x -= 7}
            else if (facing=='right') {bomb.body.velocity.x += 7}
        }

        // Explosion
        arma.onKill.addOnce(function(bomb) {
            game.camera.shake(.005, 500, true, Phaser.Camera.SHAKE_HORIZONTAL);
            getExplosion(bomb.x, bomb.y)
        })
        function getExplosion(x, y) {
            explosion = game.add.sprite(x, y, 'explosion');
            explosion.anchor.setTo(.5);
            explosion.scale.setTo(2);
            game.physics.arcade.enable(explosion);
            explosion.animations.add('explode');
            explosions.add(explosion);
            explosions.forEachDead(function(killed) {killed.destroy()});
            explosion.animations.play('explode', 20, false, true);
        }
        if (boss.vite>0) {game.physics.arcade.overlap(player, explosions, gameOver, null, this)}

        // Boss
        if (boss.vite==3) {arma.fireRate = 3000}
        else if (boss.vite==2) {arma.fireRate = 2000}
        else if (boss.vite==1) {arma.fireRate = 1000}
        else if (boss.vite<=0 && crollo==0) {
            crollo ++;
            arma.autofire = false;
            arma.killAll();
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            soffia.isDown = false;
            player.body.velocity.x = 0;
            player.animations.stop();
            player.frame = 12;
            playerA = game.add.tween(player).to({x:1054}, 2000).delay(2000).start();
            playerA.onStart.add(function(){player.animations.play('right')});
            game.time.events.add(4000, function() {game.camera.fade(0xffffff, 2000)}, this);
            game.camera.onFadeComplete.add(function(){game.state.start('finaleState')});
            game.camera.shake(0, 10000, true, Phaser.Camera.SHAKE_HORIZONTAL);
            game.add.tween(game.camera).to({shakeIntensity:0.02}, 500).yoyo(true, 250).loop(true).start();

            // rainParticle = game.add.bitmapData();
            // rainParticle.ctx.rect(0, 0, 3, 3);
            // rainParticle.ctx.fillStyle = '#82826c';
            // rainParticle.ctx.fill();
            // rain = game.add.emitter(1024*Math.random(), 0, 10);
            // rain.width = 200;
            // rain.makeParticles(rainParticle);
            // rain.setYSpeed(500, 700);
            // rain.setXSpeed(-5, 5);
            // rain.setRotation(-45, 45);
            // rain.minParticleScale = 1;
            // rain.maxParticleScale = 2;
            // rain.start(true, 0, null, 10);

            game.time.events.loop(500, crolloExplosions, this);
        }

        function crolloExplosions() {
            explosion = explosions.create(1024*Math.random(), 768*Math.random(), 'explosion');
            explosion.scale.setTo(2);
            explosion.animations.add('explode');
            explosion.animations.play('explode', 20, false, true);
            explosion.animations.killOnComplete = true;
        }

        game.physics.arcade.overlap(boss, explosions, hitBoss, null, this);
        function hitBoss() {
            if (game.time.now > timeDelay) {
                game.add.tween(bossRed).to({alpha:1}, 250).start().yoyo(true).repeat(2);
                boss.vite --;
                timeDelay = game.time.now + 2000;
            }
        }

        // Vola
        if (vola.isDown) {player.body.gravity.y = 0};
    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(boss);
        game.debug.text('Vite Boss = ' + boss.vite, 10, 90);
    }
}
