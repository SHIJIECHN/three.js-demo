import {SphereGeometry} from "three";

const radius = 7;
const widthSegments = 12;
const heightSegments = 8;

// 球体
const mySphere = new SphereGeometry(radius, widthSegments, heightSegments);

export default mySphere;
