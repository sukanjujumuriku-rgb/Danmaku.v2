alert("gra-ougi2.js");

let graOugi2Timer = 0;

function updateGraOugi2(){

    graOugi2Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    // ボスから放射

    if(
        graOugi2Timer % 12 === 0
    ){

        const angle =

            graOugi2Timer *
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

        b.gravityLens = true;

        b.turn =
            0.02;
    }

    // プレイヤー狙い

    if(
        graOugi2Timer % 50 === 0
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

            spawnGraBullet(

                gra.x,

                gra.y,

                Math.cos(
                    angle +
                    i * 0.12
                ) * 5,

                Math.sin(
                    angle +
                    i * 0.12
                ) * 5,

                8
            );

            const b =

                graBullets[
                    graBullets.length - 1
                ];

            b.gravityLens = true;

            b.turn =
                (
                    Math.random()
                    - 0.5
                ) * 0.06;
        }
    }

    // レンズ弾を曲げる

    graBullets.forEach(
        b=>{

            if(
                !b.gravityLens
            ){
                return;
            }

            if(
                b.angle ===
                undefined
            ){

                b.angle =

                    Math.atan2(
                        b.vy,
                        b.vx
                    );
            }

            b.angle +=
                b.turn;

            const speed =

                Math.sqrt(

                    b.vx * b.vx +

                    b.vy * b.vy
                );

            b.vx =
                Math.cos(
                    b.angle
                ) * speed;

            b.vy =
                Math.sin(
                    b.angle
                ) * speed;
        }
    );
}

function drawGraOugi2(){

    ctx.strokeStyle =
        "rgba(180,100,255,0.4)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(

        canvas.width / 2,

        canvas.height / 2,

        180,

        0,

        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(

        "GRAVITY LENS",

        280,

        320
    );
}
