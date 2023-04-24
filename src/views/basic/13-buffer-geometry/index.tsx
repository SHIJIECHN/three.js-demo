import {useRef} from "react";
import vertices from "./vertices";

const HelloBufferGeometry = ()=>{

	const canvasRef  = useRef<HTMLCanvasElement>(null)
	const position = [];
	const normals = [];
	const uvs = [];
	for(const vertex of vertices){
		position.push(...vertex.pos);
		normals.push(...vertex.norm);
		uvs.push(vertex.uv);
	}

	return <canvas ref={canvasRef}></canvas>
}

export default HelloBufferGeometry
