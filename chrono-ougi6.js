alert("chrono-ougi6.js");

let chronoOugi6Timer = 0;

let clockPhase = 0;

let countdown = 3;

function updateChronoOugi6(){

    chronoOugi6Timer++;

    chrono.x =
        canvas.width / 2;

    chrono.y =
        120;

    // Phase0
    // 時間停止前の弾幕

    if(
        clockPhase === 0
    ){

        if(
            chronoOugi6Timer % 4 === 0
        ){

            const rot =
                chronoOugi6Timer * 0.05;

            for(
                let i = 0;
                i < 16;
                i++
            ){

                const a =
                    rot +
                    Math.PI * 2 / 16 * i;

                spawnChronoBullet(

                    chrono.x,

                    chrono.y,

                    Math.cos(a) * 2,

                    Math.sin(a) * 2,

                    6
                );
            }
        }

        if(
            chronoOugi6Timer >= 180
        ){

            clockPhase = 1;

            chronoOugi6Timer = 0;

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
    }

    // Phase1
    // カウントダウン

    else if(
        clockPhase === 1
    ){

        if(
            chronoOugi6Timer >= 60
        ){

            chronoOugi6Timer = 0;

            countdown--;

            if(
                countdown <= 0
            ){

                clockPhase = 2;

                chronoBullets.forEach(
                    b=>{

                        b.vx =
                            b.savedVx * 4;

                        b.vy =
                            b.savedVy * 4;
                    }
                );
            }
        }
    }

    // Phase2
    // 超加速

    else if(
        clockPhase === 2
    ){

        if(
            chronoOugi6Timer >= 180
        ){

            clockPhase = 3;

            chronoOugi6Timer = 0;
        }
    }

    // Phase3
    // 中央収束

    else if(
        clockPhase === 3
    ){

        chronoBullets.forEach(
            b=>{

                const dx =
                    canvas.width / 2
                    - b.x;

                const dy =
                    canvas.height / 2
                    - b.y;

                const len =
                    Math.hypot(
                        dx,
                        dy
                    );

                if(
                    len > 0
                ){

                    b.vx =
                        dx / len * 4;

                    b.vy =
                        dy / len * 4;
                }
            }
        );

        if(
            chronoOugi6Timer >= 120
        ){

            chronoBullets.length = 0;

            clockPhase = 4;

            chronoOugi6Timer = 0;
        }
    }

    // Phase4
    // 終焉螺旋

    else if(
        clockPhase === 4
    ){

        if(
            chronoOugi6Timer % 2 === 0
        ){

            const rot =
                chronoOugi6Timer * 0.25;

            for(
                let ring = 0;
                ring < 3;
                ring++
            ){

                const a =

                    rot +

                    ring *

                    Math.PI * 2 / 3;

                spawnChronoBullet(

                    canvas.width / 2,

                    canvas.height / 2,

                    Math.cos(a) * 8,

                    Math.sin(a) * 8,

                    8
                );

                spawnChronoBullet(

                    canvas.width / 2,

                    canvas.height / 2,

                    Math.cos(
                        a + Math.PI
                    ) * 8,

                    Math.sin(
                        a + Math.PI
                    ) * 8,

                    8
                );
            }
        }
    }
}

function drawChronoOugi6(){

    // カウントダウン

    if(
        clockPhase === 1
    ){

        ctx.fillStyle =
            "white";

        ctx.font =
            "140px sans-serif";

        ctx.textAlign =
            "center";

        ctx.fillText(

            countdown,

            canvas.width / 2,

            canvas.height / 2
        );
    }

    // 中央収束演出

    if(
        clockPhase >= 3
    ){

        ctx.strokeStyle =
            "rgba(255,255,255,0.25)";

        ctx.lineWidth =
            80;

        ctx.beginPath();

        ctx.arc(

            canvas.width / 2,

            canvas.height / 2,

            70,

            0,

            Math.PI * 2
        );

        ctx.stroke();

        ctx.strokeStyle =
            "white";

        ctx.lineWidth =
            20;

        ctx.beginPath();

        ctx.arc(

            canvas.width / 2,

            canvas.height / 2,

            70,

            0,

            Math.PI * 2
        );

        ctx.stroke();
    }
}
