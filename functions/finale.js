var finaleState = {

    create: function() {
        game.sound.stopAll();

        game.stage.backgroundColor = "#fff";
        game.world.setBounds(0, 0, 1024, 768);

        game.time.events.add(1000, function(){
            game.add.sprite(0, 0, 'finale');
            game.camera.flash(0xffffff, 1000);
            music = game.add.audio('finaleMusic').play();
        }, this);
        game.time.events.add(12000, nextState, this)

        function nextState() {
            music.fadeOut(1000);
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },
}
