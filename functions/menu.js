var menuState = {

    create: function() {
        game.stage.backgroundColor = "#555";
        game.world.setBounds(0, 0, 1024, 768);
        game.add.text(game.world.centerX, game.world.centerY, 'Press Enter to start', {font: "50px Arial", fill:'#fff'}).anchor.setTo(.5,.5);
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },

    update: function() {
        enter.onDown.add( function() {game.state.start('level1')} );
    }
}
