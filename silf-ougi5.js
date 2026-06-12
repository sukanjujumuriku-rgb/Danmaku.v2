let ougi5Timer = 0;

function updateOugi5(){

    ougi5Timer++;

    const cycle =
        ougi5Timer % 180;

    // 後ろ

    if(cycle === 1){

        silf.x =
            player.x;

        silf.y =
            player.y + 160;

        fireBlindSpot();
    }

    // 左

    if(cycle === 60){

        silf.x =
            player.x - 160;

        silf.y =
            player.y;

        fireBlindSpot();
    }

    // 右

    if(cycle === 120){

        silf.x =
            player.x + 160;

        silf.y =
            player.y;

        fireBlindSpot();
    }

    // 弾を曲げる

    enemyBullets.forEach(
        b=>{

            if(
                b.curve
            ){

                b.angle +=
                    b.turn;

                const speed =

                    Math.sqrt(
                        b.vx*b.vx +
                        b.vy*b.vy
                    );

                b.vx =
                    Math.cos(
                        b.angle
                    ) * speed;

                b.vy =
                    Math.sin(
                        b.angle
                    ) * speed;
            }
        }
    );
}

function fireBlindSpot(){

    const base =

        Math.atan2(
            player.y - silf.y,
            player.x - silf.x
        );

    for(
        let i=-8;
        i<=8;
        i++
    ){

        const a =
            base +
            i * 0.12;

        enemyBullets.push({

            x:silf.x,
            y:silf.y,

            vx:
                Math.cos(a) * 5,

            vy:
                Math.sin(a) * 5,

            radius:5,

            curve:true,

            angle:a,

            turn:
                (Math.random()-0.5)
                * 0.02
        });
    }
}

function drawOugi5(){

}
