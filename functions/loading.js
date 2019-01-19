var bootState = {

    preload: function() {
        game.load.baseURL = 'assets/';
        game.load.image('loadingBar', 'graphics/loading-bar.png');
    },

    create: function() {
        game.stage.backgroundColor = "#000";
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
        game.add.text(game.world.centerX, game.world.centerY + 50, 'Caricamento...', {font: "25px Arial", fill:'#fff'}).anchor.setTo(.5,.5);

        game.load.baseURL = 'assets/';
        // Graphics
        game.load.image('pause', 'graphics/pause.png');
        game.load.image('autori', 'graphics/autori.png');
        game.load.image('crediti', 'graphics/crediti.png');
        game.load.image('copertina', 'graphics/copertina.png');
        game.load.image('gameover', 'graphics/gameover.png');
        // Background
        game.load.image('notte0', 'background/notte0.png');
        game.load.image('notte1', 'background/notte1.png');
        game.load.image('notte2', 'background/notte2.png');
        game.load.image('giorno0', 'background/giorno0.png');
        game.load.image('giorno1', 'background/giorno1.png');
        game.load.image('giorno2', 'background/giorno2.png');
        game.load.image('grotta-bg', 'background/grotta-bg.png');
        game.load.image('intro', 'background/intro.png');
        game.load.image('waterfall', 'background/waterfall.png');
        game.load.image('fortezza-bg', 'background/fortezza-bg.png');
        game.load.image('cascata-bg', 'background/cascata-bg.png');
        game.load.image('boss-bg', 'background/boss-bg.png');
        // Characters
        game.load.spritesheet('lupo', 'characters/lupo.png', 64, 90);
        game.load.spritesheet('mamma', 'characters/mamma.png', 61.5, 100);
        game.load.spritesheet('maiale', 'characters/maiale.png', 75, 120);
        game.load.spritesheet('maiale-torcia', 'characters/maiale-torcia.png', 75, 120);
        game.load.spritesheet('maiale-lanciafiamme', 'characters/maiale-lanciafiamme.png', 119.5, 120);
        game.load.spritesheet('soffio', 'characters/soffio.png', 200, 125);
        game.load.image('torcia', 'characters/torcia.png');
        game.load.image('flies', 'characters/flies.png');
        game.load.image('boss', 'characters/boss.png');
        // Objects
        game.load.image('fruit', 'objects/fruit.png');
        game.load.image('sasso', 'objects/sasso.png');
        game.load.image('zattera', 'objects/zattera.png');
        game.load.image('blue', 'objects/blue.png');
        game.load.image('brown', 'objects/brown.png');
        game.load.image('stalattite', 'objects/stalattite.png');
        game.load.image('rametto', 'objects/rametto.png');
        game.load.image('cespuglio', 'objects/cespuglio.png');
        game.load.image('tronco-cavo', 'objects/tronco-cavo.png');
        game.load.image('tronco-cavo-sopra', 'objects/tronco-cavo-sopra.png');
        game.load.image('bomb', 'objects/bomba.png');
        game.load.image('cartello', 'objects/cartello.png');
        game.load.image('flame', 'objects/flame.png');
        game.load.image('fango', 'objects/fango.png');
        game.load.spritesheet('checkpoint', 'objects/checkpoint.png', 100, 134);
        game.load.spritesheet('explosion', 'objects/explosion.png', 64, 64, 23);
        game.load.spritesheet('nastro', 'objects/nastro.png', 192, 64, 8);
        game.load.spritesheet('water', 'objects/water.png', 50, 240);
        game.load.spritesheet('lava', 'objects/lava.png', 50, 56*32);
        // Tilemaps
        game.load.spritesheet('slopes-green', 'tilemaps/slopes-green.png', 16, 16);
        game.load.spritesheet('castle', 'tilemaps/castle.png', 32, 32);
        game.load.tilemap('level1A', 'tilemaps/level1A.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1B', 'tilemaps/level1B.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1C', 'tilemaps/level1C.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1D', 'tilemaps/level1D.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2A', 'tilemaps/level2A.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2B', 'tilemaps/level2B.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('level1A', 'tilemaps/level1A.png');
        game.load.image('level1B', 'tilemaps/level1B.png');
        game.load.image('level1C', 'tilemaps/level1C.png');
        game.load.image('level2A', 'tilemaps/level2A.png');
        // Img
        game.load.image('render1', 'img/render1.png');
        game.load.image('render2', 'img/render2.png');
        game.load.image('render3', 'img/render3.png');
        game.load.image('render4', 'img/render4.png');
        game.load.image('render5', 'img/render5.png');
        game.load.image('render6', 'img/render6.png');
        game.load.image('render7', 'img/render7.png');
        game.load.image('render8', 'img/render8.png');
        game.load.image('render1t', 'img/render1t.png');
        game.load.image('render2t', 'img/render2t.png');
        game.load.image('render3t', 'img/render3t.png');
        game.load.image('render4t', 'img/render4t.png');
        game.load.image('render5t', 'img/render5t.png');
        game.load.image('render6t', 'img/render6t.png');
        game.load.image('render7t', 'img/render7t.png');
        game.load.image('render8t', 'img/render8t.png');
        game.load.image('intermezzo', 'img/intermezzo.png');
        game.load.image('finale', 'img/finale.png');
        // Music
        game.load.audio('immaginiMusic', 'music/immagini.wav');
        game.load.audio('bossMusic', 'music/boss.wav');
        game.load.audio('gameoverMusic', 'music/gameover.wav');
        game.load.audio('fortezzaMusic', 'music/fortezza.wav');
        game.load.audio('marcia', 'music/marcia.wav');
        // SFX
        game.load.audio('explosionSFX', 'sfx/explosion.wav');

    },

    create: function() {
        game.stage.backgroundColor = "#000";
        game.camera.fade(0x000000, 100);
        game.camera.onFadeComplete.add( function() {game.state.start('menuState')} );
    }
}
