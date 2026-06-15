alert("chrono-ougi1.js");

let chronoOugi1Timer = 0;

let stopPhase = false;

function updateChronoOugi1(){

    chronoOugi1Timer++;

    chrono.x =
        canvas.width / 2;

    chrono.y =
        120;

    // 弾生成

    if(
        chronoOugi1Timer % 6 === 0 &&
        !stopPhase
    ){

        const base =
            chronoOugi1Timer * 0.05;

        for(
            let i = 0;
            i < 12;
            i++
        ){

            const a =

                base +

                Math.PI * 2 / 12
                * i;

            spawnChronoBullet(

                chrono.x,

                chrono.y,

                Math.cos(a) * 2,

                Math.sin(a) * 2,

                6
            );
        }
    }

    const cycle =

        chronoOugi1Timer %
        360;

    // 停止開始

    if(
        cycle === 120
    ){

        stopPhase = true;

        chronoBullets.forEach(
            b=>{

                b.savedVx =
                    b.vx;

                b.savedVy =
                    b.vy;

                b.vx = 0;
                b.vy = 0;
            }
        );
    }

    // 再始動

    if(
        cycle === 240
    ){

        stopPhase = false;

        chronoBullets.forEach(
            b=>{

                b.vx =
                    b.savedVx * 3;

                b.vy =
                    b.savedVy * 3;
            }
        );
    }

    // 二回目停止

    if(
        cycle === 300
    ){

        chronoBullets.forEach(
            b=>{

                b.savedVx =
                    b.vx;

                b.savedVy =
                    b.vy;

                b.vx = 0;
                b.vy = 0;
            }
        );
    }

    // 二回目再始動

    if(
        cycle === 340
    ){

        chronoBullets.forEach(
            b=>{

                b.vx =
                    b.savedVx * 2;

                b.vy =
                    b.savedVy * 2;
            }
        );
    }
}

function drawChronoOugi1(){

    if(
        stopPhase
    ){

        ctx.strokeStyle =
            "cyan";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.arc(

            chrono.x,

            chrono.y,

            40,

            0,

            Math.PI * 2
        );

        ctx.stroke();
    }
}
