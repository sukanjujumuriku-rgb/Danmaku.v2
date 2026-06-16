alert("gra-ougi3.js");

let graOugi3Timer = 0;

const meteors = [];

function updateGraOugi3(){

    graOugi3Timer++;

    gra.x =
        canvas.width / 2;

    gra.y =
        120;

    // 隕石生成

    if(
        graOugi3Timer % 20 === 0
    ){

        const tx =
            Math.random() *
            canvas.width;

        const ty =
            350 +
            Math.random() * 220;

        meteors.push({

            tx,
            ty,

            x: tx,

            y: -100,

            timer: 0,

            fired: false
        });
    }

    for(
        let i =
        meteors.length - 1;
        i >= 0;
        i--
    ){

        const m =
            meteors[i];

        m.timer++;

        // 予告60f

        if(
            m.timer >= 60 &&
            !m.fired
        ){

            m.fired = true;
        }

        if(
            m.fired
        ){

            // 落下

            m.y += 8;

            // 重力歪曲
            // 落下途中でプレイヤーへ曲げる

            if(
                m.timer > 80
            ){

                const dx =
                    player.x -
                    m.x;

                const dy =
                    player.y -
                    m.y;

                const dist =

                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if(
                    dist > 1
                ){

                    m.x +=
                        dx /
                        dist *
                        3;
                }
            }

            // 着弾

            if(
                m.y >= m.ty
            ){

                for(
                    let k = 0;
                    k < 12;
                    k++
                ){

                    const a =

                        Math.PI * 2 /
                        12 *
                        k;

                    spawnGraBullet(

                        m.x,

                        m.ty,

                        Math.cos(a) * 4,

                        Math.sin(a) * 4,

                        8
                    );
                }

                meteors.splice(
                    i,
                    1
                );

                continue;
            }

            // 本体接触

            const dx =
                m.x -
                player.x;

            const dy =
                m.y -
                player.y;

            const dist =

                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if(
                dist <
                player.radius +
                18
            ){

                if(
                    !player.debug
                ){

                    player.hp = 0;
                }
            }
        }
    }
}

function drawGraOugi3(){

    meteors.forEach(
        m=>{

            if(
                !m.fired
            ){

                // 着弾予告

                ctx.strokeStyle =
                    "rgba(255,0,0,0.6)";

                ctx.lineWidth = 3;

                ctx.beginPath();

                ctx.arc(
                    m.tx,
                    m.ty,
                    30,
                    0,
                    Math.PI * 2
                );

                ctx.stroke();
            }
            else{

                // 隕石

                ctx.fillStyle =
                    "#8844ff";

                ctx.beginPath();

                ctx.arc(
                    m.x,
                    m.y,
                    18,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }
    );

    ctx.fillStyle =
        "white";

    ctx.font =
        "18px sans-serif";

    ctx.fillText(
        "METEOR STORM",
        280,
        320
    );
};
