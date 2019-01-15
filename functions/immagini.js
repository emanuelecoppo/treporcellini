var immaginiState = {

    create: function() {
        var current = 3;
        var time = 5000;

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.world.setBounds(0, 0, 1024, 768);

        renderB = game.add.sprite(0, 0, 'render2');
        renderA = game.add.sprite(0, 0, 'render1');

        game.time.events.add(time, fadePicture, this);

        function fadePicture() {
            if (renderA.alpha==1) {
                tween = game.add.tween(renderA).to( {alpha: 0}, 500).start();
                game.add.tween(renderB).to( {alpha: 1}, 500).start();
            }
            else {
                game.add.tween(renderA).to( {alpha: 1}, 500).start();
                tween = game.add.tween(renderB).to( {alpha: 0}, 500).start();
            }
            tween.onComplete.add(changePicture, this);
        }

        function changePicture() {
            if (renderA.alpha==0) {renderA.loadTexture('render' + current)}
            else {renderB.loadTexture('render' + current)}
            current++;
            if (current > 9) {game.time.events.add(time, startGame, this)}
            if (current <=9) {game.time.events.add(time, fadePicture, this)}
        }

        function startGame() {
            game.camera.fade('#000', 500);
            game.camera.onFadeComplete.add( function() {game.state.start('intro')} );
        }
    },
}
