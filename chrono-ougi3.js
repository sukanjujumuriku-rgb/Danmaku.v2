alert("chrono-ougi3.js");

let chronoOugi3Timer = 0;

let reversePhase = 0;

function updateChronoOugi3(){

    chronoOugi3Timer++;

    chrono.x =
        canvas.width / 2 +
        Math.sin(
            chronoOugi3Timer * 0.015
        ) * 250;

    chrono.y = 120;

    // 発射

    if(
        chronoOugi3Timer % 4 === 0
    ){

        const a =
            chronoOugi3Timer *
            0.08;

        const vx =
            Math.cos(a) * 2.5;

        const vy =
            Math.sin(a) * 2.5;

        chronoBullets.push({

            x: chrono.x,
            y: chrono.y,

            vx,
            vy,

            radius: 6,

            originX:
                chrono.x,

            originY:
                chrono.y,

            reversed:false,

            split:false
        });

        chronoBullets.push({

            x: chrono.x,
            y: chrono.y,

            vx:-vx,
            vy:-vy,

            radius:6,

            originX:
                chrono.x,

            originY:
                chrono.y,

            reversed:false,

            split:false
        });
    }

    const cycle =
        chronoOugi3Timer % 360;

    // 全弾反転

    if(
        cycle === 180
    ){

        reversePhase++;

        chronoBullets.forEach(
            b=>{

                b.vx *= -1;
                b.vy *= -1;

                b.reversed =
                    true;
            }
        );
    }

    // 分裂

    if(
        cycle === 240
    ){

        const add = [];

        chronoBullets.forEach(
            b=>{

                if(
                    b.split
                ){
                    return;
                }

                b.split = true;

                const angle =

                    Math.atan2(
                        b.vy,
                        b.vx
                    );

                const speed =

                    Math.sqrt(
                        b.vx*b.vx +
                        b.vy*b.vy
                    );

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:
                        Math.cos(
                            angle +
                            0.4
                        ) * speed,

                    vy:
                        Math.sin(
                            angle +
                            0.4
                        ) * speed,

                    radius:5,

                    split:true
                });

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:
                        Math.cos(
                            angle -
                            0.4
                        ) * speed,

                    vy:
                        Math.sin(
                            angle -
                            0.4
                        ) * speed,

                    radius:5,

                    split:true
                });
            }
        );

        chronoBullets.push(
            ...add
        );
    }

    // 二回目反転

    if(
        cycle === 300
    ){

        chronoBullets.forEach(
            b=>{

                b.vx *= -1;
                b.vy *= -1;
            }
        );
    }
}

function drawChronoOugi3(){

    ctx.strokeStyle =
        "rgba(255,255,255,0.2)";

    ctx.lineWidth = 2;

    chronoBullets.forEach(
        b=>{

            if(
                b.reversed
            ){

                ctx.beginPath();

                ctx.moveTo(
                    b.x,
                    b.y
                );

                ctx.lineTo(
                    b.originX,
                    b.originY
                );

                ctx.stroke();
            }
        }
    );
}
