var intro = {

    create: function() {
        // Sound
        game.sound.stopAll();
        music = game.add.audio('fortezzaMusic').loopFull();
        maialiSFX = game.add.audio('maialiSFX', .4).loopFull();
        game.time.events.add(3000, function() {maialiSFX2 = game.add.audio('maialiSFX', .4).loopFull()});

        // Controllli
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
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

        game.input.keyboard.start();
        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.world.setBounds(0, 0, 1024, 768);
        game.add.sprite(0, 0, 'intro');

        // Lupi
        mamma = game.add.sprite(-50, 700, 'mamma');
        mamma.anchor.setTo(.5,1);
        mamma.animations.add('walk', null, 20, true);
        player = game.add.sprite(-50, 700, 'lupo');
        player.anchor.setTo(.5,1);
        player.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10,11], 20, true);
        player.animations.add('right', [12,13,14,15,16,17,18,19,20,21,22,23], 20, true);

        // Text
        text1 = mamma.addChild(game.add.text (  0,-180, "Piccoli, dobbiamo andare,\nnon c'è più tempo.", styleC));
        text2 = player.addChild(game.add.text(120, -80, "Mamma,\nma io ho paura.", styleL));
        text3 = mamma.addChild(game.add.text (  0,-180, "Devi essere coraggioso.\nVeloci, entrate nella grotta.", styleC));
        text4 = player.addChild(game.add.text(  0,-180, "\nTu non vieni?", styleC));
        text5 = player.addChild(game.add.text(120, -80, "Mamma, perché\nnon vieni?!", styleL));
        text6 = mamma.addChild(game.add.text (  0,-180, "Non vi preoccupate,\nvi raggiungerò subito.", styleC));
        mamma.children.forEach(function(text) {text.alpha=0; text.anchor.x=.5; text.lineSpacing=interlinea})
        player.children.forEach(function(text) {text.alpha=0; text.anchor.x=.5; text.lineSpacing=interlinea})

        // Tween
        mammaA = game.add.tween(mamma).to( {x: 450}, 2000).delay(1000).start();
        playerA = game.add.tween(player).to( {x: 550}, 2000).delay(1000).start();
        mammaA.onStart.add(function() {mamma.animations.play('walk')});
        playerA.onStart.add(function() {player.animations.play('right')});
        mammaA.onComplete.add(function() {mamma.animations.stop(); mamma.frame = 0});
        playerA.onComplete.add(function() {player.animations.stop(); player.frame = 11});

        textA = game.add.tween(text1).to( {alpha: 1}, 250).yoyo(true, 3000).delay(1000);
        textB = game.add.tween(text2).to( {alpha: 1}, 250).yoyo(true, 2000);
        textC = game.add.tween(text3).to( {alpha: 1}, 250).yoyo(true, 3000);
        textD = game.add.tween(text4).to( {alpha: 1}, 250).yoyo(true, 2000);
        textE = game.add.tween(text5).to( {alpha: 1}, 250).yoyo(true, 2000);
        textF = game.add.tween(text6).to( {alpha: 1}, 250).yoyo(true, 3000);

        playerB = game.add.tween(player).to( {x: 1100}, 2000);
        playerB.onStart.add(function() {player.animations.play('right')});
        playerB.onComplete.add(changeState);

        playerA.chain(textA, textB, textC, textD, textE, textF, playerB);

        function changeState() {
            maialiSFX.fadeTo(500, 0); maialiSFX2.fadeTo(500, 0); music.fadeTo(500, 0);
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('level1A')} );
        }
    },
}
