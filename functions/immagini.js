var immaginiState = {

    create: function() {
        var current = 3;
        var time = 5500;
        var delay = 1000;

        game.sound.stopAll();
        music = game.add.audio('immaginiMusic').play();

        game.camera.flash('#000', 500);
        game.stage.backgroundColor = "#000";
        game.world.setBounds(0, 0, 1024, 768);

        renderB = game.add.sprite(0, 0, 'render2');
        textB = game.add.sprite(0, 0, 'render2t'); textB.alpha=0;
        renderA = game.add.sprite(0, 0, 'render1');
        textA = game.add.sprite(0, 0, 'render1t'); textA.alpha=0;

        // skip = game.add.text (750, 700, "Premi Enter per saltare", styleR); skip.alpha = 0;
        enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(startGame);

        // game.add.tween(skip).to( {alpha: 1}, 500, sin).delay(delay*2).yoyo(true, delay*3).start();
        game.add.tween(textA).to( {alpha: 1}, 250).delay(delay).start();
        game.time.events.add(time, fadePicture, this);

        function fadePicture() {
            if (renderA.alpha==1) {
                tween = game.add.tween(renderA).to( {alpha: 0}, 500).start();
                game.add.tween(textA).to( {alpha: 0}, 500).start();
                game.add.tween(renderB).to( {alpha: 1}, 500).start();
                game.add.tween(textB).to( {alpha: 1}, 250).delay(delay).start();
            }
            else {
                game.add.tween(renderA).to( {alpha: 1}, 500).start();
                game.add.tween(textA).to( {alpha: 1}, 250).delay(delay).start();
                tween = game.add.tween(renderB).to( {alpha: 0}, 500).start();
                game.add.tween(textB).to( {alpha: 0}, 500).start();
            }
            tween.onComplete.add(changePicture, this);
        }

        function changePicture() {
            if (renderA.alpha==0) {
                renderA.loadTexture('render'+current);
                textA.loadTexture('render'+current+'t')}
            else {
                renderB.loadTexture('render'+current);
                textB.loadTexture('render'+current+'t')}
            current++;
            if (current > 9) {game.time.events.add(time, startGame, this)}
            if (current <=9) {game.time.events.add(time, fadePicture, this)}
        }

        function startGame() {
            music.fadeOut(1500-100);
            game.camera.fade(0x000000, 1500);
            game.camera.onFadeComplete.add( function() {game.state.start('intro')} );
        }
    },
}
