var finaleState = {

    create: function() {
        game.stage.backgroundColor = "#fff";
        game.world.setBounds(0, 0, 1024, 768);

        game.time.events.add(1000, function(){
            game.add.sprite(0, 0, 'finale');
            game.camera.flash(0xffffff, 1000);
        }, this);
        game.time.events.add(8000, nextState, this)

        function nextState() {
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },
}
