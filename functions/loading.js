var bootState = {

    preload: function() {
        game.load.baseURL = 'assets/';
        game.load.image('loadingBar', 'graphics/loading-bar.png');
    },

    create: function() {
        game.stage.backgroundColor = "#555";
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('loadingState');
    }
}

var loadingState = {

    preload: function() {
        loadingBar = game.add.sprite(0, 0, 'loadingBar');
        loadingBar.x = game.world.centerX - loadingBar.width/2;
        loadingBar.y = game.world.centerY - loadingBar.height/2;
        game.load.setPreloadSprite(loadingBar);

        game.add.text(game.world.centerX, game.world.centerY + 50, 'Loading...', {font: "25px Arial", fill:'#fff'}).anchor.setTo(.5,.5);

        game.load.baseURL = 'assets/';
        // Graphics
        game.load.image('pause', 'graphics/pause.png');
        // Background
        game.load.image('parallax0', 'background/parallax0.png');
        game.load.image('parallax1', 'background/parallax1.png');
        game.load.image('parallax2', 'background/parallax2.png');
        // Characters
        game.load.spritesheet('lupo', 'characters/lupo.png', 100, 100);
        game.load.image('soffio', 'characters/soffio.png');
        game.load.image('torcia', 'characters/torcia.png');
        game.load.image('flies', 'characters/flies.png');
        // Objects
        game.load.image('fruit', 'objects/fruit.png');
        game.load.image('sasso', 'objects/sasso.png');
        game.load.image('zattera', 'objects/zattera.png');
        game.load.image('water', 'objects/water.png');
        game.load.image('mud', 'objects/mud.png');
        // Tilemaps
        game.load.spritesheet('slopes-green', 'tilemaps/slopes-green.png', 16, 16);
        game.load.tilemap('demo', 'tilemaps/demo.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    },

    create: function() {
        game.stage.backgroundColor = "#555";
        game.state.start('level1');
    }
}
