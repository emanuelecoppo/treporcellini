function preload() {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.image('bg', 'assets/bg.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('water', 'assets/water.png');
    game.load.image('mud', 'assets/mud.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('soffio', 'assets/soffio.png');

    game.load.image('parallax0', 'assets/parallax0.png');
    game.load.image('parallax1', 'assets/parallax1.png');
    game.load.image('parallax2', 'assets/parallax2.png');


}
