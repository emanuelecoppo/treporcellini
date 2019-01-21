var finaleState = {

    create: function() {
        game.sound.stopAll();

        game.stage.backgroundColor = "#fff";
        game.world.setBounds(0, 0, 1024, 768);

        game.time.events.add(1000, function(){
            finale = game.add.sprite(0, 0, 'finale');
            fine = game.add.text(game.world.centerX, game.world.centerY + 50, 'Fine', {font: "50px DIN", fill:'#fff'})
            fine.anchor.setTo(.5); fine.alpha = 0;
            game.camera.flash(0xffffff, 1000);
            game.camera.onFlashComplete.add(function(){game.stage.backgroundColor = "#000"});
            music = game.add.audio('finaleMusic', .5).play();
            game.add.tween(finale).to( {alpha: 0}, 1000).delay(7000).start();
            game.add.tween(fine).to( {alpha: 1}, 1000).delay(8000).start();
        }, this);

        game.time.events.add(12000, nextState, this)

        function nextState() {
            music.fadeOut(1000);
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
        }
    },
}
