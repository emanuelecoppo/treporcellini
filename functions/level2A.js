var level2A = {

    create: function() {
        game.input.keyboard.start();
        currentLevel = 'level2A';
        if (check2A==true) {playerX = 88*32; playerY = 18*32;}
        else {playerX = 22*32; playerY = 68*32;}
        lavaTrigger = 0;

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#333";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /// World
        game.world.setBounds(0, 0, 153*32, 77*32);
        fort=game.add.sprite(0,game.world.height,'fortezza-bg').anchor.setTo(0,1);

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

        // Checkpoint
        check = game.add.sprite(88*32, 20*32, 'checkpoint');
        check.anchor.setTo(.5,1);
        check.scale.setTo(.7);
        game.physics.arcade.enable(check);
        if (check2A==true) {check.frame=1}
        else {check.frame=0}

        // Tilemap
        mappa = game.add.tilemap('level2A');
        mappa.addTilesetImage('castle', 'castle');
        mappa.setCollisionBetween(1, 6);
        ground = mappa.createLayer('ground');

        // Nastro
        nastri = game.add.group();
        nastri.enableBody = true;
        nastro1 = nastri.create(102*32, 58*32, 'nastro');
        nastro1.scale.x = -1;
        nastro2 = nastri.create(112*32, 58*32, 'nastro');
        nastro3 = nastri.create(122*32, 58*32, 'nastro');

        nastri.children.forEach( function(nastro) {
            nastro.animations.add('trasporta', null, 20, true);
            nastro.animations.play('trasporta');
            nastro.body.drag.x = 1000;
            nastro.body.immovable = true;
            nastro.body.moves = false;
        })

        // Player
        player = game.add.sprite(playerX, playerY, 'lupo');
        game.physics.arcade.enable(player);
        player.anchor.setTo(.5,.5);
        player.scale.setTo(.9,.9);
        player.body.setSize(pW,pH,pX,pY);
        player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
        player.animations.add('right', [12,13,14,15,16,17,18,19,20,21,22,23], 20, true);

        // Soffio
        soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
        soffio.anchor.setTo(0,1);
        soffio.alpha = .2;
        game.physics.arcade.enable(soffio);

        // Colonne
        colonne = game.add.group();
        colonne.enableBody = true;
        colonne.add(game.add.graphics(105*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());
        colonne.add(game.add.graphics(115*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());
        colonne.add(game.add.graphics(125*32, 10*32).beginFill(0x444444).drawRect(0, 0, 80, 10*32).endFill());

        // Maiali
        maiali = game.add.group();
        maiali.enableBody = true;
        maiali.create(135*32, 18.5*32, 'lupo');
        maiali.create(120*32, 18.5*32, 'lupo');
        maiali.create(105*32, 18.5*32, 'lupo');

        maiali.children.forEach( function(maiale) {
            maiale.anchor.setTo(.5,.5);
            maiale.animations.add('walk', [12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
            maiale.frame = 12;
            maiale.body.setSize(250,100,50,0);

            var torcia = maiale.addChild(game.make.sprite(15, 0, 'torcia'));
            torcia.anchor.y = .5;
            torcia.scale.setTo(.5,.5);
            torcia.alpha = .5;

            maialeA = game.add.tween(maiale).to( {x: maiale.x-20*32}, 5000).delay(1000+2000*Math.random()).start();
            maialeB = game.add.tween(maiale).to( {x: maiale.x      }, 5000).delay(1000+2000*Math.random());
            maialeA.onStart.add   (function() {maiale.scale.x=-1; maiale.animations.play('walk')});
            maialeB.onStart.add   (function() {maiale.scale.x= 1; maiale.animations.play('walk')});
            maialeA.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 12});
            maialeB.onComplete.add(function() {maiale.animations.stop(); maiale.frame = 12});
            maialeA.chain(maialeB, maialeA);
        })

        // Fruits
        fruits = game.add.group()
        fruits.enableBody = true;
        fruits.create( 12*32,  67*32, 'fruit'); //cella
        fruits.create( 13*32,  67*32, 'fruit'); //cella
        fruits.create( 80*32,  47*32, 'fruit'); //lava
        fruits.create( 63*32,  13*32, 'fruit'); //lava

        fruits.children.forEach( function(fruit) {
            fruit.scale.setTo(.1,.1);
            fruit.body.drag.x = 1000;
            fruit.body.gravity.y = 600;
            if (fruit.cespuglio==true) {fruit.body.gravity.y = 0}
        })

        // Lanciafiamme
        maialiF = game.add.group();
        maialiF.create(125*32, 40*32, 'lupo');
        maialiF.create(115*32, 40*32, 'lupo');
        maialiF.create(105*32, 40*32, 'lupo');

        maialiF.children.forEach( function(maialeF) {
            maialeF.anchor.setTo(.5,0);
            maialeF.frame = 12;

            fiamma = maialeF.addChild(game.make.sprite(0, 0, 'flame'));
            fiamma.anchor.setTo(.5, 1);
            //fiamma.scale.setTo(.5);
            //game.time.events.loop(2000, function(){fiamma.scale.y = (fiamma.scale.y) ? 0 : 1}, this);
            fiammaA = game.add.tween(fiamma.scale).to( {y:0, x:0}, 100, sin).delay(1000+1000*Math.random()).start().yoyo(true, 3000+1000*Math.random());
            fiammaA.chain(fiammaA);
        })

        // Sassi
        sassi = game.add.group();
        sassi.enableBody = true;
        sassi.create(18*32, 68*32, 'brown').scale.setTo(100,70);

        sassi.children.forEach( function(sasso) {
            sasso.anchor.setTo(.5,.5);
            sasso.body.gravity.y = 1000;
            sasso.body.drag.x = 200;
            sasso.body.maxVelocity.x = 100;
        })

        // Lava
        lava = game.add.graphics(60*32, 64*32);
        lava.beginFill(0x990000, 1);
        lava.drawRect(0, 0, 22*32, 70*32);
        lava.endFill();
        game.physics.arcade.enable(lava);
        lavaAlza = game.add.tween(lava).to( {y: 21*32}, 15000, sin);

        // Segreti
        segreto = game.add.graphics(454*16, 61*16);
        segreto.beginFill(0x21572f, 1);
        segreto.drawRect(0, 0, 33*16, 15*16);
        segreto.endFill();

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
        function nextState() {game.camera.fade('#000',500); game.camera.onFadeComplete.add(function(){game.state.start('level2B')});}
        if (player.x<130*32 && player.y>game.world.height) {gameOver()};
        if (player.x>130*32 && player.y>game.world.height) {nextState()}

        // Camera
        game.camera.follow(player, .1, .1);
        game.camera.deadzone = new Phaser.Rectangle((1024-200)/2, 200+(768-450)/2, 200, 250);

        // Collisions
        game.physics.arcade.collide([player, fruits], [ground, nastri]);
        sassi.setAll('body.immovable', true); game.physics.arcade.collide(sassi, player);
        sassi.setAll('body.immovable', false); game.physics.arcade.collide(sassi, ground);

        // Checkpoints
        game.physics.arcade.overlap(player, check, checkpoint, null, this);
        function checkpoint() {check.frame=1; check2A=true}

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

        // Jump
        spacebar.onDown.add(jumpFunction);
        function jumpFunction() {
            if (player.body.touching.down || player.body.blocked.down) {
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

        // Sasso
        game.physics.arcade.overlap(soffio, sassi, soffiaSasso, null, this);
        function soffiaSasso(soffio, sasso) {
            if (facing=='left') {sasso.body.velocity.x -= 5}
            else if (facing=='right') {sasso.body.velocity.x += 5}
        }

        // Segreto
        if (player.x > segreto.left && player.y > segreto.top) {segreto.alpha = 0}
        else {segreto.alpha = 1}

        // Lava
        game.physics.arcade.overlap(player, lava, gameOver, null, this);
        if (player.x > 65*32 && lavaTrigger==0) {lavaAlza.start(); lavaTrigger++}

        // Nastro
        nastri.children.forEach(function(nastro) {
            if (nastro1.body.touching.up) {player.body.gravity.x = 5000}
            else if (nastro2.body.touching.up || nastro3.body.touching.up) {player.body.gravity.x = -5000}
            else {player.body.gravity.x = 0}
        })

        // Vola
        if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {player.body.gravity.y = 0};

    },

    render: function() {
        game.debug.spriteCoords(player, 10, 762);
        //game.debug.body(maiale1);
    }
}
