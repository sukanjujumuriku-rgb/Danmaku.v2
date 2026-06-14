let ougi6Timer = 0;

const finalLasers = [];

function addFinalLaser(
    x1,
    y1,
    x2,
    y2,
    life = 90
){

    finalLasers.push({

        x1,
        y1,

        x2,
        y2,

        timer:0,

        life,

        fired:false
    });
}

function updateOugi6(){

    ougi6Timer++;

    silf.x =
        canvas.width / 2;

    silf.y =
        120;

    // 六角形生成

    if(
        ougi6Timer % 180 === 1
    ){

        const points = [];

        const rot =
            ougi6Timer * 0.02;

        for(
            let i = 0;
            i < 6;
            i++
        ){

            const a =

                rot +

                Math.PI * 2 / 6 * i;

            points.push({

                x:
                    player.x +
                    Math.cos(a) * 170,

                y:
                    player.y +
                    Math.sin(a) * 170
            });
        }

        for(
            let i = 0;
            i < 6;
            i++
        ){

            const p1 =
                points[i];

            const p2 =
                points[
                    (i + 1) % 6
                ];

            addFinalLaser(

                p1.x,
                p1.y,

                p2.x,
                p2.y,

                120
            );
        }
    }

    // 千風の死角ビーム

    if(
        ougi6Timer > 90 &&
        ougi6Timer % 30 === 0
    ){

        const side =

            Math.floor(
                Math.random() * 4
            );

        let sx;
        let sy;

        switch(
            side
        ){

            case 0:

                sx =
                    player.x;

                sy =
                    player.y - 220;

                break;

            case 1:

                sx =
                    player.x + 220;

                sy =
                    player.y;

                break;

            case 2:

                sx =
                    player.x;

                sy =
                    player.y + 220;

                break;

            default:

                sx =
                    player.x - 220;

                sy =
                    player.y;
        }

        const angle =

            Math.atan2(

                player.y - sy,

                player.x - sx
            );

        addFinalLaser(

            sx,
            sy,

            sx +
            Math.cos(angle)
            * 2000,

            sy +
            Math.sin(angle)
            * 2000,

            70
        );
    }

    // 更新

    for(
        let i =
        finalLasers.length - 1;
        i >= 0;
        i--
    ){

        const l =
            finalLasers[i];

        l.timer++;

        if(
            l.timer >= 40
        ){

            l.fired = true;
        }

        if(
            l.timer >=
            l.life
        ){

            finalLasers.splice(
                i,
                1
            );
        }
    }

    // 当たり判定

    finalLasers.forEach(
        l=>{

            if(
                !l.fired
            ){
                return;
            }

            const A =
                l.y2 - l.y1;

            const B =
                l.x1 - l.x2;

            const C =

                l.x2 * l.y1 -

                l.x1 * l.y2;

            const dist =

                Math.abs(

                    A * player.x +

                    B * player.y +

                    C
                )

                /

                Math.sqrt(
                    A*A +
                    B*B
                );

            if(
                dist <
                player.radius +
                35
            ){

                if(
                    !player.debug
                ){

                    player.hp = 0;
                }
            }
        }
    );
}

function drawOugi6(){

    finalLasers.forEach(
        l=>{

            if(
                !l.fired
            ){

                ctx.strokeStyle =
                    "rgba(0,255,255,0.8)";

                ctx.lineWidth =
                    5;
            }
            else{

                ctx.strokeStyle =
                    "rgba(255,255,255,0.25)";

                ctx.lineWidth =
                    90;

                ctx.beginPath();

                ctx.moveTo(
                    l.x1,
                    l.y1
                );

                ctx.lineTo(
                    l.x2,
                    l.y2
                );

                ctx.stroke();

                ctx.strokeStyle =
                    "white";

                ctx.lineWidth =
                    35;
            }

            ctx.beginPath();

            ctx.moveTo(
                l.x1,
                l.y1
            );

            ctx.lineTo(
                l.x2,
                l.y2
            );

            ctx.stroke();
        }
    );
}
