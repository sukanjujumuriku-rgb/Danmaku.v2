alert("gra-ougi5.js");

let graOugi5Timer = 0;

function updateGraOugi5(){

    graOugi5Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    // 反転切替

    player.reverseControl =

        Math.floor(
            graOugi5Timer / 300
        ) % 2 === 1;

    // 圧縮リング

    const radius =

        Math.max(
            60,
            340 -
            graOugi5Timer * 0.4
        );

    const cx =
        canvas.width / 2;

    const cy =
        canvas.height / 2;

    const dx =
        player.x - cx;

    const dy =
        player.y - cy;

    const dist =

        Math.sqrt(
            dx * dx +
            dy * dy
        );

    // 外側は即死

    if(
        dist > radius
    ){

        if(
            !player.debug
        ){

            player.hp = 0;
        }
    }

    // リング弾

    if(
        graOugi5Timer % 30 === 0
    ){

        for(
            let i = 0;
            i < 24;
            i++
        ){

            const a =

                Math.PI * 2 /
                24 * i;

            spawnGraBullet(

                cx +
                Math.cos(a)
                * radius,

                cy +
                Math.sin(a)
                * radius,

                -Math.cos(a)
                * 2,

                -Math.sin(a)
                * 2,

                7
            );
        }
    }

    // 狙撃

    if(
        graOugi5Timer % 70 === 0
    ){

        const angle =

            Math.atan2(

                player.y -
                gra.y,

                player.x -
                gra.x
            );

        for(
            let i = -2;
            i <= 2;
            i++
        ){

            const a =
                angle +
                i * 0.1;

            spawnGraBullet(

                gra.x,

                gra.y,

                Math.cos(a) * 6,

                Math.sin(a) * 6,

                8
            );
        }
    }
}

function drawGraOugi5(){

    const radius =

        Math.max(
            60,
            340 -
            graOugi5Timer * 0.4
        );

    const cx =
        canvas.width / 2;

    const cy =
        canvas.height / 2;

    ctx.strokeStyle =
        "rgba(255,100,255,0.7)";

    ctx.lineWidth = 6;

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(
        "GALAXY COMPRESSION",
        220,
        320
    );

    if(
        player.reverseControl
    ){

        ctx.fillStyle =
            "red";

        ctx.font =
            "28px sans-serif";

        ctx.fillText(
            "REVERSE",
            320,
            90
        );
    }
}
