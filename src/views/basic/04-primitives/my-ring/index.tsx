import {RingGeometry} from "three";

const  innerRadius = 2;
const outerRadius = 7;
const thetaSegments = 18;

// 中间有孔的2D圆盘
const myRing = new RingGeometry(innerRadius, outerRadius, thetaSegments);

export default myRing;
