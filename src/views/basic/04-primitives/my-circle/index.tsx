import {CircleGeometry} from "three";

const radius = 7;
const segments = 24; // 分片

/**
 * 还可以设置
 * thetaStart、thetaLength
 */
const myCircle = new CircleGeometry(radius, segments);

export default myCircle;
