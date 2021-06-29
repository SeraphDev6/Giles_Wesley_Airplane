var playing;
var enemyActs;
var player={left:420,top:610,canFire:true};
var enemies=[
    {left:70,top:0,dir:1},
    {left:140,top:-70,dir:1},
    {left:350,top:-280,dir:0},
    {left:420,top:-350,dir:0},
    {left:490,top:-280,dir:0},
    {left:700,top:-70,dir:-1},
    {left:770,top:0,dir:-1}
]
var friendBullets=[];
var enemyBullets=[];
function onLoad(){
    playing = setInterval(update,10);
    setTimeout(enemyActions,2000);
}
function update(){
    moveEnemies();
    moveFriendBullets();
    moveEnemyBullets();
    drawPlayer();
    drawEnemies();
    drawFriendBullets();
    drawEnemyBullets();
}
function moveEnemies(){
    for(i=0;i<enemies.length;i++){
        enemies[i].top+=1;
        enemies[i].left+=enemies[i].dir;
        if(enemies[i].top>620||enemies.left<0||enemies.left>820){
            enemies.splice(i,1);
        }
    }
}
function moveFriendBullets(){
    for(var i=0;i<friendBullets.length;i++){
        friendBullets[i].top-=3;
        if(friendBullets[i].top<0){
            friendBullets.splice(i,1);
            continue;
        }
        for(var j=0;j<enemies.length;j++){
            if(friendBullets[i].top<enemies[j].top+75&&friendBullets[i].top+20>enemies[j].top&&friendBullets[i].left<enemies[j].left+70&&friendBullets[i].left+10>enemies[j].left){
                friendBullets.splice(i,1);
                enemies.splice(j,1);
                break;
            }
        }
    }
}
function moveEnemyBullets(){
    for(var i=0;i<enemyBullets.length;i++){
        enemyBullets[i].top+=3;
        enemyBullets[i].left+=3*enemyBullets[i].dir;
        if(enemyBullets[i].top>680||enemyBullets[i].left<0||enemyBullets[i].left>890){
            enemyBullets.splice(i,1);
            continue;
        }
        if (enemyBullets[i].top+20>player.top&&enemyBullets[i].top<player.top+75&&enemyBullets[i].left+10>player.left&&enemyBullets[i].left<player.left+70) {
            clearInterval(playing);
            clearTimeout(enemyActs);
            
        }
    }
}
function drawPlayer(){
    var content = "<div class='player' style='left:"+player.left+"px; top:"+player.top+"px'></div>";
    document.getElementById("players").innerHTML=content;
}
function drawEnemies(){
    var content=""
    for(var i=0;i<enemies.length;i++){
        content+="<div class='enemy' style='left:"+enemies[i].left+"px; top:"+enemies[i].top+"px; transform: rotate("+enemies[i].dir*-45+"deg);'></div>";
    }
    document.getElementById("enemies").innerHTML= content;
}
function drawFriendBullets(){
    var content=""
    for(var i=0;i<friendBullets.length;i++){
        content+="<div class='friend-bullet' style='left:"+friendBullets[i].left+"px; top:"+friendBullets[i].top+"px;'></div>";
    }
    document.getElementById("friend-bullets").innerHTML=content;
}
function drawEnemyBullets(){
    var content=""
    for(var i=0;i<enemyBullets.length;i++){
        content+="<div class='not-friend-bullet' style='left:"+enemyBullets[i].left+"px; top:"+enemyBullets[i].top+"px; transform: rotate("+enemyBullets[i].dir*-45+"deg);s'></div>";
    }
    document.getElementById("not-friend-bullets").innerHTML=content;
}
document.onkeydown=function(e){
    if((e.key=="ArrowLeft"||e.key=="a")&&player.left>=10){
        player.left-=10;
    }
    if((e.key=="ArrowRight"||e.key=="d")&&player.left<=820){
        player.left+=10;
    }
    if((e.key=="ArrowUp"||e.key=="w")&&player.top>=450){
        player.top-=10;
    }
    if((e.key=="ArrowDown"||e.key=="s")&&player.top<=610){
        player.top+=10;
    }
    if(e.key==" "&&player.canFire){
        fireBullet();
    }
}
function fireBullet(){
    player.canFire=false;
    friendBullets.push({left:player.left+35,top:player.top});
    setTimeout(playerReload,500);
}
function playerReload(){
    player.canFire=true;
}
function enemyActions(){
    if(enemies.length>0){
        var randomEnemy=Math.trunc(Math.random()*enemies.length);
        enemyFire(randomEnemy);
    }
    else{
        newWave()
    }
    enemyActs=setTimeout(enemyActions,1000);
}
function enemyFire(enemyNum){
    enemyBullets.push({left:enemies[enemyNum].left+35,top:enemies[enemyNum].top+75,dir:enemies[enemyNum].dir});
}
function newWave(){
    var randomWave=Math.trunc(Math.random()*waves.length);
    enemies=waves[randomWave];
}
