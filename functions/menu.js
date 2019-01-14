var menuState = {

    create: function() {
        game.input.keyboard.start();
        check1A = false;
        check1C = false;
        check1D = false;
        check2A = false;
        autoriN = 1;

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#555";
        game.world.setBounds(0, 0, 1024, 768);
        currentFame = 250;

        //autoriBg = game.add.sprite(0, 0, 'autori-bg');
        autori3 = game.add.sprite(0, 0, 'autori3-bg');
        autori2 = game.add.sprite(0, 0, 'autori2-bg');
        autori1 = game.add.sprite(0, 0, 'autori1-bg');
        copertina = game.add.sprite(0, 0, 'copertina');

        copertinaA = game.add.tween(copertina).to( {y:-768}, 1000, sin);
        copertinaB = game.add.tween(copertina).to( {y:0}, 1000, sin);
        copertinaB.onComplete.add(function() {autoriN=1});

        buttons = game.add.group();
        gioca = buttons.add(game.add.graphics(72, 326).beginFill(0xffff00, 0).drawRect(0, 0, 91, 37).endFill());
        comandi = buttons.add(game.add.graphics(72, 375).beginFill(0xffff00, 0).drawRect(0, 0, 121, 37).endFill());
        autori = buttons.add(game.add.graphics(72, 424).beginFill(0xffff00, 0).drawRect(0, 0, 97, 37).endFill());

        indietro = game.add.graphics(70, 622).beginFill(0xffff00, 0).drawRect(0, 0, 90, 38).endFill();
        frecciaSX = game.add.graphics(70, 303).beginFill(0xffff00, 0).drawRect(0, 0, 27, 45).endFill();
        frecciaDX = game.add.graphics(914, 303).beginFill(0xffff00, 0).drawRect(0, 0, 27, 45).endFill();

        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);

        autori.events.onInputDown.add(function() {copertinaA.start()});
        indietro.events.onInputDown.add(function() {copertinaB.start()});
        frecciaDX.events.onInputDown.add(function() {autoriN++});
        frecciaSX.events.onInputDown.add(function() {autoriN--});
    },

    update: function() {

        enter.onDown.add(startGame);
        gioca.events.onInputDown.add(startGame);

        if (autoriN==1) {autori1.x=0; autori2.x=1024; autori3=1024}
        else if (autoriN==2) {autori1.x=1024; autori2.x=0; autori3=1024}
        else if (autoriN==3) {autori1.x=1024; autori2.x=1024; autori3=0}

        if (copertina.y==0) {buttons.setAll('inputEnabled', true)}
        else {buttons.setAll('inputEnabled', false)}

        if (!copertina.y==0) {indietro.inputEnabled=true; frecciaDX.inputEnabled=true; frecciaSX.inputEnabled=true}
        else {indietro.inputEnabled=false; frecciaDX.inputEnabled=false; frecciaSX.inputEnabled=false}

        function startGame() {
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
