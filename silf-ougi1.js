let ougi1Timer = 0;

function updateOugi1(){

    ougi1Timer++;

    // 2秒ごとに発動

    if(
        ougi1Timer % 120 === 1
    ){

        const r = 200;

        for(
            let i = 0;
            i < 6;
            i++
        ){

            const cx =
                player.x +
                Math.cos(
                    Math.PI * 2 / 6 * i
                ) * r;

            const cy =
                player.y +
                Math.sin(
                    Math.PI * 2 / 6 * i
                ) * r;

            // 32Way

            for(
                let j = 0;
                j < 16;
                j++
            ){

                const a =
                    Math.PI * 2 / 32 * j;

                spawnEnemyBullet(
                    cx,
                    cy,
                    Math.cos(a) * 2,
                    Math.sin(a) * 2,
                    4
                );
            }
        }
    }

    // 停止→収束

    enemyBullets.forEach(
        b=>{

            if(
                ougi1Timer % 120 > 40 &&
                ougi1Timer % 120 < 80
            ){

                b.vx *= 0.95;
                b.vy *= 0.95;
            }

            if(
                ougi1Timer % 120 === 80
            ){

                const dx =
                    player.x - b.x;

                const dy =
                    player.y - b.y;

                const len =
                    Math.sqrt(
                        dx*dx +
                        dy*dy
                    ) || 1;

                b.vx =
                    dx / len * 4;

                b.vy =
                    dy / len * 4;
            }
        }
    );
}
