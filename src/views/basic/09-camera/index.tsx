/**
 * 1. 创建一个包含物体的场景
 * 2. 创建2个镜头，镜头A和镜头B
 * 3. 将网页画面一分为二
 * 4. 左侧显示镜头A所看到的场景
 * 5. 右侧使用镜头B来观察镜头A
 * @constructor
 */
import {useEffect, useRef} from "react";
import {CameraHelper, Color, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as Three from 'three'
import createScene from "@/views/basic/09-camera/create-scene";
import './index.less'

const HelloCamera = ()=>{
	const canvasRef= useRef<HTMLCanvasElement|null>(null);
	const sceneRef= useRef<Scene|null>(null);
	const leftViewRef = useRef<HTMLDivElement|null>(null);
	const rightViewRef= useRef<HTMLDivElement|null>(null);
	const style = {
		'height': '300px',
		'width': '200px'
	}

	useEffect(()=>{

		if(canvasRef.current === null || leftViewRef.current === null || rightViewRef.current === null){
			return;
		}

		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		renderer.setScissorTest(true);// 启用剪裁检测

		const scene = createScene();
		scene.background = new Color(0x000000);
		sceneRef.current = scene;

		// 灯光
		const light = new DirectionalLight(0xFFFFFF, 1); // 平行光
		light.position.set(0, 10, 0); // 光照位置
		light.target.position.set(5,0,0); // 目标物体位置
		scene.add(light);
		scene.add(light.target);

		// 左侧画面：单独设置镜头、辅助函数、OrbitControls
		const leftCamera = new PerspectiveCamera(45, 2, 5, 100);
		leftCamera.position.set(0, 10, 20);

		const helper = new CameraHelper(leftCamera);
		scene.add(helper);

		const leftControls = new OrbitControls(leftCamera, leftViewRef.current);
		leftControls.target.set(0, 5,0);
		leftControls.update();

		const rightCamera = new PerspectiveCamera(60, 2, 0.1, 200);
		rightCamera.position.set(40, 10, 30);// 为了能够看清、看全镜头A，所以将右侧镜头的位置设置稍远稍远一点
		rightCamera.lookAt(0, 5, 0);

		const rightControls = new OrbitControls(rightCamera, rightViewRef.current);
		rightControls.target.set(0, 5,0);
		rightControls.update();

		const setScissorForElement = (div: HTMLDivElement)=>{
			if(canvasRef.current === null){
				return;
			}

			// 获得canvas和div的矩形框尺寸和位置
			const canvasRect = canvasRef.current.getBoundingClientRect();
			const divRect = div.getBoundingClientRect();
			// debugger

			// 计算出裁切框的尺寸和位置
			const right = Math.min(divRect.right, canvasRect.right) - canvasRect.left; // 矩形框的右侧
			const left = Math.max(0, divRect.left - canvasRect.left); // 矩形框的左侧
			const bottom = Math.min(divRect.bottom, canvasRect.bottom) - canvasRect.top; // 底部
			const top = Math.max(0, canvasRect.top);
			const width = Math.min(canvasRect.width, right-left);// 矩形框的宽度
			const height = Math.min(canvasRect.height, bottom-top);// 矩形框的高度

			// 将剪刀设置为仅渲染到画布的该部分
			const positionYUpBottom = canvasRect.height - bottom;
			renderer.setScissor(left, positionYUpBottom, width, height);
			renderer.setViewport(left, positionYUpBottom, width, height);

			// 返回外观
			return width / height;
		}

		const render = ()=>{
			if(leftCamera === null || rightCamera === null || sceneRef.current === null){
				return;
			}

			const sceneBackground = sceneRef.current.background as Color;

			// 渲染 左侧 镜头
			const leftAspect = setScissorForElement(leftViewRef.current as HTMLDivElement);

			leftCamera.aspect = leftAspect as number;
			leftCamera.updateProjectionMatrix();

			helper.update();
			helper.visible = false;

			sceneBackground.set(0x000000);
			renderer.render(sceneRef.current, leftCamera);

			// 渲染 右侧 镜头
			const rightAspect = setScissorForElement(rightViewRef.current as HTMLDivElement);

			rightCamera.aspect = rightAspect as number;
			rightCamera.updateProjectionMatrix();

			helper.visible = true;

			sceneBackground.set(0x000040);
			renderer.render(sceneRef.current, rightCamera);

			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		const handleResize = ()=>{
			if(canvasRef.current === null){
				return;
			}

			const width = canvasRef.current.clientWidth;
			const height = canvasRef.current.clientHeight;

			renderer.setSize(width, height, false);
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize);
		}
	}, [canvasRef])


	return (
		<>
			<div className='split'>
				<div ref={leftViewRef}></div>
				<div ref={rightViewRef}></div>
			</div>
			<canvas ref={canvasRef} />
	  </>
	)
}



export default  HelloCamera;
