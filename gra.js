alert("gra.js");

const gra = {

    x: 400,
    y: 120,

    radius: 24,

    timer: 0,

    spell: 0
};

const graBullets = [];

function spawnGraBullet(
    x,
    y,
    vx,
    vy,
    radius = 6
){

    graBullets.push({

        x,
        y,

        vx,
        vy,

        radius
    });
}

function updateGra(){

    const nextSpell =

        Math.min(
            5,
            Math.floor(
                gra.timer / 600
            )
        );

    if(
        gra.spell !==
        nextSpell
    ){

        graBullets.length = 0;

        gra.spell =
            nextSpell;

        if(
            typeof graOugi1Timer !==
            "undefined"
        ){
            graOugi1Timer = 0;
        }

        if(
            typeof graOugi2Timer !==
            "undefined"
        ){
            graOugi2Timer = 0;
        }

        if(
            typeof graOugi3Timer !==
            "undefined"
        ){
            graOugi3Timer = 0;
        }

        if(
            typeof graOugi4Timer !==
            "undefined"
        ){
            graOugi4Timer = 0;
        }

        if(
            typeof graOugi5Timer !==
            "undefined"
        ){
            graOugi5Timer = 0;
        }

        if(
            typeof graOugi6Timer !==
            "undefined"
        ){
            graOugi6Timer = 0;
        }
    }

    gra.timer++;

    switch(
        gra.spell
    ){

        case 0:

            updateGraOugi1();

            break;

        case 1:

            updateGraOugi2();

            break;

        case 2:

            updateGraOugi3();

            break;

        case 3:

            updateGraOugi4();

            break;

        case 4:

            updateGraOugi5();

            break;

        case 5:

            updateGraOugi6();

            break;
    }
}

function drawGra(){

    ctx.fillStyle =
        "rgb(80,60,140)";

    ctx.beginPath();

    ctx.arc(
        gra.x,
        gra.y,
        gra.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        gra.x,
        gra.y,
        gra.radius + 8,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "20px sans-serif";

    const names = [

        "重符「ブラックホール」",

        "歪界「グラビティレンズ」",

        "星落「メテオストーム」",

        "崩壊「イベントホライズン」",

        "超重「銀河圧縮」",

        "終極「ビッグクランチ」"
    ];

    ctx.fillText(

        names[
            gra.spell
        ],

        180,
        40
    );

    switch(
        gra.spell
    ){

        case 3:

            drawGraOugi4();

            break;

        case 5:

            drawGraOugi6();

            break;
    }
}

function updateGraBullets(){

    for(
        let i =
        graBullets.length - 1;
        i >= 0;
        i--
    ){

        const b =
            graBullets[i];

        b.x += b.vx;
        b.y += b.vy;

        const dx =
            b.x -
            player.x;

        const dy =
            b.y -
            player.y;

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

            if(
                !player.debug
            ){

                player.hp = 0;
            }
        }

        if(
            b.x < -300 ||
            b.x >
            canvas.width + 300 ||
            b.y < -300 ||
            b.y >
            canvas.height + 300
        ){

            graBullets.splice(
                i,
                1
            );
        }
    }
}

function drawGraBullets(){

    graBullets.forEach(
        b=>{

            ctx.fillStyle =
                "#aa88ff";

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
