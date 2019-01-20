var menuState = {

    create: function() {
        check1A = false;
        check1C = false;
        check1D = false;
        check2A = false;
        dialogoBoss = 0;

        // Sound
        game.sound.stopAll();
        music = game.add.audio('menuMusic', .5).play();
        music.fadeIn(10000);
        music.loopFull();

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

        sotto = game.add.sprite(0, 0, '');
        copertina = game.add.sprite(0, 0, 'copertina');

        copertinaA = game.add.tween(copertina).to( {y:-768}, 1000, sin);
        copertinaB = game.add.tween(copertina).to( {y:0}, 1000, sin);

        buttons = game.add.group();
        autori = buttons.add(game.add.graphics(72, 326).beginFill(0xffffff, 0).drawRect(0, 0, 91, 37).endFill());
        crediti = buttons.add(game.add.graphics(72, 375).beginFill(0xffffff, 0).drawRect(0, 0, 91, 37).endFill());
        gioca = buttons.add(game.add.graphics(72, 424).beginFill(0xffffff, 0).drawRect(0, 0, 91, 37).endFill());
        indietro = game.add.graphics(74, 617).beginFill(0xffffff, 0).drawRect(0, 0, 98, 38).endFill();

        autori.events.onInputDown.add(function() {copertinaA.start(); sotto.loadTexture('autori')});
        crediti.events.onInputDown.add(function() {copertinaA.start(); sotto.loadTexture('crediti')});
        indietro.events.onInputDown.add(function() {copertinaB.start()});
    },

    update: function() {

        enter.onDown.add(startGame);
        gioca.events.onInputDown.add(startGame);

        if (copertina.y==0) {buttons.setAll('inputEnabled', true); buttons.setAll('input.useHandCursor', true)}
        else {buttons.setAll('inputEnabled', false)}

        if (!copertina.y==0) {indietro.inputEnabled=true; indietro.input.useHandCursor=true}
        else {indietro.inputEnabled=false}

        // buttons.children.forEach(function(button) {
        //     if (button.input.pointerOver()) {button.alpha = .3}
        //     else {button.alpha = 0}
        //     //button.blendMode = PIXI.blendModes.SCREEN;
        // })

        function startGame() {
            music.fadeOut(1500-100);
            game.camera.fade(0x000000, 1500);
            game.camera.onFadeComplete.add( function() {game.state.start('immaginiState')} );
        }
    }
}
