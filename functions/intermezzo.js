var intermezzoState = {

    create: function() {
        game.sound.stopAll();
        music = game.add.audio('fortezzaMusic').play();
        music.fadeIn(2000);

        game.camera.flash(0x000000, 1000);
        game.stage.backgroundColor = "#000";
        game.world.setBounds(0, 0, 1024, 768);

        game.add.sprite(0, 0, 'intermezzo');
        game.time.events.add(6700, nextState, this)

        function nextState() {
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add( function() {game.state.start('level2A')} );
        }
    },
}
