var intermezzoState = {

    create: function() {
        game.camera.flash(0xffffff, 1000);
        game.stage.backgroundColor = "#000";
        game.world.setBounds(0, 0, 1024, 768);

        game.add.sprite(0, 0, 'intermezzo');
        game.time.events.add(5000, nextState, this)

        function nextState() {
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add( function() {game.state.start('level2A')} );
        }
    },
}
