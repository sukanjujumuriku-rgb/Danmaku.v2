let ougi3Timer = 0;

const skyCutters = [];

function updateOugi3(){

    ougi3Timer++;

    // 1.5秒ごと

    if(
        ougi3Timer % 90 === 1
    ){

        const x1 =
            Math.random() *
            canvas.width;

        const y1 = 0;

        const x2 =
            Math.random() *
            canvas.width;

        const y2 =
            canvas.height;

        skyCutters.push({

            x1,
            y1,

            x2,
            y2,

            timer:0,

            fired:false
        });
    }

    for(
        let i =
        skyCutters.length-1;
        i>=0;
        i--
    ){

        const c =
            skyCutters[i];

        c.timer++;

        // 予告から60f後発射

        if(
            c.timer === 60 &&
            !c.fired
        ){

            c.fired = true;

            const angle =
                Math.atan2(
                    c.y2-c.y1,
                    c.x2-c.x1
                );

            for(
                let j=0;
                j<120;
                j++
            ){

                spawnEnemyBullet(

                    c.x1 +
                    Math.cos(angle)*j*8,

                    c.y1 +
                    Math.sin(angle)*j*8,

                    Math.cos(angle)*5,

                    Math.sin(angle)*5,

                    8
                );
            }
        }

        if(
            c.timer > 120
        ){

            skyCutters.splice(
                i,
                1
            );
        }
    }
}

function drawOugi3(){

    skyCutters.forEach(
        c=>{

            if(!c.fired){

                ctx.strokeStyle =
                    "rgba(0,255,255,0.6)";

                ctx.lineWidth = 3;

                ctx.beginPath();

                ctx.moveTo(
                    c.x1,
                    c.y1
                );

                ctx.lineTo(
                    c.x2,
                    c.y2
                );

                ctx.stroke();
            }
        }
    );
}
