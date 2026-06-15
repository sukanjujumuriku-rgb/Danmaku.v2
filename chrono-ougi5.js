alert("chrono-ougi5.js");

let chronoOugi5Timer = 0;

const pastPositions = [];

const echoes = [];

function updateChronoOugi5(){

    chronoOugi5Timer++;

    chrono.x =
        canvas.width / 2 +
        Math.sin(
            chronoOugi5Timer * 0.02
        ) * 180;

    chrono.y = 120;

    // プレイヤー履歴保存

    if(
        chronoOugi5Timer % 2 === 0
    ){

        pastPositions.push({

            x: player.x,
            y: player.y
        });
    }

    // 最大10秒

    if(
        pastPositions.length >
        300
    ){

        pastPositions.shift();
    }

    // 残像生成

    if(
        chronoOugi5Timer % 180 === 0
    ){

        for(
            let i = 0;
            i < pastPositions.length;
            i += 25
        ){

            echoes.push({

                x:
                    pastPositions[i].x,

                y:
                    pastPositions[i].y,

                timer: 0,

                fired: false
            });
        }
    }

    // 更新

    for(
        let i =
        echoes.length - 1;
        i >= 0;
        i--
    ){

        const e =
            echoes[i];

        e.timer++;

        // 予告後発射

        if(
            e.timer === 60
        ){

            e.fired = true;

            // 円形弾幕

            for(
                let j = 0;
                j < 24;
                j++
            ){

                const a =
                    Math.PI * 2 /
                    24 * j;

                spawnChronoBullet(

                    e.x,
                    e.y,

                    Math.cos(a) * 3,

                    Math.sin(a) * 3,

                    5
                );
            }

            // プレイヤー狙い

            const aim =

                Math.atan2(

                    player.y - e.y,

                    player.x - e.x
                );

            for(
                let k = -2;
                k <= 2;
                k++
            ){

                const a =
                    aim +
                    k * 0.15;

                spawnChronoBullet(

                    e.x,
                    e.y,

                    Math.cos(a) * 5,

                    Math.sin(a) * 5,

                    7
                );
            }
        }

        if(
            e.timer > 150
        ){

            echoes.splice(
                i,
                1
            );
        }
    }
}

function drawChronoOugi5(){

    echoes.forEach(
        e=>{

            if(
                !e.fired
            ){

                // 残像

                ctx.fillStyle =
                    "rgba(0,255,255,0.35)";

                ctx.beginPath();

                ctx.arc(
                    e.x,
                    e.y,
                    12,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                // 予告円

                ctx.strokeStyle =
                    "rgba(255,255,255,0.7)";

                ctx.lineWidth = 2;

                ctx.beginPath();

                ctx.arc(
                    e.x,
                    e.y,
                    20 +
                    e.timer,
                    0,
                    Math.PI * 2
                );

                ctx.stroke();
            }
        }
    );
}
