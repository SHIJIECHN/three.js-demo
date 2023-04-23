import './index.less'
import createScene, {MaterialType} from "./create-scene";
import React, {useEffect, useRef, useState} from "react";
import {
	AmbientLight,
	AmbientLightProbe, AxesHelper,
	DirectionalLight, DirectionalLightHelper,
	HemisphereLight, HemisphereLightHelper, HemisphereLightProbe,
	Light, Material, MathUtils,
	PerspectiveCamera, PointLight, PointLightHelper, RectAreaLight,
	Scene, SpotLight, SpotLightHelper,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";

/**
 * 创建渲染器、镜头、以及不同种类的光
 * 1. 当canvas DOM初始化后，创建渲染器、镜头、镜头监护（OrbitControls）
 * 2. 创建8个按钮，每个按钮对应一种光
 * 3. 使用useState创建一个变量type，用来记录当前演示光的类型
 * 4. 点击不同按钮后，修改当前光的类型type值，从而引发react重新渲染
 * 5. 在新一轮渲染中，通过判断type类型，使用createScene创建一个新的场景和对应的光
 * @constructor
 */

enum LightType {
	AmbientLight = 'AmbientLight',
	AmbientLightProbe = 'AmbientLightProbe',
	DirectionalLight = 'DirectionalLight',
	HemisphereLight = 'HemisphereLight',
	HemisphereLightProbe = 'HemisphereLightProbe',
	PointLight = 'PointLight',
	RectAreaLight = 'RectAreaLight',
	SpotLight = 'SpotLight'
}

const buttonLabels = [LightType.AmbientLight, LightType.AmbientLightProbe, LightType.DirectionalLight,LightType.HemisphereLight,
	LightType.HemisphereLightProbe, LightType.PointLight, LightType.RectAreaLight, LightType.SpotLight];

const HelloLight = ()=>{
	const canvasRef=  useRef<HTMLCanvasElement|null>(null)
	const sceneRef=  useRef<Scene|null>(null);

	const [type, setType] = useState<LightType>(LightType.AmbientLight);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		const renderer = new WebGLRenderer({canvas: canvasRef.current});

		const camera = new PerspectiveCamera(45, 2, 0.1, 1000);
		camera.position.set(0, 10, 20);

		const controls = new OrbitControls(camera, canvasRef.current);
		controls.target.set(0, 5,0);
		controls.update();

		const scene = createScene();
		sceneRef.current = scene;

		const render = ()=>{
			if(sceneRef.current ){
				renderer.render(sceneRef.current, camera);
			}
			window.requestAnimationFrame(render)
		}
		window.requestAnimationFrame(render);

		const handleResize = ()=>{
			const canvas = renderer.domElement;
			if(canvas === null){
				return;
			}
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		}

		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize)
		}
	}, [canvasRef]);

	useEffect(()=>{
		if(sceneRef.current === null){
			return;
		}
		sceneRef.current = null;

		let newScene : Scene;
		if(type === LightType.RectAreaLight){
			newScene = createScene(MaterialType.MESH_STANDARD_MATERIAL);
		}else{
			newScene = createScene();
		}
		sceneRef.current = newScene;

		switch(type){
			case LightType.AmbientLight:
				const ambientLight = new AmbientLight(0xFFFFFF, 1);
				newScene.add(ambientLight);
				break;
			case LightType.AmbientLightProbe:
				const ambientLightProbe = new AmbientLightProbe(0xFFFFFF, 1);
				newScene.add(ambientLightProbe);
				break;
			case LightType.DirectionalLight:
				const directionalLight = new DirectionalLight(0xFFFFFF, 1);
				directionalLight.position.set(0, 10, 0); // 灯光所在位置
				directionalLight.target.position.set(-5, 0, 0); // 目标所在位置
				// 灯光坐标辅助
				const axes = new AxesHelper();
				const material = axes.material as Material;
				material.depthTest = false;
				axes.renderOrder = 1;
				directionalLight.add(axes)
				newScene.add(directionalLight);
				newScene.add(directionalLight.target);

				const directionalLightHelper = new DirectionalLightHelper(directionalLight);
				newScene.add(directionalLightHelper);
				break;
			case LightType.HemisphereLight:
				const hemisphereLight = new HemisphereLight(0xB1E1FF, 0xB97A20, 1);
				newScene.add(hemisphereLight);

				const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight, 5);
				newScene.add(hemisphereLightHelper);
				break;
			case LightType.HemisphereLightProbe:
				const hemisphereLightProbe = new HemisphereLightProbe(0xB1E1FF, 0xB97A20, 1);
				newScene.add(hemisphereLightProbe);
				break;
			case LightType.PointLight:
				const pointLight = new PointLight(0xFFFFFF, 1);
				pointLight.position.set(0, 10, 0);
				newScene.add(pointLight);

				const pointLightHelper = new PointLightHelper(pointLight);
				newScene.add(pointLightHelper);
				break;
			case LightType.RectAreaLight:
				const rectAreaLight = new RectAreaLight(0xFFFFF, 5, 12, 5);
				rectAreaLight.position.set(0, 10, 0);
				rectAreaLight.rotation.x = MathUtils.degToRad(-90);
				newScene.add(rectAreaLight);

				const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
				newScene.add(rectAreaLightHelper);
				break;
			case LightType.SpotLight:
				const spotLight = new SpotLight(0xFFFFFF, 1);
				spotLight.position.set(0, 10, 0);
				spotLight.target.position.set(-5, 0,0);
				newScene.add(spotLight);
				newScene.add(spotLight.target);

				const spotLightHelper = new SpotLightHelper(spotLight);
				newScene.add(spotLightHelper);
				break;
			default:
				console.log('???');
				break;
		}
	}, [type]);

	return (
		<>
			<div className={'buttons'}>
				{
					buttonLabels.map((label, index)=>{
						return (
							<div className={'button-item'}>
								<button
									className={label ===type? 'button-selected':''}
									onClick={()=>{setType(label)}}
									key={`button${index}`}
								>
									{label}
								</button>
							</div>
							)

					})
				}
			</div>
			<canvas ref={canvasRef} />
		</>
	)
}


export default HelloLight
