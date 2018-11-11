function update() {

    hitPlatform = game.physics.arcade.collide(player, [platforms, ground]);
    hitMud = game.physics.arcade.overlap(player, mud);
    hitWater = game.physics.arcade.overlap(player, water);

    zattera.body.immovable = true;
    sasso.body.immovable = true;
    game.physics.arcade.collide([zattera, sasso], player);
    zattera.body.immovable = false;
    sasso.body.immovable = false;
    game.physics.arcade.collide([zattera, sasso], [ground, platforms]);

    // Parallax
    parallax0.tilePosition.x = 0;
    parallax1.tilePosition.x = -0.5 * game.camera.x;
    parallax2.tilePosition.x = -0.9 * game.camera.x;

    // Velocity
    player.body.velocity.x = 0.8 * player.body.velocity.x;

    if (hitMud) {
        walk = 50;
        jump = 50;
        player.body.gravity.y = 150;
        player.body.maxVelocity.y = 50;
    }
    else if (hitWater) {
        walk = 100;
        jump = 120;
        player.body.gravity.y = 150;
        player.body.maxVelocity.y = 120;
    }
    else {
        walk = 250;
        jump = 700;
        player.body.gravity.y = 1200;
        player.body.maxVelocity.y = 1000;
    }

    // Walk
    if (cursors.left.isDown) {
        player.body.velocity.x = -walk;
        player.animations.play('left')
        facing = 'left';
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = walk;
        player.animations.play('right')
        facing = 'right';
    }
    else {
        if (facing == 'left') {
            player.frame = 0;
        }
        else if (facing == 'right') {
            player.frame = 5;
        }
    }

    // Jump
    spacebar.onDown.add(jumpFunction);
    function jumpFunction() {
        if (player.body.touching.down || hitMud || hitWater) {
            player.body.velocity.y = -jump;
        }
    }

    // Soffio
    if (s.isDown) {
        soffio.revive();
        if (facing == 'left') {
            soffio.x = -25;
            soffio.scale.setTo(-.2,.2);
        }
        else if (facing == 'right') {
            soffio.x = 25;
            soffio.scale.setTo(.2,.2);
        }
        // Sasso
        if (game.physics.arcade.overlap(soffio, sasso)) {
            if (facing == 'left') {
                sasso.body.velocity.x -= 5;
            }
            else if (facing == 'right') {
                sasso.body.velocity.x += 5;
            }
        }
        // Zattera
        if (zattera.body.touching.up == true) {
            if (facing == 'left') {
                zattera.body.velocity.x += 5;
            }
            else if (facing == 'right') {
                zattera.body.velocity.x -= 5;
            }
        }
    }
    else {
        soffio.kill();
    }
}
