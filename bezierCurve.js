const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 640
canvas.height = 640

//
function factorial(a) {
    let resultat = 1;
    for (let i = 2; i <= a; i++) {
        resultat *= i;
    }
    return resultat;
}

function b(i,n,t){
    const k = factorial(n) / (factorial(i)*factorial(n-i))
    return k*t**i * (1-t)**(n-i)
}

let bezierCurve_oldX, bezierCurve_oldY
function drawPoint(x,y){
    ctx.strokeStyle=`rgba(255,0,0,1)`

    ctx.beginPath()
    ctx.arc(x,y,4,0,Math.PI*2)
    ctx.stroke()

    if(bezierCurve_oldX!=undefined){
        ctx.beginPath()
        ctx.moveTo(bezierCurve_oldX,bezierCurve_oldY)
        ctx.lineTo(x,y)
        ctx.stroke()
    }

    bezierCurve_oldX=x;bezierCurve_oldY=y
}

function bezierCurve(points, quality){
    bezierCurve_oldX=undefined
    canvas.width=canvas.width
    for(let t=0; t<=1.0001; t+=1/quality){
        let x = 0
        let y = 0
        for(let i=0; i<points.length; i++){
            x=x+points[i].x*b(i,points.length-1,t)
            y=y+points[i].y*b(i,points.length-1,t)
        }
        drawPoint(x,y)
    }
}

const points = [
    {x:0, y:0},
    {x:canvas.width*2, y:canvas.height/2},
    {x:0, y:canvas.height},
]

bezierCurve(points, 32)