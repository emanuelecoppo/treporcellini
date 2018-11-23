function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // World
    game.world.setBounds(0, 0, 1024*6, 768);

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

    // Alberi
    tree = game.add.sprite(3200, 0, 'mud');
    tree.scale.setTo(100, 768);

    // Rami
    rami = game.add.group();
    rami.enableBody = true;
    rami.create(tree.x - 40, 200, 'mud');
    rami.create(tree.x + tree.width + 40, 350, 'mud');
    rami.create(tree.x - 40, 500, 'mud');

    rami.children.forEach( function(ramo) {
        ramo.posizioneY = ramo.body.y //crea classe che memorizza y iniziale di ciascun ramo
        ramo.anchor.x = .5;
        ramo.scale.setTo(80,15);
        ramo.body.immovable = true;
        ramo.body.maxVelocity.y = 800;
    });

    // Fruits
    fruits = game.add.group()
    fruits.enableBody = true;
    for (var i = 0; i < 15; i++) { fruit = fruits.create(i*550, 0, 'fruit'); }
    fruits.setAll('body.gravity.y', 600);
    fruits.setAll('scale.x', .1);
    fruits.setAll('scale.y', .1);

    // Player
    player = game.add.sprite(4500, game.world.height - 400, 'dude');
    game.physics.arcade.enable(player);
    player.anchor.setTo(.5,.5);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    /* -- VITA del PLAYER -- */
    //player.health = 3;

    /* -- FLIES -- */
    flies = game.add.sprite(1800, game.world.height - 300, 'flies');
    game.physics.arcade.enable(flies);
    flies.anchor.setTo(.5,.5);
    flies.scale.setTo(.1,.1);
    /* moviemnto oscillatorio */
    flies.body.velocity.y = 100;
    game.time.events.loop(Phaser.Timer.SECOND*2, shiftVelocity, this);
    function shiftVelocity() {
        flies.body.velocity.y = -flies.body.velocity.y; /* inversione di velocità*/
    }

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
    groundBig = ground.create(4000, game.world.height - 100, 'platform');
    ground.setAll('scale.x', 500);
    ground.setAll('scale.y', 100);
    ground.setAll('body.immovable', true);
    groundBig.scale.x = 2000;

    // Sasso
    sasso = game.add.sprite(1000, game.world.height - 600, 'mud')
    sasso.scale.setTo(100,100);
    game.physics.arcade.enable(sasso);
    sasso.body.gravity.y = 700;
    sasso.body.bounce.x = 0.2;
    sasso.body.drag.x = 150;
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

    // Barra Fame
    barra = game.add.graphics(25, 25);
    barra.lineStyle(2, 0xffffff, .5);
    barra.drawRect(0, 0, 250, 20);
    barra.fixedToCamera = true;

    fame = game.add.graphics(25, 25);
    fame.beginFill(0xfefefe, .2);
    fame.drawRect(0, 0, 250, 20);
    fame.endFill();
    fame.fixedToCamera = true;

    // Controls
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    alt = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
    p = game.input.keyboard.addKey(Phaser.Keyboard.P);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);

    // Camera
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.2, 0.2);

}
