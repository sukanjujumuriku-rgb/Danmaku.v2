let ougi2Timer = 0;

function updateOugi2(){

    ougi2Timer++;

    // ケージ生成

    if(
        ougi2Timer % 90 === 1
    ){

        const r = 260;

        for(
            let i = 0;
            i < 72;
            i++
        ){

            const a =
                Math.PI * 2 / 72 * i;

            spawnEnemyBullet(

                canvas.width / 2 +
                Math.cos(a) * r,

                canvas.height / 2 +
                Math.sin(a) * r,

                -Math.cos(a) * 0.8,

                -Math.sin(a) * 0.8,

                5
            );
        }
    }

    // 回転

    enemyBullets.forEach(
        b=>{

            const dx =
                b.x -
                canvas.width / 2;

            const dy =
                b.y -
                canvas.height / 2;

            const tx =
                -dy * 0.002;

            const ty =
                dx * 0.002;

            b.vx += tx;
            b.vy += ty;
        }
    );

    // 分裂

    if(
        ougi2Timer % 180 === 0
    ){

        const add = [];

        enemyBullets.forEach(
            b=>{

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:b.vx + 1,
                    vy:b.vy,

                    radius:4
                });

                add.push({

                    x:b.x,
                    y:b.y,

                    vx:b.vx - 1,
                    vy:b.vy,

                    radius:4
                });
            }
        );

        enemyBullets.push(
            ...add
        );
    }
}
