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
// 2=グラヴィス

let bossPhase = 0;

// 各ボス90秒

let timer = 5400;

// 開始猶予3秒

let startDelay = 180;

const bossNames = [

    "SILF",

    "CHRONOA",

    "GRAVIS"
];

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

        bossNames[
            bossPhase
        ],

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

    ctx.fillText(

        "HP: " +
        player.hp,

        20,
        120
    );

    if(
        player.debug
    ){

        ctx.fillStyle =
            "lime";

        ctx.fillText(
            "DEBUG",
            20,
            160
        );
    }
}

function resetBossData(){

    if(
        typeof enemyBullets !==
        "undefined"
    ){
        enemyBullets.length = 0;
    }

    if(
        typeof chronoBullets !==
        "undefined"
    ){
        chronoBullets.length = 0;
    }

    if(
        typeof graBullets !==
        "undefined"
    ){
        graBullets.length = 0;
    }

    player.reverseControl =
        false;

    player.gravitySlow =
        1;

    player.x = 400;
    player.y = 500;
}

function updateCurrentBoss(){

    switch(
        bossPhase
    ){

        case 0:

            updateSilf();

            updateEnemyBullets();

            break;

        case 1:

            updateChrono();

            updateChronoBullets();

            break;

        case 2:

            updateGra();

            updateGraBullets();

            break;
    }
}

function drawCurrentBoss(){

    switch(
        bossPhase
    ){

        case 0:

            drawSilf();

            drawEnemyBullets();

            break;

        case 1:

            drawChrono();

            drawChronoBullets();

            break;

        case 2:

            drawGra();

            drawGraBullets();

            break;
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

    // 開始カウント

    if(
        startDelay > 0
    ){

        startDelay--;

        drawPlayer();

        switch(
            bossPhase
        ){

            case 0:
                drawSilf();
                break;

            case 1:
                drawChrono();
                break;

            case 2:
                drawGra();
                break;
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

    updateCurrentBoss();

    drawPlayer();

    drawCurrentBoss();

    drawUI();

    timer--;

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

    // ボス切替

    if(
        timer <= 0
    ){

        if(
            bossPhase < 2
        ){

            bossPhase++;

            timer = 5400;

            startDelay = 180;

            resetBossData();

            requestAnimationFrame(
                gameLoop
            );

            return;
        }

        // 全ボス撃破

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
