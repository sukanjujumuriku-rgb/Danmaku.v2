alert("chrono-ougi4.js");

let chronoOugi4Timer = 0;

function updateChronoOugi4(){

    chronoOugi4Timer++;

    chrono.x =
        canvas.width / 2;

    chrono.y =
        120;

    // 8Way

    if(
        chronoOugi4Timer % 30 === 0
    ){

        const rot =
            chronoOugi4Timer * 0.03;

        for(
            let i = 0;
            i < 8;
            i++
        ){

            const a =

                rot +

                Math.PI * 2 / 8
                * i;

            chronoBullets.push({

                x: chrono.x,
                y: chrono.y,

                vx:
                    Math.cos(a) * 2,

                vy:
                    Math.sin(a) * 2,

                radius: 6,

                eternal: true
            });
        }
    }

    // プレイヤー狙い

    if(
        chronoOugi4Timer % 90 === 0
    ){

        const angle =

            Math.atan2(

                player.y -
                chrono.y,

                player.x -
                chrono.x
            );

        for(
            let i = -3;
            i <= 3;
            i++
        ){

            const a =
                angle +
                i * 0.15;

            chronoBullets.push({

                x: chrono.x,
                y: chrono.y,

                vx:
                    Math.cos(a) * 3,

                vy:
                    Math.sin(a) * 3,

                radius: 7,

                eternal: true
            });
        }
    }

    // 風車

    if(
        chronoOugi4Timer % 180 === 0
    ){

        for(
            let i = 0;
            i < 4;
            i++
        ){

            const a =
                Math.PI / 2 * i;

            chronoBullets.push({

                x: chrono.x,
                y: chrono.y,

                vx:
                    Math.cos(a) * 1.5,

                vy:
                    Math.sin(a) * 1.5,

                radius: 12,

                eternal: true,

                curve: true,

                angle: a,

                turn: 0.015
            });
        }
    }
}

function drawChronoOugi4(){

    ctx.strokeStyle =
        "rgba(100,200,255,0.4)";

    ctx.lineWidth = 4;

    // ワープ境界演出

    ctx.strokeRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
        "rgba(150,220,255,0.7)";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(
        "ETERNAL FIELD",
        290,
        70
    );
}
