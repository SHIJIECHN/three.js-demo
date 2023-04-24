/**
 * 1. 场景中有3个不断旋转、不同颜色的立方体
 * 2  场景中添加雾，让3个立方体被雾气包围
 * @constructor
 */
import {useEffect, useRef} from "react";
import {
	BoxGeometry,
	Color,
	DirectionalLight,
	Fog,
	Material,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const HelloFog = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		const renderer = new WebGLRenderer({canvas: canvasRef.current});

		const scene = new Scene();
		scene.background = new Color(0xadd8e6);
		scene.fog = new Fog(0xadd8e6, 1, 2);// 向场景中添加雾

		const camera = new PerspectiveCamera(75, 2, 0.1, 5);
		camera.position.z = 2;

		const controls = new OrbitControls(camera, canvasRef.current);
		controls.update();

		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(-1, 2,4);
		scene.add(light);

		const colors = [0xFF0000, 0x00FF00, 0x0000FF];
		const boxes: Mesh[] = [];

		colors.forEach((color, index)=>{
			const mat = new MeshPhongMaterial({
				color,
				fog: index === 1 ? false : true // 让中间的立方体的材质不受雾的影响
			});
			const geo = new BoxGeometry(1,1,1);
			const mesh = new Mesh(geo, mat);
			mesh.position.set((index - 1) * 2, 0, 0)
			scene.add(mesh);
			boxes.push(mesh);
		})

		const render = (time:number)=>{
			time *= 0.001;
			boxes.forEach((box)=>{
				box.rotation.x = time;
				box.rotation.y = time;
			})

			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		const handleResize = () => {
			if (canvasRef.current === null) {
				return
			}
			const width = canvasRef.current.clientWidth
			const height = canvasRef.current.clientHeight
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			renderer.setSize(width, height, false)
		}
		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}

	}, [canvasRef])

	return <canvas ref={canvasRef}/>
}

export default HelloFog
