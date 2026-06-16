alert("gra-ougi1.js");

let graOugi1Timer = 0;

function updateGraOugi1(){

    graOugi1Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    // 重力源

    const gx =
        canvas.width / 2;

    const gy =
        canvas.height / 2;

    const dx =
        gx - player.x;

    const dy =
        gy - player.y;

    const dist =

        Math.sqrt(
            dx * dx +
            dy * dy
        );

    // 吸引

    if(
        dist > 5
    ){

        const power =

            Math.max(
                0.2,
                3 /
                Math.max(
                    dist / 50,
                    1
                )
            );

        player.x +=
            dx / dist *
            power;

        player.y +=
            dy / dist *
            power;
    }

    // 6Way

    if(
        graOugi1Timer % 25 === 0
    ){

        const rot =
            graOugi1Timer *
            0.02;

        for(
            let i = 0;
            i < 6;
            i++
        ){

            const a =

                rot +

                Math.PI * 2 / 6 *
                i;

            spawnGraBullet(

                gra.x,

                gra.y,

                Math.cos(a) * 3,

                Math.sin(a) * 3,

                8
            );
        }
    }

    // ブラックホール周囲弾

    if(
        graOugi1Timer % 10 === 0
    ){

        const a =

            Math.random() *
            Math.PI * 2;

        const r = 260;

        spawnGraBullet(

            gx +
            Math.cos(a) * r,

            gy +
            Math.sin(a) * r,

            -Math.cos(a) * 2,

            -Math.sin(a) * 2,

            6
        );
    }

    // 即死圏

    if(
        dist < 40
    ){

        if(
            !player.debug
        ){

            player.hp = 0;
        }
    }
}

function drawGraOugi1(){

    const gx =
        canvas.width / 2;

    const gy =
        canvas.height / 2;

    // ブラックホール

    ctx.fillStyle =
        "black";

    ctx.beginPath();

    ctx.arc(
        gx,
        gy,
        35,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // 重力圏

    ctx.strokeStyle =
        "rgba(180,120,255,0.5)";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.arc(
        gx,
        gy,
        120,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        gx,
        gy,
        220,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(
        "BLACK HOLE",
        gx - 60,
        gy - 50
    );
}
