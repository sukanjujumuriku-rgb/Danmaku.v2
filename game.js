alert("game.js");

const canvas =
    document.getElementById(
        "game"
    );

const ctx =
    canvas.getContext(
        "2d"
    );

const keys = {};

let fCount = 0;
let fTimer = 0;

// 0=シルフ
// 1=クロノア

let bossPhase = 0;

// シルフ90秒

let timer = 5400;

// 開始3秒猶予

let startDelay = 180;

document.addEventListener(
    "keydown",
    e=>{

        if(
            e.code==="Space" ||
            e.code==="KeyW" ||
            e.code==="KeyA" ||
            e.code==="KeyS" ||
            e.code==="KeyD"
        ){
            e.preventDefault();
        }

        keys[e.code] = true;

        if(
            e.code==="KeyF"
        ){

            if(
                fTimer <= 0
            ){

                fCount = 0;
            }

            fCount++;

            fTimer = 60;

            if(
                fCount >= 3
            ){

                player.debug =
                    !player.debug;

                fCount = 0;

                fTimer = 0;

                console.log(
                    "DEBUG:",
                    player.debug
                );
            }
        }
    }
);

document.addEventListener(
    "keyup",
    e=>{

        keys[e.code] = false;
    }
);

function drawUI(){

    ctx.fillStyle =
        "white";

    ctx.font =
        "24px sans-serif";

    ctx.fillText(
        "SURVIVAL RUSH",
        20,
        40
    );

    ctx.fillText(

        bossPhase === 0
        ? "SILF"
        : "CHRONOA",

        20,
        80
    );

    ctx.fillText(

        Math.ceil(
            timer / 60
        ) + "s",

        700,
        40
    );

    if(
        player.debug
    ){

        ctx.fillStyle =
            "lime";

        ctx.fillText(
            "DEBUG",
            20,
            120
        );
    }
}

function gameLoop(){

    if(
        fTimer > 0
    ){

        fTimer--;

        if(
            fTimer <= 0
        ){

            fCount = 0;
        }
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 開始猶予

    if(
        startDelay > 0
    ){

        startDelay--;

        drawPlayer();

        if(
            bossPhase === 0
        ){

            drawSilf();
        }
        else{

            drawChrono();
        }

        drawUI();

        ctx.fillStyle =
            "yellow";

        ctx.font =
            "72px sans-serif";

        ctx.fillText(

            Math.ceil(
                startDelay / 60
            ),

            380,

            320
        );

        requestAnimationFrame(
            gameLoop
        );

        return;
    }

    updatePlayer();

    if(
        bossPhase === 0
    ){

        updateSilf();

        updateEnemyBullets();
    }
    else{

        updateChrono();

        updateChronoBullets();
    }

    drawPlayer();

    if(
        bossPhase === 0
    ){

        drawSilf();

        drawEnemyBullets();
    }
    else{

        drawChrono();

        drawChronoBullets();
    }

    drawUI();

    timer--;

    // シルフ終了

    if(
        bossPhase === 0 &&
        timer <= 0
    ){

        bossPhase = 1;

        timer = 5400;

        startDelay = 180;

        enemyBullets.length = 0;

        player.x = 400;
        player.y = 500;

        requestAnimationFrame(
            gameLoop
        );

        return;
    }

    // GAME OVER

    if(
        player.hp <= 0
    ){

        ctx.fillStyle =
            "red";

        ctx.font =
            "64px sans-serif";

        ctx.fillText(
            "GAME OVER",
            130,
            320
        );

        return;
    }

    // CLEAR

    if(
        bossPhase === 1 &&
        timer <= 0
    ){

        ctx.fillStyle =
            "lime";

        ctx.font =
            "64px sans-serif";

        ctx.fillText(
            "CLEAR",
            250,
            320
        );

        return;
    }

    requestAnimationFrame(
        gameLoop
    );
}

gameLoop();
