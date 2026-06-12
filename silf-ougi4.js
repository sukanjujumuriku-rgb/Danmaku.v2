let ougi4Timer = 0;

let spiralAngle = 0;

function updateOugi4(){

    ougi4Timer++;

    if(
        ougi4Timer % 2 === 0
    ){

        spiralAngle += 0.12;

        const reverse =

            Math.floor(
                ougi4Timer / 240
            ) % 2

            ? -1
            : 1;

        for(
            let k=0;
            k<4;
            k++
        ){

            const a =

                spiralAngle *
                reverse

                +

                Math.PI/2*k;

            const vx =
                Math.cos(a)*3;

            const vy =
                Math.sin(a)*3;

            spawnEnemyBullet(
                silf.x,
                silf.y,
                vx,
                vy,
                5
            );
        }
    }

    // 分裂

    if(
        ougi4Timer % 120 === 0
    ){

        const add = [];

        enemyBullets.forEach(
            b=>{

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:
                        b.vx + 1,

                    vy:
                        b.vy + 1,

                    radius:4
                });

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:
                        b.vx - 1,

                    vy:
                        b.vy - 1,

                    radius:4
                });
            }
        );

        enemyBullets.push(
            ...add
        );
    }
}

function drawOugi4(){

    // 特に描画なし
}
