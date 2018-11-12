function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // World
    game.world.setBounds(0, 0, 1024*4, 768);

    // Parallax
    parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax0');
    parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax1');
    parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax2');
    parallax0.fixedToCamera = true;
    parallax1.fixedToCamera = true;
    parallax2.fixedToCamera = true;

    // Cascata
    cascata = game.add.group();
    cascata.alpha = 0.4;
    cascata1 = cascata.create(2500, 0, 'water');
    cascata2 = cascata.create(3500, 0, 'water')
    cascata1.scale.setTo(500, game.world.height);
    cascata2.scale.setTo(500, game.world.height);

    // Player
    player = game.add.sprite(2100, game.world.height - 400, 'dude');
    game.physics.arcade.enable(player);
    player.anchor.setTo(.5,.5);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // /* ---------------------------------------------------- */
    // /* aggiunta de variabile dead*/   /* non so se funziona come con Java e gli oggetti */
    // /* se siamo costretti ad usare solo variabili globali allora le chiameremo con questa logica: playerDead, playerLife ecc...*/
    // player.dead = false;
    // /* vita del giocatore, impostata arbitrariamente a 3*/
    // player.life = 3;
    // /* funzione wasted per ricominciare da capo */
    // player.wasted(){
    //   /* codice per ricominciare da capo */
    // }
    // /* ----------------------------------------------------- */

    // Soffio
    soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
    soffio.anchor.setTo(0,.5);
    soffio.alpha = .2;
    game.physics.arcade.enable(soffio);

    // Ledge
    ledge = game.add.group();
    ledge.enableBody = true;
    ledge.create(-150, 350, 'platform');
    ledge.create(400, 500, 'platform');
    ledge.create(800, 400, 'platform');
    ledge.create(1200, 200, 'platform');
    ledge.create(1600, 350, 'platform');
    ledge.create(2000, 500, 'platform');
    ledge.setAll('scale.x', 450);
    ledge.setAll('scale.y', 30);
    ledge.setAll('body.immovable', true);

    // Rocks
    rocks = game.add.group();
    rocks.enableBody = true;
    rocks.create(cascata2.x + 50, 500, 'mud');
    rocks.create(cascata2.x + 200, 350, 'mud');
    rocks.create(cascata2.x + 350, 200, 'mud');
    rocks.create(cascata2.x + 350, 600, 'mud');
    rocks.setAll('scale.x', 70);
    rocks.setAll('scale.y', 40);
    rocks.setAll('body.immovable', true);

    // Tronchi
    tronchi = game.add.group();
    tronchi.enableBody = true;

    game.time.events.loop(Phaser.Timer.SECOND*2, creaTronco, this);
    function creaTronco() {
        tronchi.create(cascata1.x + 140, -100, 'mud');
        tronchi.create(cascata1.x + 360, -300, 'mud');
    }

    /* ---------------------------------------------- */
    /* Rami che dopo tot si spezzano */
    //platforms.create(850, 450, 'branch')
    /* ---------------------------------------------- */

    //Rain
    rainParticle = game.add.bitmapData(0, 0);
    rainParticle.ctx.rect(0, 0, 3, 25);
    rainParticle.ctx.fillStyle = '#9cc9de';
    rainParticle.ctx.fill();

    rain = game.add.emitter(game.world.centerX, 0, 400);
    rain.width = game.world.width;
    rain.makeParticles(rainParticle);
    rain.setYSpeed(1200, 1500);
    rain.setXSpeed(-5, 5);
    rain.minRotation = 0;
    rain.maxRotation = 0;
    rain.alpha = 0.2;
    rain.start(false, 1600, 5, 0, false);

    // Ground
    ground = game.add.group();
    ground.enableBody = true;
    ground.create(0, game.world.height - 100, 'platform');
    ground.create(1000, game.world.height - 100, 'platform');
    ground.create(2000, game.world.height - 100, 'platform');
    ground.create(3000, game.world.height - 100, 'platform');
    ground.create(4000, game.world.height - 100, 'platform');
    ground.create(5000, game.world.height - 100, 'platform');
    ground.setAll('scale.x', 500);
    ground.setAll('scale.y', 100);
    ground.setAll('body.immovable', true);

    // Sasso
    sasso = game.add.sprite(1000, game.world.height - 600, 'mud')
    sasso.scale.setTo(100,100);
    game.physics.arcade.enable(sasso);
    sasso.body.gravity.y = 700;
    sasso.body.bounce.x = 0.2;
    sasso.body.drag.x = 100;
    sasso.body.maxVelocity.x = 60;

    // Zattera
    zattera = game.add.sprite(1500, game.world.height - 110, 'mud')
    zattera.scale.setTo(80,20);
    game.physics.arcade.enable(zattera);
    zattera.body.bounce.x = 0.5;
    zattera.body.drag.x = 50;
    zattera.body.maxVelocity.x = 100;

    // Mud
    mud = game.add.sprite(500, game.world.height - 100, 'mud');
    mud.scale.setTo(500, 100);
    game.physics.arcade.enable(mud);
    mud.alpha = 0.95;
    mud.body.immovable = true;

    // Water
    water = game.add.sprite(1500, game.world.height - 100, 'water');
    water.scale.setTo(500, 100);
    game.physics.arcade.enable(water);
    water.alpha = 0.4;
    water.body.immovable = true;

    // Controls
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    alt = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    p = game.input.keyboard.addKey(Phaser.Keyboard.P);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);

    // Camera
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.2, 0.2);

}
