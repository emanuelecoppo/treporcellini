function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // World
    game.world.setBounds(0, 0, 1024*3, 768);

    // Parallax
    parallax0 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax0');
    parallax1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax1');
    parallax2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'parallax2');
    parallax0.fixedToCamera = true;
    parallax1.fixedToCamera = true;
    parallax2.fixedToCamera = true;

    // Player
    player = game.add.sprite(1200, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
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
    game.physics.arcade.enable(soffio)

    // Platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.create(-150, 350, 'platform');
    platforms.create(400, 500, 'platform');
    platforms.create(800, 400, 'platform');
    platforms.create(1200, 200, 'platform');
    platforms.create(1600, 250, 'platform');
    platforms.create(2000, 450, 'platform');
    platforms.setAll('scale.x', 450);
    platforms.setAll('scale.y', 30);
    platforms.setAll('body.immovable', true);


    /* ---------------------------------------------- */
    /* Rami che dopo tot si spezzano */
    platforms.create(850, 450, 'branch')
    /* ---------------------------------------------- */



    //Rain
    rainParticle = game.add.bitmapData(0, 0);
    rainParticle.ctx.rect(0, 0, 3, 25);
    rainParticle.ctx.fillStyle = '#9cc9de';
    rainParticle.ctx.fill();

    emitter = game.add.emitter(game.world.centerX, 0, 400);
    emitter.width = game.world.width;
    emitter.makeParticles(rainParticle);
    emitter.setYSpeed(1200, 1500);
    emitter.setXSpeed(-5, 5);
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.alpha = 0.2;
    emitter.start(false, 1600, 5, 0, false);

    // Ground
    ground = game.add.group();
    ground.enableBody = true;
    ground.create(0, game.world.height - 100, 'platform');
    ground.create(1000, game.world.height - 100, 'platform');
    ground.create(2000, game.world.height - 100, 'platform');
    ground.setAll('scale.x', 500);
    ground.setAll('scale.y', 100);
    ground.setAll('body.immovable', true);

    // Sasso
    sasso = game.add.sprite(1050, game.world.height - 200, 'platform')
    sasso.scale.setTo(100,100);
    game.physics.arcade.enable(sasso)
    sasso.enableBody = true;
    sasso.body.gravity.y = 500;

    // Zattera
    zattera = game.add.sprite(1500+10, game.world.height-110, 'platform')
    zattera.scale.setTo(80,20);
    game.physics.arcade.enable(zattera)
    zattera.enableBody = true;
    zattera.body.immovable = true;

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
