import {earthOribit, moonOribit, pointLight, solarSystem} from "@/views/basic/05-scene/create-something";
import {useEffect, useRef} from "react";
import {AxesHelper, Color, Material, Object3D, PerspectiveCamera, Scene, WebGLRenderer} from "three";

const nodeArr = [solarSystem, earthOribit, moonOribit]; // 太阳、地球、月亮对应的网格

const HelloScene = ()=>{
	const canvasRef = useRef<HTMLCanvasElement|null>(null);
	const rendererRef = useRef<WebGLRenderer|null>(null);
	const cameraRef = useRef<PerspectiveCamera|null>(null);
	const sceneRef = useRef<Scene|null>(null);

	useEffect(()=>{
		// 创建渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current as HTMLCanvasElement});
		rendererRef.current = renderer;

		// 创建镜头
		const camera = new PerspectiveCamera(40, 2, 0.1, 1000);
		camera.position.set(0, 50, 0);
		camera.up.set(0,0,1);
		camera.lookAt(0,0,0);
		cameraRef.current = camera;

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0x111111);
		sceneRef.current = scene;

		// 将太阳系、灯光添加到场景中
		scene.add(solarSystem);
		scene.add(pointLight);

		// 创建循环渲染的动画
		const render = (time: number)=>{
			time = time * 0.001;
      // 1. 没有轴线
			// nodeArr.forEach(item=>{
			// 	item.rotation.y = time
			// })

			// 2. 显示轴线
			nodeArr.forEach(item=>{
				const axes = new AxesHelper();
				const material = axes.material as Material;
				material.depthTest = false;
				axes.renderOrder = 1; // renderOrder的值默认为0，这里设置为1，目的是为了提高优先级，避免被物体本身给覆盖住
				item.add(axes)
			})
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		// 添加窗口尺寸变化的监听
		const resizehandle = ()=>{
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		}
		resizehandle();
		window.addEventListener('resize', resizehandle);

		return ()=>{
			window.removeEventListener('resize', resizehandle);
		}
	}, [canvasRef])


	return <canvas ref={canvasRef} />
}
export  default HelloScene;


