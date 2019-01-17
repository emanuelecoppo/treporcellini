var menuState = {

    create: function() {
        check1A = false;
        check1C = false;
        check1D = false;
        check2A = false;

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
        currentFame = 250;

        autori = game.add.sprite(0, 0, 'autori');
        copertina = game.add.sprite(0, 0, 'copertina');

        copertinaA = game.add.tween(copertina).to( {y:-768}, 1000, sin);
        copertinaB = game.add.tween(copertina).to( {y:0}, 1000, sin);

        buttons = game.add.group();
        gioca = buttons.add(game.add.graphics(72, 326).beginFill(0xffff00, 0).drawRect(0, 0, 91, 37).endFill());
        comandi = buttons.add(game.add.graphics(72, 375).beginFill(0xffff00, 0).drawRect(0, 0, 121, 37).endFill());
        autori = buttons.add(game.add.graphics(72, 424).beginFill(0xffff00, 0).drawRect(0, 0, 97, 37).endFill());
        indietro = game.add.graphics(70, 622).beginFill(0xffff00, 0).drawRect(0, 0, 90, 38).endFill();

        autori.events.onInputDown.add(function() {copertinaA.start()});
        indietro.events.onInputDown.add(function() {copertinaB.start()});
    },

    update: function() {

        enter.onDown.add(startGame);
        gioca.events.onInputDown.add(startGame);

        if (copertina.y==0) {buttons.setAll('inputEnabled', true)}
        else {buttons.setAll('inputEnabled', false)}

        if (!copertina.y==0) {indietro.inputEnabled=true}
        else {indietro.inputEnabled=false}

        function startGame() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('immaginiState')} );
        }
    }
}
