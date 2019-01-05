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
        game.load.image('grottaBg', 'background/grottaBg.png');
        game.load.image('grottaP', 'background/grottaP.png');
        game.load.image('tana', 'background/tana.png');
        game.load.image('intro', 'background/intro.png');
        game.load.image('waterfall', 'background/waterfall.png');
        // Characters
        game.load.spritesheet('lupo', 'characters/lupo.png', 100, 100);
        game.load.image('soffio', 'characters/soffio.png');
        game.load.image('torcia', 'characters/torcia.png');
        game.load.image('flies', 'characters/flies.png');
        // Objects
        game.load.image('fruit', 'objects/fruit.png');
        game.load.image('sasso', 'objects/sasso.png');
        game.load.image('zattera', 'objects/zattera.png');
        game.load.image('blue', 'objects/blue.png');
        game.load.image('brown', 'objects/brown.png');
        game.load.image('stalattite', 'objects/stalattite.png');
        game.load.image('checkpoint', 'objects/checkpoint.png');
        game.load.image('rametto', 'objects/rametto.png');
        game.load.image('cespuglio', 'objects/cespuglio.png');
        game.load.image('tronco-stealth', 'objects/tronco-stealth.png');
        // Tilemaps
        game.load.spritesheet('slopes-green', 'tilemaps/slopes-green.png', 16, 16);
        game.load.tilemap('intro', 'tilemaps/intro.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1A', 'tilemaps/level1A.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1B', 'tilemaps/level1B.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1C', 'tilemaps/level1C.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tilemap('level1D', 'tilemaps/level1D.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tilemap('level1E', 'tilemaps/level1E.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tilemap('level2A', 'tilemaps/level2A.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tilemap('level2B', 'tilemaps/level2B.json', null, Phaser.Tilemap.TILED_JSON);
        // Img
        game.load.image('menu', 'img/menu.jpg');
    },

    create: function() {
        game.stage.backgroundColor = "#555";
        game.camera.fade('#000', 100);
        game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
    }
}
