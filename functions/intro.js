var intro = {

    create: function() {
        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#222";
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.plugins.add(Phaser.Plugin.ArcadeSlopes);
        game.world.setBounds(0, 0, 1024, 768);

        // Background
        bg = game.add.sprite(0, 0, 'intro');

        // Mamma
        mamma = game.add.sprite(0, 30*16, 'lupo');
        game.physics.arcade.enable(mamma);
        mamma.anchor.setTo(.5,.5);
        mamma.scale.setTo(1,1);
        mamma.body.setSize(40,100,40,-3);
        mamma.animations.add('walk', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);
        mamma.body.gravity.y = 2000;

        // Lupo
        lupo = game.add.sprite(0, 30*16, 'lupo');
        game.physics.arcade.enable(lupo);
        lupo.anchor.setTo(.5,.5);
        lupo.scale.setTo(1,1);
        lupo.body.setSize(40,100,40,-3);
        lupo.animations.add('walk', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);
        lupo.body.gravity.y = 2000;

        // Tana
        tana = game.add.sprite(-230, -25, 'tana');
        tana.scale.setTo(.9,.9);

        // Slopes
        mappa = game.add.tilemap('intro');
        mappa.addTilesetImage('slopes-green', 'slopes-green');
        mappa.setCollisionBetween(1, 38);
        ground = mappa.createLayer('ground');
        game.slopes.convertTilemapLayer(ground, 'arcadeslopes');
        game.slopes.enable([lupo, mamma]);
        game.slopes.preferY = true;

        tana.alpha = 0;
        ground.alpha = 0;

        // Text
        style = {font:'20px Arial', fill:'#fff'};
        text1 = mamma.addChild(game.add.text(0, -120, 'Lorem ipsum\nsit dolor amet.', style));
        text2 = lupo.addChild (game.add.text(0, -120, 'Che fai, mamma?!\nParli in latino?', style));
        text3 = mamma.addChild(game.add.text(0, -120, 'Scusatemi, è tutta colpa\ndel programmatore.', style));
        text4 = lupo.addChild (game.add.text(0, -120, '\nAddio!', style));
        text1.anchor.x=.5; text2.anchor.x=.5; text3.anchor.x=.5; text4.anchor.x=.5;
        text1.alpha=0; text2.alpha=0; text3.alpha=0; text4.alpha=0;

        // Tween
        textA = game.add.tween(text1).to( {alpha: 1}, 250).delay(1000);
        textB = game.add.tween(text2).to( {alpha: 1}, 250).delay(3000);
        textC = game.add.tween(text3).to( {alpha: 1}, 250).delay(3000);
        textD = game.add.tween(text4).to( {alpha: 1}, 250).delay(3000);
        textB.onStart.add(function() {text1.alpha = 0});
        textC.onStart.add(function() {text2.alpha = 0});
        textD.onStart.add(function() {text3.alpha = 0});

        mammaA = game.add.tween(mamma).to( {x: 450}, 2000, 'Linear').delay(2000);
        mammaA.onStart.add   (function() {mamma.animations.play('walk')});
        mammaA.onComplete.add(function() {mamma.animations.stop(); mamma.frame = 12});
        mammaA.start();

        lupoA = game.add.tween(lupo).to( {x: 550 }, 2000, 'Linear').delay(2000);
        lupoB = game.add.tween(lupo).to( {x: 1024}, 2500, 'Linear').delay(2000);
        lupoA.onStart.add   (function() {lupo.animations.play('walk')});
        lupoB.onStart.add   (function() {lupo.animations.play('walk'); text4.alpha = 0;});
        lupoA.onComplete.add(function() {lupo.animations.stop(); lupo.frame = 11});
        lupoB.onComplete.add(changeState);
        lupoA.chain(textA, textB, textC, textD, lupoB);
        lupoA.start();

        function changeState() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('level1A')} );
        }
    },

    update: function() {
        game.physics.arcade.collide([lupo, mamma], [ground]);
    },
}
