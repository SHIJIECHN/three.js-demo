import {useEffect, useRef} from "react";
import {
	BoxGeometry,
	Color,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	WebGLGeometries,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let boo = false; // 标识是惯性引发的渲染true还是主动鼠标拖拽引发的渲染false
const RenderOnDemand = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(()=>{
		if(canvasRef.current === null) return;

		const renderer = new WebGLRenderer({canvas: canvasRef.current});

		const scene = new Scene();
		scene.background = new Color(0x333333);

		const camera = new PerspectiveCamera(45, 2, 1, 100);
		camera.position.z = 20;
		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(5,5, 10);
		scene.add(light);

		const colors = [0xFF0000, 0x00FF00, 0x0000FF];
		const cubes: Mesh[] = []
		colors.forEach((color, index)=>{
			const material = new MeshPhongMaterial({ color});
			const geo = new BoxGeometry(4,4,4);
			const mesh = new Mesh(geo, material);
			mesh.position.x = (index -1) * 6;
			scene.add(mesh);
			cubes.push(mesh);
		})

		const render = ()=>{
			boo = false;
			controls.update();
			renderer.render(scene, camera);
		}
		window.requestAnimationFrame(render); // 场景只在初始化时渲染一次

		const handleChange = () => { // boo为false是拖拽引起的重新渲染
			if(boo === false){
				boo = true; // 修改为 惯性引起重新渲染
				window.requestAnimationFrame(render);
			}
		}

		const controls = new OrbitControls(camera, canvasRef.current);
		// controls.addEventListener('change', render); // 当OrbitControls发生改变时，添加对应的事件处理函数，调用render重新渲染场景
		controls.addEventListener('change', handleChange)
		controls.enableDamping = true; // 开启轨道控制器的“惯性”
		controls.update();

		const handleResize = ()=>{
			if(canvasRef.current === null) return;
			const width = canvasRef.current.clientWidth;
			const height = canvasRef.current.clientHeight;
			camera.aspect = width /height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
			window.requestAnimationFrame(render);// 触发重新渲染
			// 这里并不建议直接调用render()，而是选择window.requestAnimationFrame(render)
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize);
		}
	}, [canvasRef])

	return <canvas ref={canvasRef}/>
}

export default RenderOnDemand;
