function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.plugins.add(Phaser.Plugin.ArcadeSlopes);

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
    fruits.setAll('body.drag.x', 1000);

    // Player
    player = game.add.sprite(4500, game.world.height - 800, 'lupo');
    game.physics.arcade.enable(player);
    player.anchor.setTo(.5,.5);
    player.scale.setTo(.8,.8);
    player.body.setSize(40,100,40,-3);
    player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 20, true);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, true);

    // Maiale
    maiale = game.add.sprite(5500, game.world.height - 800, 'lupo');
    maiale.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    maiale.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    maiale.posizioneX = maiale.x; //memorizza x iniziale
    game.physics.arcade.enable(maiale);
    maiale.body.gravity.y = 1000;
    maiale.body.velocity.x = -80;

    game.time.events.loop(Phaser.Timer.SECOND*4, maialeVelocity, game);
    function maialeVelocity() {
        maiale.body.velocity.x = -maiale.body.velocity.x;
        torcia.scale.x = -torcia.scale.x;
    }

    torcia = maiale.addChild(game.make.sprite(50, -50, 'torcia'));
    torcia.anchor.setTo(1,0);
    torcia.scale.setTo(.5,.5);
    torcia.alpha = .5;
    game.physics.arcade.enable(torcia);

    /* -- FLIES -- */
    flies = game.add.sprite(1800, game.world.height - 350, 'flies');
    game.physics.arcade.enable(flies);
    flies.anchor.setTo(.5,.5);
    flies.scale.setTo(.1,.1);
    /* moviemnto oscillatorio */
    flies.body.velocity.y = 100;
    game.time.events.loop(Phaser.Timer.SECOND*2, shiftVelocity, game);
    function shiftVelocity() {
        flies.body.velocity.y = -flies.body.velocity.y; /* inversione di velocità*/
    }

    // Soffio
    soffio = player.addChild(game.make.sprite(0, 0, 'soffio'));
    soffio.anchor.setTo(0,.5);
    soffio.alpha = .2;
    game.physics.arcade.enable(soffio);

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

    game.time.events.loop(Phaser.Timer.SECOND*2, creaTronco, game);
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

    // Sasso
    sasso = game.add.sprite(4250, game.world.height - 2000, 'sasso');
    game.physics.arcade.enable(sasso);
    sasso.enableBody = true;
    sasso.body.gravity.y = 700;
    sasso.body.bounce.x = 0.2;
    sasso.body.drag.x = 150;
    sasso.body.maxVelocity.x = 60;
    sasso.body.setCircle(45, 18, 0);
    sasso.anchor.setTo(.5,.5);

    // Zattera
    zattera = game.add.sprite(1150, game.world.height - 120, 'zattera')
    game.physics.arcade.enable(zattera);
    zattera.body.bounce.x = 0.5;
    zattera.body.drag.x = 50;
    zattera.body.maxVelocity.x = 100;
    zattera.scale.setTo(.2,.2)

    // Mud
    mud = game.add.sprite(272, game.world.height - 112, 'mud');
    mud.scale.setTo(464, 112);
    game.physics.arcade.enable(mud);
    mud.alpha = 0.95;
    mud.body.immovable = true;

    // Water
    water = game.add.sprite(1120, game.world.height - 112, 'water');
    water.scale.setTo(576, 112);
    game.physics.arcade.enable(water);
    water.alpha = 0.4;
    water.body.immovable = true;

    // Arcade Slopes
    mappa = game.add.tilemap('tilemap');
    mappa.addTilesetImage('slopes-green', 'slopes-green');
    mappa.setCollisionBetween(1, 38);
    ground = mappa.createLayer('ground');
    game.slopes.convertTilemapLayer(ground, 'arcadeslopes');

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

    // Enable Slopes
    game.slopes.enable([player, fruits, sasso, zattera, maiale]);
    game.slopes.preferY = true;

}
