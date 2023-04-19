import {LatheGeometry, Vector2} from "three";

const points = [];
for(let i = 0; i < 10; i++){
	points.push(new Vector2((Math.sin(i*0.2)*3 + 3, (i - 5)*0.8)));
}

// 绕着一条线形成的形状
const myLathe = new LatheGeometry(points);

export  default myLathe;
