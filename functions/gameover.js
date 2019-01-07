var gameOver = {

    create: function() {
        game.input.keyboard.start();

        game.camera.flash('#000', 100);
        game.stage.backgroundColor = '#000';
        game.world.setBounds(0, 0, 1024, 768);
        currentFame = 250;

        game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER', {font: "60px Arial", fill:'#fff'}).anchor.setTo(.5,.5);
        continua = game.add.text(game.world.centerX, game.world.height-200, 'Continua', {font: "30px Arial", fill:'#fff'});
        tornaMenu = game.add.text(game.world.centerX, game.world.height-150, 'Torna al Menu', {font: "30px Arial", fill:'#fff'});
        continua.anchor.setTo(.5,.5);
        tornaMenu.anchor.setTo(.5,.5);

        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        continua.inputEnabled = true;
        tornaMenu.inputEnabled = true;
        continua.input.useHandCursor = true;
        tornaMenu.input.useHandCursor = true;
    },

    update: function() {
        enter.onDown.add(changeState);
        continua.events.onInputUp.add(changeState);
        tornaMenu.events.onInputUp.add(backMenu);

        function changeState() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start(currentLevel)} );
        }
        function backMenu() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    }
}
