const canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

let step=0;

const cx=350;

const cy=300;

const r=150;

function clearCanvas(){

ctx.clearRect(0,0,canvas.width,canvas.height);

}

function circle(){

ctx.beginPath();

ctx.arc(cx,cy,r,0,Math.PI*2);

ctx.stroke();

}

function concentric(){

ctx.beginPath();

ctx.arc(cx,cy,r/2,0,Math.PI*2);

ctx.stroke();

}

function hexagon(){

ctx.beginPath();

for(let i=0;i<6;i++){

let angle=Math.PI/3*i-Math.PI/2;

let x=cx+r*Math.cos(angle);

let y=cy+r*Math.sin(angle);

if(i==0)

ctx.moveTo(x,y);

else

ctx.lineTo(x,y);

}

ctx.closePath();

ctx.strokeStyle="red";

ctx.lineWidth=2;

ctx.stroke();

}

function next(){

clearCanvas();

if(step>=1){

circle();

}

if(step>=2){

concentric();

}

if(step>=3){

hexagon();

}

step++;

if(step>3)

step=3;

}

document.getElementById("step").onclick=next;

document.getElementById("draw").onclick=function(){

step=3;

next();

}

document.getElementById("reset").onclick=function(){

step=0;

clearCanvas();

}