const canvas =
    document.getElementById(
        "game"
    );

const ctx =
    canvas.getContext(
        "2d"
    );

const keys = {};

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

        keys[e.code]=true;
    }
);

document.addEventListener(
    "keyup",
    e=>{

        keys[e.code]=false;
    }
);

let timer =
    60 * 60;

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
        "STAGE 1",
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
}

function gameLoop(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    updatePlayer();

    updateSilf();

    updateEnemyBullets();

    drawPlayer();

    drawSilf();

    drawEnemyBullets();

    drawUI();

    timer--;

    if(
        player.hp <= 0
    ){

        ctx.fillStyle =
            "red";

        ctx.font =
            "64px sans-serif";

        ctx.fillText(
            "GAME OVER",
            150,
            320
        );

        return;
    }

    if(
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
