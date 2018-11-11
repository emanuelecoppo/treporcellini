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
    ground.create(500, game.world.height - 100, 'platform');
    ground.create(1000, game.world.height - 100, 'platform');
    ground.create(2000, game.world.height - 100, 'platform');
    ground.setAll('scale.x', 500);
    ground.setAll('scale.y', 100);
    ground.setAll('body.immovable', true);

    // Sasso
    sasso = game.add.sprite(1000, game.world.height - 600, 'mud')
    sasso.scale.setTo(100,100);
    game.physics.arcade.enable(sasso);
    sasso.body.gravity.y = 500;
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
    mud = game.add.sprite(0, game.world.height - 100, 'mud');
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
