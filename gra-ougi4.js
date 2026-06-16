alert("gra-ougi4.js");

let graOugi4Timer = 0;

function updateGraOugi4(){

    graOugi4Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    const bx =
        canvas.width / 2;

    const by =
        canvas.height / 2;

    const dx =
        bx - player.x;

    const dy =
        by - player.y;

    const dist =

        Math.sqrt(
            dx * dx +
            dy * dy
        );

    // 強力吸引

    if(
        dist > 5
    ){

        const pull =

            1.2 +
            Math.max(
                0,
                250 - dist
            ) / 120;

        player.x +=
            dx / dist *
            pull;

        player.y +=
            dy / dist *
            pull;
    }

    // 移動速度低下

    if(
        dist < 220
    ){

        player.gravitySlow = 0.6;
    }
    else{

        player.gravitySlow = 1;
    }

    if(
        dist < 140
    ){

        player.gravitySlow = 0.35;
    }

    if(
        dist < 80
    ){

        player.gravitySlow = 0.15;
    }

    // 即死圏

    if(
        dist < 45
    ){

        if(
            !player.debug
        ){

            player.hp = 0;
        }
    }

    // 渦巻き弾

    if(
        graOugi4Timer % 4 === 0
    ){

        const angle =

            graOugi4Timer *
            0.08;

        spawnGraBullet(

            gra.x,

            gra.y,

            Math.cos(angle) * 4,

            Math.sin(angle) * 4,

            7
        );

        const b =

            graBullets[
                graBullets.length - 1
            ];

        b.curve = true;

        b.angle = angle;

        b.turn = 0.015;
    }

    // プレイヤー狙い

    if(
        graOugi4Timer % 50 === 0
    ){

        const angle =

            Math.atan2(

                player.y -
                gra.y,

                player.x -
                gra.x
            );

        for(
            let i = -3;
            i <= 3;
            i++
        ){

            spawnGraBullet(

                gra.x,

                gra.y,

                Math.cos(
                    angle +
                    i * 0.08
                ) * 5,

                Math.sin(
                    angle +
                    i * 0.08
                ) * 5,

                8
            );
        }
    }
}

function drawGraOugi4(){

    const bx =
        canvas.width / 2;

    const by =
        canvas.height / 2;

    // ブラックホール

    ctx.fillStyle =
        "black";

    ctx.beginPath();

    ctx.arc(
        bx,
        by,
        40,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // イベントホライズン

    ctx.strokeStyle =
        "rgba(180,100,255,0.5)";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.arc(
        bx,
        by,
        220,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        bx,
        by,
        140,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        bx,
        by,
        80,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(
        "EVENT HORIZON",
        250,
        320
    );
}
