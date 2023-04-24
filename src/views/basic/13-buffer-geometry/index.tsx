import {useRef} from "react";

const HelloBufferGeometry = ()=>{

	const canvasRef  = useRef<HTMLCanvasElement>(null)

	return <canvas ref={canvasRef}></canvas>
}

export default HelloBufferGeometry
