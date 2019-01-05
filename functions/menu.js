var menuState = {

    create: function() {
        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#555";
        game.world.setBounds(0, 0, 1024, 768);
        currentFame = 250;

        game.add.sprite(0, 0, 'menu');

        game.add.text(game.world.centerX, 110, 'I TRE PORCELLINI', {font: "60px Arial", fill:'#fff'}).anchor.setTo(.5,.5);
        game.add.text(game.world.centerX, 170, '10 anni dopo', {font: "60px Arial", fill:'#fff'}).anchor.setTo(.5,.5);

        comincia = game.add.text(game.world.centerX, game.world.height-80, 'Premi Enter per cominciare', {font: "30px Arial", fill:'#fff'});
        comincia.anchor.setTo(.5,.5);
        comincia.inputEnabled = true;
        comincia.input.useHandCursor = true;

        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
    },

    update: function() {
        enter.onDown.add(changeState);
        comincia.events.onInputUp.add(changeState);

        function changeState() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('intro')} );
        }

        key1.onDown.add(function(){game.state.start('level1A')});
        key2.onDown.add(function(){game.state.start('level1B')});
        key3.onDown.add(function(){game.state.start('level1C')});
        key4.onDown.add(function(){game.state.start('level1D')});
        key5.onDown.add(function(){game.state.start('level1E')});
        key6.onDown.add(function(){game.state.start('level2A')});
        key7.onDown.add(function(){game.state.start('level2B')});
    }
}
