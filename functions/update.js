function update() {

    hitPlatform = game.physics.arcade.collide(player, [platforms, ground]);
    hitMud = game.physics.arcade.overlap(player, mud);
    hitWater = game.physics.arcade.overlap(player, water);
    game.physics.arcade.collide(sasso, [ground, platforms, player]);
    game.physics.arcade.collide(zattera, [ground, platforms, player, water]);

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
        player.body.maxVelocity.y = 9999;
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
                sasso.x -= 1;
            }
            else if (facing == 'right') {
                sasso.x += 1;
            }
        }
        // Zattera
        //if (game.physics.arcade.collide(player, zattera)) {
        //    if (facing == 'left') {
        //        zattera.x += 1;
        //    }
        //    else if (facing == 'right') {
        //        zattera.x -= 1;
        //    }
        //}
    }
    else {
        soffio.kill();
    }



    // /* -------------------------------------------------------- */
    // /* uso della funzione "WASTED": ovvero quando il player muore e deve ripartire da un checkpoint */
    //
    // /* come fare in modo di rilevare che il giocatore ha perso la vita e deve ricominciare dall'ultimo chechpoint?
    // Bisogna creare l'oggetto checkpoint */
    // if(player.dead == true){ /* ogni qual volta che il player cade, o viene colpito, viene impostata su TRUE la variabile dead*/
    //   player.life = player.life-1;
    //   if(player.life > 0){
    //     /* è ancora vivo*/
    //     player.respawn(); /* ricomincia da ultimo checkpoint il quale viene registrato con un override progressivo di una variabile (coordinate x e y di respawn) quando il player passa da un checkpoint*/
    //   }else{
    //     player.wasted(); /* ricomincia da zero.*/
    //   }
    //   /*set.*/player.dead = false;
    // }
    // /* --------------------------------------------------------- */


}
