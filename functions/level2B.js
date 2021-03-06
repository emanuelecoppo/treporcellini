var level2B = {

    create: function() {
        currentLevel = 'level2B';
        playerX = 5*32;
        playerY = 0;
        crollo = 0;
        soffioTrigger = 0;
        game.input.keyboard.stop();

        // Sound
        game.sound.stopAll();
        music = game.add.audio('bossMusic', 0).loopFull(); music.fadeTo(2000, 1);
        explosionSFX = game.add.audio('explosionSFX', .2); explosionSFX.allowMultiple = true; sfxTrigger = 0;
        morso = game.add.audio('morso', .2); morso.allowMultiple = true;
        morteSFX = game.add.audio('morte');
        passi = game.add.audio('passi');
        soffioSFX = game.add.audio('soffioSFX', 0).loopFull();
        game.time.events.add(2000, function(){maialiSFX = game.add.audio('maialiSFX', .6).loopFull()});

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.physics.startSystem(Phaser.Physics.ARCADE);

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
        player.frame = 12;

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 32, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.animations.add('soffia', [0,1,2,3,4,5,6], 20, true);
        game.physics.arcade.enable(soffio);
        soffio.body.setSize(110,90,50,15)

        // Weapon
        arma = game.add.weapon(4, 'bomb');
        arma.trackSprite(boss, -boss.width, 117-boss.height, true);
        arma.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        arma.bulletLifespan = 4000;
        arma.bulletCollideWorldBounds = true;
        arma.autofire = false;
        arma.fireRateVariance = 500;
        arma.bulletSpeed = -400;
        arma.bulletSpeedVariance = 150;
        arma.fireAngle = 45;
        arma.bulletAngleVariance = 30;
        arma.bulletGravity.y = 500;

        arma.bullets.forEach( function(bomb) {
            bomb.anchor.setTo(.5);
            bomb.body.drag.x = 150;
            bomb.body.bounce.x = .5;
        })

        // Tilemap
        mappa = game.add.tilemap('level2B');
        mappa.addTilesetImage('castle', 'castle');
        mappa.setCollisionBetween(1, 6);
        ground = mappa.createLayer('ground');
        ground.alpha = 0;
        game.add.sprite(0,0,'level2B');

        // Explosions
        explosions = game.add.group();

        // Dialogo
        if (dialogoBoss==0) {
            text1 = boss.addChild(  game.add.text(-40,-530, "Oh oh... Ma guarda chi si vede.\nAvete perso la mammina?", styleC));
            text2 = player.addChild(game.add.text(-90, -40, "Chi è?\nNon vedo!", styleR));
            text3 = player.addChild(game.add.text(  0,-120, "È un grosso guaio!\nAnzi, grasso.", styleC));
            text4 = boss.addChild(  game.add.text(-40,-530, "COME OSI??!!\nMORITE SPORCHI LUPI!", styleC));
            text1.alpha=0; text1.anchor.x= 1; text1.lineSpacing=interlinea;
            text2.alpha=0; text2.anchor.x=.5; text2.lineSpacing=interlinea;
            text3.alpha=0; text3.anchor.x=.5; text3.lineSpacing=interlinea;
            text4.alpha=0; text4.anchor.x= 1; text4.lineSpacing=interlinea;
            textA = game.add.tween(text1).to( {alpha: 1}, 250).yoyo(true, 3000).delay(2000).start();
            textB = game.add.tween(text2).to( {alpha: 1}, 250).yoyo(true, 2000);
            textC = game.add.tween(text3).to( {alpha: 1}, 250).yoyo(true, 3000);
            textD = game.add.tween(text4).to( {alpha: 1}, 250).yoyo(true, 3000);
            textD.onComplete.add(function() {game.input.keyboard.start(); arma.autofire=true; dialogoBoss++});
            textA.chain(textB, textC, textD);
        }
        else {
            game.input.keyboard.start();
            game.time.events.add(2000, function() {arma.autofire=true});
        }

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
            music.fadeOut(500);; maialiSFX.stop()
            game.paused = false;
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },

    update: function() {
        // States
        function gameOver() {
            morteSFX.play('', 0, .5, false, false);
            music.fadeOut(1100);; maialiSFX.stop()
            game.physics.arcade.isPaused = true;
            game.input.keyboard.stop();
            cursors.right.isDown = false;
            cursors.left.isDown = false;
            player.animations.stop();
            game.time.events.add(1000, function() {
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
        if(!dialogoBoss==0) {fame.width -= .05}
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
                morso.play();
                fruit.kill();
                if (fame.width > 200) {fame.width = 250}
                else {fame.width += 50}
            }
        }

        // Weapon
        game.physics.arcade.overlap(soffio, arma.bullets, soffiaBomb, null, this)
        function soffiaBomb(soffio, bomb) {
            if (facing=='left') {bomb.body.velocity.x -= 5}
            else if (facing=='right') {bomb.body.velocity.x += 5}
        }

        // Explosion
        arma.onKill.addOnce(function(bomb) {
            game.camera.shake(.005, 500, true, Phaser.Camera.SHAKE_HORIZONTAL);
            getExplosion(bomb.x, bomb.y)
        })
        function getExplosion(x, y) {
            sfxTrigger = 1;
            explosion = game.add.sprite(x, y, 'explosion');
            explosion.anchor.setTo(.5);
            game.physics.arcade.enable(explosion);
            explosion.body.setSize(110,110,50,20)
            explosion.animations.add('explode', [0,1,2,3,4,5,6,7,8,9]);
            explosions.add(explosion);
            explosions.forEachDead(function(killed) {killed.destroy()});
            explosion.animations.play('explode', 10, false, true);
        }
        function crolloExplosions() {
            explosion = explosions.create(1024*Math.random(), 768*Math.random(), 'explosion');
            explosion.animations.add('explode', [0,1,2,3,4,5,6,7,8,9]);
            explosion.animations.play('explode', 10, false, true);
        }
        if (sfxTrigger==1) { explosionSFX.play(); sfxTrigger=0}
        if (boss.vite>0) {game.physics.arcade.overlap(player, explosions, gameOver, null, this)}

        // Boss
        if (boss.vite==3) {arma.fireRate = 3000}
        else if (boss.vite==2) {arma.fireRate = 2000}
        else if (boss.vite==1) {arma.fireRate = 1000}
        else if (boss.vite<=0 && crollo==0) {
            game.time.events.loop(1000, function() {explosionSFX.play()})
            game.time.events.loop(1300, function() {explosionSFX.play()})
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
            game.time.events.add(4000, function() {game.camera.fade(0xffffff, 2000); music.fadeOut(2000); maialiSFX.stop()}, this);
            game.camera.onFadeComplete.add(function(){game.state.start('finaleState')});
            game.camera.shake(0, 10000, true, Phaser.Camera.SHAKE_HORIZONTAL);
            game.add.tween(game.camera).to({shakeIntensity:0.02}, 500).yoyo(true, 250).loop(true).start();
            game.time.events.loop(500, crolloExplosions, this);
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
        // game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(boss);
        //game.debug.text('Vite Boss = ' + boss.vite, 10, 90);
        // explosions.children.forEach(function(exp) {game.debug.body(exp, 'rgba(0,255,0,0.1)');})
    }
}
