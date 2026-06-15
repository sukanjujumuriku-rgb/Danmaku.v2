let ougi4Timer = 0;

function updateOugi4(){

    ougi4Timer++;

    silf.x =
        canvas.width / 2;

    silf.y =
        150;

    let rot = 0.04;

    if(
        ougi4Timer > 300
    ){
        rot = -0.04;
    }

    if(
        ougi4Timer > 500
    ){
        rot = 0.1;
    }

    if(
        ougi4Timer % 3 === 0
    ){

        const base =

            ougi4Timer *
            rot;

        for(
            let i=0;
            i<3;
            i++
        ){

            const a =

                base +

                Math.PI * 2 / 3 * i;

            spawnEnemyBullet(

                silf.x,

                silf.y,

                Math.cos(a) * 3,

                Math.sin(a) * 3,

                7
            );
        }
    }
}
