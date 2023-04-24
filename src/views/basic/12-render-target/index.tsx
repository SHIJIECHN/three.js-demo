/**
 * 1. 创建一个子场景，该子场景中有3个不同颜色、不停旋转的立方体
 * 2. 创建一个总场景、一个渲染器，一面镜子
 * 3. 使用总场景的渲染器，对自子场景进行渲染，得到一个离屏渲染结果（图像纹理）
 * 4. 将离屏渲染结果作为一个纹理，作用在镜子面上
 * 5. 使用总场景的渲染器，将镜子渲染到网页中
 *
 * 1. 创建一个“子场景”，子场景中有光、镜子、3个不同颜色的立方体
 * 2. 创建一个“总场景”，总场景中有光、镜子、1个平面圆（镜子）、1个立方体
 * 3. 在总场景中，控制子场景中的3个立方体，让他们不挺旋转
 * 4. 通过离屏渲染，将子场景中的“景象”作为图片纹理，作用在镜子和立方体的6个面上
 * @constructor
 */
import {useEffect, useRef} from "react";
import * as RTScene from './render-target-scene'
import {
	BoxGeometry, BufferGeometry, CircleGeometry,
	Color,
	DirectionalLight, Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	WebGLRenderTarget
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const HelloRenderTarget = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		// 获取子场景中的scene、boxes、camera
		const rtScene = RTScene.default.scene; // 子场景scene
		const rtBoxes = RTScene.default.boxes; // 子场景 立方体
		const rtCamera = RTScene.default.camera; // 子场景 镜头

		// 创建总场景的渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		const rendererTarget = new WebGLRenderTarget(512, 512, {
			depthBuffer: false,
			stencilBuffer: false
		}); // 创建离屏渲染对象

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0x333333);

		// 创建灯光
		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(0, 10, 10);
		light.target.position.set(-2, 2, 2);
		scene.add(light);
		scene.add(light.target);

		// 创建镜头
		const camera = new PerspectiveCamera(45, 2, 0.1, 100);
		camera.position.z = 15;

		// 鼠标轨迹控件
		const controls = new OrbitControls(camera, canvasRef.current);
		controls.update();

		// 创建材质，并将材质纹理与离屏渲染对象的渲染结果纹理进行绑定
		const materials = new MeshPhongMaterial({
			map: rendererTarget.texture // 将离屏渲染结果作为一个纹理，作用在镜子面上
		})

		const cubeGeo = new BoxGeometry(4,4,4);
		const cubeMesh = new Mesh(cubeGeo, materials);
		cubeMesh.position.x = 4;
		scene.add(cubeMesh);

		const circleGeo = new CircleGeometry(2.8, 36);
		const circleMesh = new Mesh(circleGeo, materials);
		circleMesh.position.x = -4;
		scene.add(circleMesh);

		const render = (time: number)=>{
			time = time * 0.001;

			rtBoxes.forEach((item)=>{
				item.rotation.set(time, time, 0);
			})
			//修改渲染器的渲染目标，让渲染器去渲染离屏渲染对象，当渲染完成后再清楚（恢复）渲染器的渲染目标
			renderer.setRenderTarget(rendererTarget);
			renderer.render(rtScene, rtCamera);
			renderer.setRenderTarget(null);

			cubeMesh.rotation.set(time, time, 0);
			renderer.render(scene, camera); // 使用渲染器把镜子和立方体进行渲染输出

			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		const handleResize = ()=>{
			if(canvasRef.current === null){
				return;
			}

			const width = canvasRef.current.clientWidth;
			const height = canvasRef.current.clientHeight;
			camera.aspect = width /height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize)
		}
	})

	return <canvas ref={canvasRef}/>
}

export default HelloRenderTarget;
