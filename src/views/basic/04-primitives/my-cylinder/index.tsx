import {CylinderGeometry} from "three";

const radiusTop = 5;
const radiusBottom = 5;
const height = 6;
const radiusSegments = 25;

// 圆柱
const myCylinder = new CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments);

export default  myCylinder;
