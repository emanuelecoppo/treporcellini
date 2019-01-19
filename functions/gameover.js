var gameOver = {

    create: function() {
        game.input.keyboard.start();

        music = game.add.audio('gameoverMusic').play();

        game.camera.flash('#000', 1000);
        game.stage.backgroundColor = '#000';
        game.world.setBounds(0, 0, 1024, 768);
        currentFame = 250;

        game.add.sprite(0, 0, 'gameover');
        continua = game.add.graphics(484, 217).beginFill(0xffffff, 0).drawRect(0, 0, 93, 33).endFill();
        tornaMenu = game.add.graphics(458, 266).beginFill(0xffffff, 0).drawRect(0, 0, 146, 33).endFill();

        game.time.events.add(1000, function() {
            continua.inputEnabled = true;
            tornaMenu.inputEnabled = true;
            continua.input.useHandCursor = true;
            tornaMenu.input.useHandCursor = true;
            continua.events.onInputDown.add(changeState);
            tornaMenu.events.onInputDown.add(backMenu);
            enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            enter.onDown.add(changeState);
        });

        function changeState() {
            music.fadeOut(500-100);
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start(currentLevel)} );
        }
        function backMenu() {
            music.fadeOut(500-100);
            game.camera.fade(0x000000, 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    }
}
