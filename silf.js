const silf = {

    x: 400,
    y: 120,

    radius: 20,

    timer: 0,

    spell: 0
};

const enemyBullets = [];

function spawnEnemyBullet(
    x,
    y,
    vx,
    vy,
    radius = 5
){

    enemyBullets.push({

        x,
        y,

        vx,
        vy,

        radius
    });
}

function updateSilf(){

    silf.timer++;

    silf.spell =
        Math.min(
            4,
            Math.floor(
                silf.timer / 720
            )
        );

    switch(
        silf.spell
    ){

        case 0:
            updateOugi1();
            break;

        case 1:
            updateOugi2();
            break;

        case 2:
            updateOugi3();
            break;

        case 3:
            updateOugi4();
            break;

        case 4:
            updateOugi5();
            break;
    }
}

function drawSilf(){

    ctx.fillStyle =
        "white";

    ctx.beginPath();

    ctx.arc(
        silf.x,
        silf.y,
        silf.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "white";

    ctx.font =
        "20px sans-serif";

    const names = [

        "幻風「六華包囲陣」",

        "暴風「テンペストケージ」",

        "裂風「スカイカッター」",

        "風王「エアリアルスパイラル」",

        "天嵐「千風の死角」"
    ];

    ctx.fillText(
        names[silf.spell],
        240,
        40
    );
}

function updateEnemyBullets(){

    for(
        let i =
        enemyBullets.length - 1;
        i >= 0;
        i--
    ){

        const b =
            enemyBullets[i];

        b.x += b.vx;
        b.y += b.vy;

        const dx =
            b.x - player.x;

        const dy =
            b.y - player.y;

        const dist =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if(
            dist <
            player.radius +
            b.radius
        ){

            player.hp = 0;

            return;
        }

        if(
            b.x < -100 ||
            b.x > canvas.width + 100 ||
            b.y < -100 ||
            b.y > canvas.height + 100
        ){

            enemyBullets.splice(
                i,
                1
            );
        }
    }
}

function drawEnemyBullets(){

    ctx.fillStyle =
        "orange";

    enemyBullets.forEach(
        b=>{

            ctx.beginPath();

            ctx.arc(
                b.x,
                b.y,
                b.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );
}
