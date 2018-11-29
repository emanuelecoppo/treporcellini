function preload() {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.tilemap('tilemap', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('slopes-blue', 'assets/tilemaps/slopes-blue.png', 16, 16);
    game.load.spritesheet('slopes-brown', 'assets/tilemaps/slopes-brown.png', 16, 16);
    game.load.spritesheet('slopes-gray', 'assets/tilemaps/slopes-gray.png', 16, 16);
    game.load.spritesheet('slopes-green', 'assets/tilemaps/slopes-green.png', 16, 16);

    game.load.image('platform', 'assets/platform.png');
    game.load.image('water', 'assets/water.png');
    game.load.image('mud', 'assets/mud.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('lupo', 'assets/lupo.png', 100, 100);
    game.load.image('soffio', 'assets/soffio.png');
    game.load.image('flies', 'assets/flies2.png');
    game.load.image('fruit', 'assets/fruit.png');
    game.load.image('sasso', 'assets/sasso.png');
    game.load.image('zattera', 'assets/zattera.png');
    game.load.image('torcia', 'assets/torcia.png');

    game.load.image('parallax0', 'assets/parallax0.png');
    game.load.image('parallax1', 'assets/parallax1.png');
    game.load.image('parallax2', 'assets/parallax2.png');

}
