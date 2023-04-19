import {BoxGeometry, WireframeGeometry} from "three";

const size = 8;
const widthSegments = 2;
const heightSegment = 2;
const depthSegments = 2;
const myWire = new WireframeGeometry(
	new BoxGeometry(
		size, size, size, widthSegments, heightSegment, depthSegments
	)
)

export default myWire;
