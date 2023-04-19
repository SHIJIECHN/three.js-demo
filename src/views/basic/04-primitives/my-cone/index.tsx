import {ConeGeometry} from "three";

const radius = 5;
const height  = 7;
const radialSegments = 13;
const myCone = new ConeGeometry(radius, height, radialSegments); // 锥形

export default myCone;
