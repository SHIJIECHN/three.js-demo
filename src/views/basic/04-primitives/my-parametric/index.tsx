import {ParametricGeometry} from "three/examples/jsm/geometries/ParametricGeometry";
import {Vector3} from "three/src/Three";

const slices = 14;
const stacks = 38;

function klein(u: number, v: number, target: Vector3){
	u *= Math.PI;
	v *= 2 * Math.PI;
	u = u * 2;

	let x;
	let z;
	if(u < Math.PI){
		x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( u ) * Math.cos( v );
		z = - 8 * Math.sin( u ) - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( u ) * Math.cos( v );

	} else {

		x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( v + Math.PI );
		z = - 8 * Math.sin( u );

	}

	const y = - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( v );

	target.set( x, y, z ).multiplyScalar( 0.75 );
}

// 提供一个函数（将网格中的2D的点转成对应的3D点）生成的表面
const myParam = new ParametricGeometry(klein, slices, stacks)


export default myParam;
