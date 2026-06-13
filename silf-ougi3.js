let ougi3Timer = 0;

const lasers = [];

function addLaser(
    x1,
    y1,
    x2,
    y2
){

    lasers.push({

        x1,
        y1,

        x2,
        y2,

        timer:0,

        fired:false
    });
}

function updateOugi3(){

    ougi3Timer++;

    // 中央縦

    if(
        ougi3Timer === 1
    ){

        addLaser(
            canvas.width/2,
            0,
            canvas.width/2,
            canvas.height
        );
    }

    // 左右縦

    if(
        ougi3Timer === 180
    ){

        addLaser(
            120,
            0,
            120,
            canvas.height
        );

        addLaser(
            canvas.width-120,
            0,
            canvas.width-120,
            canvas.height
        );
    }

    // 中央横

    if(
        ougi3Timer === 360
    ){

        addLaser(
            0,
            canvas.height/2,
            canvas.width,
            canvas.height/2
        );
    }

    // 上下横

    if(
        ougi3Timer === 540
    ){

        addLaser(
            0,
            120,
            canvas.width,
            120
        );

        addLaser(
            0,
            canvas.height-120,
            canvas.width,
            canvas.height-120
        );
    }

    // 空裂乱舞

    if(
        ougi3Timer >= 720 &&
        ougi3Timer % 10 === 0
    ){

        for(
            let i = 0;
            i < 6;
            i++
        ){

            const cx =
                Math.random() *
                canvas.width;

            const cy =
                Math.random() *
                canvas.height;

            const angle =
                Math.random() *
                Math.PI * 2;

            addLaser(

                cx -
                Math.cos(angle) * 1500,

                cy -
                Math.sin(angle) * 1500,

                cx +
                Math.cos(angle) * 1500,

                cy +
                Math.sin(angle) * 1500
            );
        }
    }

    // 更新

    for(
        let i =
        lasers.length - 1;
        i >= 0;
        i--
    ){

        const l =
            lasers[i];

        l.timer++;

        if(
            l.timer >= 60
        ){

            l.fired = true;
        }

        if(
            l.timer >= 90
        ){

            lasers.splice(
                i,
                1
            );
        }
    }

    // 当たり判定

    lasers.forEach(
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
                l.x2*l.y1 -
                l.x1*l.y2;

            const dist =

                Math.abs(
                    A*player.x +
                    B*player.y +
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
                30
            ){

                player.hp = 0;
            }
        }
    );
}

function drawOugi3(){

    lasers.forEach(
        l=>{

            if(
                !l.fired
            ){

                ctx.strokeStyle =
                    "rgba(0,255,255,0.7)";

                ctx.lineWidth = 6;
            }
            else{

                // 外側

                ctx.strokeStyle =
                    "rgba(255,255,255,0.25)";

                ctx.lineWidth = 90;

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

                // 内側

                ctx.strokeStyle =
                    "white";

                ctx.lineWidth = 40;
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
