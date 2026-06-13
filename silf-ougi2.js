let ougi2Timer = 0;

function updateOugi2(){

    ougi2Timer++;

    // 前回のリング削除

    for(
        let i =
        enemyBullets.length - 1;
        i >= 0;
        i--
    ){

        if(
            enemyBullets[i].spell === 2
        ){

            enemyBullets.splice(
                i,
                1
            );
        }
    }

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;

    // 半径80〜280を往復

    const r =

        180 +

        Math.sin(
            ougi2Timer * 0.03
        ) * 100;

    for(
        let i = 0;
        i < 72;
        i++
    ){

        // 北

        if(
            i >= 69 ||
            i <= 3
        ){
            continue;
        }

        // 東

        if(
            i >= 15 &&
            i <= 21
        ){
            continue;
        }

        // 南

        if(
            i >= 33 &&
            i <= 39
        ){
            continue;
        }

        // 西

        if(
            i >= 51 &&
            i <= 57
        ){
            continue;
        }

        const a =

            Math.PI * 2 / 72 * i

            +

            ougi2Timer * 0.01;

        enemyBullets.push({

            x:
                centerX +
                Math.cos(a) * r,

            y:
                centerY +
                Math.sin(a) * r,

            vx:0,

            vy:0,

            radius:6,

            spell:2
        });
    }
}
