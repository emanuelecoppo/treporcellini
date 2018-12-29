var menuState = {

    create: function() {
        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#555";
        game.world.setBounds(0, 0, 1024, 768);

        game.add.sprite(0, 0, 'menu');

        game.add.text(game.world.centerX, 110, 'I TRE PORCELLINI', {font: "60px Arial", fill:'#fff'}).anchor.setTo(.5,.5);
        game.add.text(game.world.centerX, 170, '10 anni dopo', {font: "60px Arial", fill:'#fff'}).anchor.setTo(.5,.5);
        comincia = game.add.text(game.world.centerX, game.world.height-80, 'Premi Enter per cominciare', {font: "30px Arial", fill:'#fff'});
        comincia.anchor.setTo(.5,.5);

        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        comincia.inputEnabled = true;
        comincia.input.useHandCursor = true;

        checkSpawnX = 0;
        checkSpawnY = 171*16;
    },

    update: function() {
        enter.onDown.add(changeState);
        comincia.events.onInputUp.add(changeState);

        function changeState() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('level1')} );
        }
    }
}
