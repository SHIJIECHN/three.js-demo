import {PolyhedronGeometry} from "three";

const verticesOfCube = [
	- 1, - 1, - 1, 1, - 1, - 1, 1, 1, - 1, - 1, 1, - 1,
	- 1, - 1, 1, 1, - 1, 1, 1, 1, 1, - 1, 1, 1,
];
const indicesOfFaces = [
	2, 1, 0, 0, 3, 2,
	0, 4, 7, 7, 3, 0,
	0, 1, 5, 5, 4, 0,
	1, 2, 6, 6, 5, 1,
	2, 3, 7, 7, 6, 2,
	4, 5, 6, 6, 7, 4,
];
const radius = 7;
const detail = 2;

// 将一些环绕着中心点的三角形投影到球体上
const myPoly = new PolyhedronGeometry(verticesOfCube, indicesOfFaces, radius, detail);

export default myPoly;
