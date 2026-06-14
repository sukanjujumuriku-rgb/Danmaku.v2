let ougi5Timer = 0;

const blindLasers = [];

function updateOugi5(){

    ougi5Timer++;

    const phase =

        Math.floor(
            ougi5Timer / 90
        ) % 4;

    const local =

        ougi5Timer % 90;

    // 出現位置

    if(
        local === 1
    ){

        switch(
            phase
        ){

            // 上

            case 0:

                silf.x =
                    player.x;

                silf.y =
                    player.y - 180;

                break;

            // 右

            case 1:

                silf.x =
                    player.x + 180;

                silf.y =
                    player.y;

                break;

            // 下

            case 2:

                silf.x =
                    player.x;

                silf.y =
                    player.y + 180;

                break;

            // 左

            case 3:

                silf.x =
                    player.x - 180;

                silf.y =
                    player.y;

                break;
        }

        const angle =

            Math.atan2(

                player.y -
                silf.y,

                player.x -
                silf.x
            );

        blindLasers.push({

            x1:silf.x,
            y1:silf.y,

            x2:
                silf.x +
                Math.cos(angle)
                * 2000,

            y2:
                silf.y +
                Math.sin(angle)
                * 2000,

            timer:0,

            fired:false
        });
    }

    // 更新

    for(
        let i =
        blindLasers.length - 1;
        i >= 0;
        i--
    ){

        const l =
            blindLasers[i];

        l.timer++;

        if(
            l.timer >= 45
        ){

            l.fired = true;
        }

        if(
            l.timer >= 75
        ){

            blindLasers.splice(
                i,
                1
            );
        }
    }

    // 当たり判定

    blindLasers.forEach(
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

function drawOugi5(){

    blindLasers.forEach(
        l=>{

            if(
                !l.fired
            ){

                ctx.strokeStyle =
                    "rgba(0,255,255,0.8)";

                ctx.lineWidth =
                    6;
            }
            else{

                ctx.strokeStyle =
                    "rgba(255,255,255,0.25)";

                ctx.lineWidth =
                    100;

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
                    40;
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
