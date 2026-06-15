alert("chrono.js");

const chrono = {

    x: 400,
    y: 120,

    radius: 20,

    timer: 0,

    spell: 0
};

const chronoBullets = [];

function spawnChronoBullet(
    x,
    y,
    vx,
    vy,
    radius = 5
){

    chronoBullets.push({

        x,
        y,

        vx,
        vy,

        radius
    });
}

function updateChrono(){

    const nextSpell =

        Math.min(
            5,
            Math.floor(
                chrono.timer / 600
            )
        );

    if(
        chrono.spell !==
        nextSpell
    ){

        chronoBullets.length = 0;

        if(
            typeof stoppedBullets !==
            "undefined"
        ){
            stoppedBullets.length = 0;
        }

        if(
            typeof futureMarks !==
            "undefined"
        ){
            futureMarks.length = 0;
        }

        if(
            typeof reverseBullets !==
            "undefined"
        ){
            reverseBullets.length = 0;
        }

        if(
            typeof timeLasers !==
            "undefined"
        ){
            timeLasers.length = 0;
        }

        chrono.spell =
            nextSpell;
    }

    chrono.timer++;

    switch(
        chrono.spell
    ){

        case 0:
            updateChronoOugi1();
            break;

        case 1:
            updateChronoOugi2();
            break;

        case 2:
            updateChronoOugi3();
            break;

        case 3:
            updateChronoOugi4();
            break;

        case 4:
            updateChronoOugi5();
            break;

        case 5:
            updateChronoOugi6();
            break;
    }
}

function drawChrono(){

    ctx.fillStyle =
        "rgb(180,220,255)";

    ctx.beginPath();

    ctx.arc(
        chrono.x,
        chrono.y,
        chrono.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        chrono.x,
        chrono.y,
        chrono.radius + 6,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.fillStyle =
        "white";

    ctx.font =
        "20px sans-serif";

    const names = [

        "時符「停止世界」",

        "未来符「予測線」",

        "因果符「リバース・カタストロフ」",

        "時界「永久機関」",

        "時葬「千年後の残響」",

        "終刻「クロック・ゼロ」"
    ];

    ctx.fillText(

        names[
            chrono.spell
        ],

        180,
        40
    );

    switch(
        chrono.spell
    ){

        case 1:
            drawChronoOugi2();
            break;

        case 4:
            drawChronoOugi5();
            break;

        case 5:
            drawChronoOugi6();
            break;
    }
}

function updateChronoBullets(){

    for(
        let i =
        chronoBullets.length - 1;
        i >= 0;
        i--
    ){

        const b =
            chronoBullets[i];

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
            b.x < -200 ||
            b.x > canvas.width + 200 ||
            b.y < -200 ||
            b.y > canvas.height + 200
        ){

            chronoBullets.splice(
                i,
                1
            );
        }
    }
}

function drawChronoBullets(){

    chronoBullets.forEach(
        b=>{

            ctx.fillStyle =
                "#88ddff";

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
