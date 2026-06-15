alert("chrono-ougi2.js");

let chronoOugi2Timer = 0;

const futureMarks = [];

function updateChronoOugi2(){

    chronoOugi2Timer++;

    chrono.x =
        canvas.width / 2 +
        Math.sin(
            chronoOugi2Timer * 0.02
        ) * 220;

    chrono.y =
        120;

    // 120fごとに予測

    if(
        chronoOugi2Timer % 120 === 1
    ){

        const futureX =
            player.x +
            (
                player.x -
                (player.prevX ?? player.x)
            ) * 180;

        const futureY =
            player.y +
            (
                player.y -
                (player.prevY ?? player.y)
            ) * 180;

        futureMarks.push({

            x: futureX,

            y: futureY,

            timer: 0,

            fired: false
        });
    }

    for(
        let i =
        futureMarks.length - 1;
        i >= 0;
        i--
    ){

        const m =
            futureMarks[i];

        m.timer++;

        // レーザー発射

        if(
            m.timer === 90
        ){

            m.fired = true;

            // 十字レーザー

            for(
                let j = 0;
                j < canvas.width;
                j += 18
            ){

                spawnChronoBullet(
                    j,
                    m.y,
                    0,
                    0,
                    10
                );
            }

            for(
                let j = 0;
                j < canvas.height;
                j += 18
            ){

                spawnChronoBullet(
                    m.x,
                    j,
                    0,
                    0,
                    10
                );
            }

            // 円形弾幕

            for(
                let k = 0;
                k < 48;
                k++
            ){

                const a =
                    Math.PI * 2 /
                    48 * k;

                spawnChronoBullet(

                    m.x,

                    m.y,

                    Math.cos(a) * 3,

                    Math.sin(a) * 3,

                    6
                );
            }
        }

        if(
            m.timer > 150
        ){

            futureMarks.splice(
                i,
                1
            );
        }
    }
}

function drawChronoOugi2(){

    futureMarks.forEach(
        m=>{

            if(
                !m.fired
            ){

                const size =

                    20 +

                    m.timer * 0.8;

                ctx.strokeStyle =
                    "rgba(0,255,255,0.8)";

                ctx.lineWidth =
                    3;

                ctx.beginPath();

                ctx.arc(
                    m.x,
                    m.y,
                    size,
                    0,
                    Math.PI * 2
                );

                ctx.stroke();

                // 十字予告

                ctx.beginPath();

                ctx.moveTo(
                    m.x - 40,
                    m.y
                );

                ctx.lineTo(
                    m.x + 40,
                    m.y
                );

                ctx.stroke();

                ctx.beginPath();

                ctx.moveTo(
                    m.x,
                    m.y - 40
                );

                ctx.lineTo(
                    m.x,
                    m.y + 40
                );

                ctx.stroke();
            }
            else{

                ctx.strokeStyle =
                    "rgba(255,255,255,0.25)";

                ctx.lineWidth =
                    120;

                ctx.beginPath();

                ctx.moveTo(
                    0,
                    m.y
                );

                ctx.lineTo(
                    canvas.width,
                    m.y
                );

                ctx.stroke();

                ctx.beginPath();

                ctx.moveTo(
                    m.x,
                    0
                );

                ctx.lineTo(
                    m.x,
                    canvas.height
                );

                ctx.stroke();

                ctx.strokeStyle =
                    "white";

                ctx.lineWidth =
                    40;

                ctx.beginPath();

                ctx.moveTo(
                    0,
                    m.y
                );

                ctx.lineTo(
                    canvas.width,
                    m.y
                );

                ctx.stroke();

                ctx.beginPath();

                ctx.moveTo(
                    m.x,
                    0
                );

                ctx.lineTo(
                    m.x,
                    canvas.height
                );

                ctx.stroke();
            }
        }
    );
}
