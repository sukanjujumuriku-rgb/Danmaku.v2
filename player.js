alert("player.js");

const player = {

    x:400,
    y:500,

    prevX:400,
    prevY:500,

    speed:5,

    radius:8,

    hp:3,

    debug:false
};

function updatePlayer(){

    player.prevX =
        player.x;

    player.prevY =
        player.y;

    if(keys["KeyW"])
        player.y -= player.speed;

    if(keys["KeyS"])
        player.y += player.speed;

    if(keys["KeyA"])
        player.x -= player.speed;

    if(keys["KeyD"])
        player.x += player.speed;

    player.x =
        Math.max(
            player.radius,
            Math.min(
                canvas.width - player.radius,
                player.x
            )
        );

    player.y =
        Math.max(
            player.radius,
            Math.min(
                canvas.height - player.radius,
                player.y
            )
        );
}

function drawPlayer(){

    ctx.fillStyle =

        player.debug
        ? "lime"
        : "cyan";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        player.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "white";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();

    if(
        player.debug
    ){

        ctx.fillStyle =
            "lime";

        ctx.font =
            "18px sans-serif";

        ctx.fillText(
            "DEBUG",
            player.x + 15,
            player.y - 15
        );
    }
}
