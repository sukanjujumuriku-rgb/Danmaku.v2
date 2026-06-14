let ougi4Timer = 0;

function updateOugi4(){

    ougi4Timer++;

    silf.x =
        canvas.width / 2;

    silf.y =
        150;

    let rotSpeed = 0;

    const cycle =
        ougi4Timer % 360;

    // 正転

    if(
        cycle < 120
    ){

        rotSpeed = 0.08;
    }

    // 停止

    else if(
        cycle < 180
    ){

        rotSpeed = 0;
    }

    // 逆転

    else if(
        cycle < 300
    ){

        rotSpeed = -0.08;
    }

    // 超加速

    else{

        rotSpeed = 0.25;
    }

    if(
        ougi4Timer % 2 === 0
    ){

        const base =

            ougi4Timer *
            rotSpeed;

        for(
            let ring = 0;
            ring < 3;
            ring++
        ){

            const angle =

                base +

                ring *

                Math.PI * 2 / 3;

            spawnEnemyBullet(

                silf.x,

                silf.y,

                Math.cos(angle) * 3,

                Math.sin(angle) * 3,

                6
            );

            spawnEnemyBullet(

                silf.x,

                silf.y,

                Math.cos(
                    angle +
                    Math.PI
                ) * 3,

                Math.sin(
                    angle +
                    Math.PI
                ) * 3,

                6
            );
        }
    }

    // 停止直前にリング生成

    if(
        cycle === 118 ||
        cycle === 298
    ){

        for(
            let i = 0;
            i < 36;
            i++
        ){

            const a =

                Math.PI * 2 / 36
                * i;

            spawnEnemyBullet(

                silf.x,

                silf.y,

                Math.cos(a) * 2,

                Math.sin(a) * 2,

                8
            );
        }
    }
}

function drawOugi4(){

    ctx.strokeStyle =
        "rgba(255,255,255,0.3)";

    ctx.lineWidth = 40;

    ctx.beginPath();

    ctx.arc(

        silf.x,

        silf.y,

        40,

        0,

        Math.PI * 2
    );

    ctx.stroke();
}
