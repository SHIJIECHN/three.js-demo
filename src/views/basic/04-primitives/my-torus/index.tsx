import {TorusGeometry} from "three";

const radius = 5;
const tubeRadius = 2;
const radialSegments = 8;
const tubularSegments = 24;

// 圆环体（甜甜圈）
const myTorus = new TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);

export default myTorus;
