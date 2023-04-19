import {BoxGeometry, EdgesGeometry} from "three";

const size = 8;
const widthSegments = 2;
const heightSegments = 2;
const depthSegments = 2;
const boxGeometry = new BoxGeometry(size, size, size,
	widthSegments, heightSegments, depthSegments)


const myEdge = new EdgesGeometry(boxGeometry)
export default  myEdge;
