function update() {

    // Collisions
    hitPlatform = game.physics.arcade.collide(player, [ledge, ground, tronchi, rocks, rami]);
    hitMud = game.physics.arcade.overlap(player, mud);
    hitWater = game.physics.arcade.overlap(player, water);
    game.physics.arcade.collide(fruits, [ledge, ground, rocks, tronchi]);

    zattera.body.immovable = true;
    sasso.body.immovable = true;
    game.physics.arcade.collide([zattera, sasso], player);
    zattera.body.immovable = false;
    sasso.body.immovable = false;
    game.physics.arcade.collide([zattera, sasso], [ground, ledge]);

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
        jump = 900;
        player.body.gravity.y = 2000;
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


    // Tronchi
    tronchi.children.forEach( function(tronco) {
        tronco.anchor.setTo(.5, 0);
        tronco.scale.setTo(100, 20);
        tronco.body.immovable = true;
        tronco.body.acceleration.y = 50 + 50*Math.random();
        tronco.body.maxVelocity.y = 250;
        if (tronco.y > game.world.height) {
            tronco.destroy();
        }
    });

    // Respawn
    function respawn() {
        player.body.position.setTo(2400, game.world.height - 400);
        fame.width = 250;
    }

    // Out of bounds
    if (player.y > game.world.height + player.height) {
        respawn();
    }

    // Vola (per test)
    if (game.input.keyboard.addKey(Phaser.Keyboard.F).isDown) {
        player.body.gravity.y = 0;
    }

    /* -- FLIES -- */
    //if(game.physics.arcade.overlap(flies, player)){
    //  player.damage(1); /* player subisce danno */
    //  if(player.health > 0){  /* player non è morto*/
    //      respawn();
    //  }else{  /* plyer è morto */
    //      player.body.position.setTo(2100, game.world.height - 400);
    //  }
    //}

    // Flies
    if (game.physics.arcade.overlap(player, flies)) {
        respawn();
    }

    // Rami
    rami.children.forEach( function(ramo) {

        if (ramo.body.touching.up) {
            game.time.events.add(Phaser.Timer.SECOND*0.2, cadeRamo, this);

            function cadeRamo() {
                if (ramo.body.touching.up) {
                    ramo.body.gravity.y = 800;
                }
            }
        }
        if (ramo.y > game.world.height + 3000) {
            ramo.body.gravity.y = 0;
            ramo.body.velocity.y = 0;
            ramo.body.y = ramo.posizioneY;
        }
    });

    // Barra Fame
    fame.width -= .05;

    if (fame.width > 250) { //impedisce di andare oltre 250
        fame.width = 250;
    }
    else if (fame.width >= 100) { //bianco
        fame.tint = 0xfefefe;
    }
    else if (50 < fame.width && fame.width < 100) { //giallo
        fame.tint = 0xffff00;
    }
    else if (fame.width <= 50) { //rosso
        fame.tint = 0xff0000;
    }
    else if (fame.width <= 0) { //muore
        respawn();
    }

    // Fruits
    function eatFruit(player, fruit) {
        fruit.kill();
        if (fame.width > 150) { //evita scatto della barra fuori dal bordo
            fame.width = 250;
        }
        else {
            fame.width += 50;
        }
    }
    game.physics.arcade.overlap(player, fruits, eatFruit, null, this)
}
