alert("gra-ougi6.js");

let graOugi6Timer = 0;

const crunchLasers = [];

function updateGraOugi6(){

    graOugi6Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    const cx =
        canvas.width / 2;

    const cy =
        canvas.height / 2;

    const dx =
        cx - player.x;

    const dy =
        cy - player.y;

    const dist =

        Math.sqrt(
            dx * dx +
            dy * dy
        );

    // ----------------
    // Phase1 吸引
    // ----------------

    if(
        graOugi6Timer < 300
    ){

        if(
            dist > 5
        ){

            player.x +=
                dx / dist * 1.8;

            player.y +=
                dy / dist * 1.8;
        }
    }

    // ----------------
    // Phase2
    // ----------------

    if(
        graOugi6Timer >= 300 &&
        graOugi6Timer < 600
    ){

        if(
            graOugi6Timer % 8 === 0
        ){

            const a =
                Math.random() *
                Math.PI * 2;

            const r = 420;

            const x =
                cx +
                Math.cos(a) * r;

            const y =
                cy +
                Math.sin(a) * r;

            const angle =

                Math.atan2(

                    player.y - y,

                    player.x - x
                );

            spawnGraBullet(

                x,
                y,

                Math.cos(angle) * 4,

                Math.sin(angle) * 4,

                7
            );
        }
    }

    // ----------------
    // Phase3
    // ----------------

    if(
        graOugi6Timer >= 600 &&
        graOugi6Timer < 900
    ){

        if(
            dist > 5
        ){

            player.x -=
                dx / dist * 2;

            player.y -=
                dy / dist * 2;
        }
    }

    // ----------------
    // Phase4
    // ----------------

    if(
        graOugi6Timer >= 900 &&
        graOugi6Timer < 1200
    ){

        const limit =

            Math.max(
                25,
                180 -
                (
                    graOugi6Timer
                    - 900
                ) * 0.6
            );

        if(
            dist > limit
        ){

            if(
                !player.debug
            ){

                player.hp = 0;
            }
        }

        if(
            graOugi6Timer % 40 === 0
        ){

            for(
                let i = 0;
                i < 18;
                i++
            ){

                const a =

                    Math.PI * 2 /
                    18 * i;

                spawnGraBullet(

                    cx,
                    cy,

                    Math.cos(a) * 4,

                    Math.sin(a) * 4,

                    8
                );
            }
        }
    }

    // ----------------
    // Phase5
    // ----------------

    if(
        graOugi6Timer >= 1200
    ){

        if(
            graOugi6Timer % 2 === 0
        ){

            const a =
                Math.random() *
                Math.PI * 2;

            spawnGraBullet(

                cx,
                cy,

                Math.cos(a) * 6,

                Math.sin(a) * 6,

                6
            );
        }

        if(
            graOugi6Timer % 90 === 0
        ){

            const angle =

                Math.random() *
                Math.PI * 2;

            crunchLasers.push({

                angle,

                timer:0
            });
        }
    }

    // レーザー更新

    for(
        let i =
        crunchLasers.length - 1;
        i >= 0;
        i--
    ){

        const l =
            crunchLasers[i];

        l.timer++;

        if(
            l.timer > 90
        ){

            crunchLasers.splice(
                i,
                1
            );
        }
    }

    // レーザー当たり判定

    crunchLasers.forEach(
        l=>{

            if(
                l.timer < 40
            ){
                return;
            }

            const vx =
                Math.cos(
                    l.angle
                );

            const vy =
                Math.sin(
                    l.angle
                );

            const px =
                player.x - cx;

            const py =
                player.y - cy;

            const d =

                Math.abs(
                    px * vy -
                    py * vx
                );

            if(
                d < 20
            ){

                if(
                    !player.debug
                ){

                    player.hp = 0;
                }
            }
        }
    );
}

function drawGraOugi6(){

    const cx =
        canvas.width / 2;

    const cy =
        canvas.height / 2;

    // 中央核

    ctx.fillStyle =
        "black";

    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        50,
        0,
        Math.PI * 2
    );

    ctx.fill();

    crunchLasers.forEach(
        l=>{

            if(
                l.timer < 40
            ){

                ctx.strokeStyle =
                    "rgba(255,0,255,0.5)";

                ctx.lineWidth = 4;
            }
            else{

                ctx.strokeStyle =
                    "white";

                ctx.lineWidth = 20;
            }

            ctx.beginPath();

            ctx.moveTo(
                cx -
                Math.cos(
                    l.angle
                ) * 2000,

                cy -
                Math.sin(
                    l.angle
                ) * 2000
            );

            ctx.lineTo(
                cx +
                Math.cos(
                    l.angle
                ) * 2000,

                cy +
                Math.sin(
                    l.angle
                ) * 2000
            );

            ctx.stroke();
        }
    );

    ctx.fillStyle =
        "white";

    ctx.font =
        "22px sans-serif";

    ctx.fillText(
        "BIG CRUNCH",
        300,
        80
    );
}
