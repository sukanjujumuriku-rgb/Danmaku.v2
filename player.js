alert("player.js");
const player = {

    x:400,
    y:500,

    speed:5,

    radius:8,

    hp:1,

    debug:false
};

function updatePlayer(){

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
                canvas.width-player.radius,
                player.x
            )
        );

    player.y =
        Math.max(
            player.radius,
            Math.min(
                canvas.height-player.radius,
                player.y
            )
        );
}

function drawPlayer(){

    ctx.fillStyle =
        "cyan";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        player.radius,
        0,
        Math.PI*2
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
        Math.PI*2
    );

    ctx.fill();
}
