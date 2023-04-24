import {useEffect, useRef} from "react";
import {
	BoxGeometry,
	CameraHelper,
	Color, DoubleSide, Mesh,
	MeshPhongMaterial, NearestFilter,
	PerspectiveCamera,
	PlaneGeometry, RepeatWrapping,
	Scene, Sphere, SphereGeometry,
	SpotLight,
	SpotLightHelper, TextureLoader,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import checkerUrl from "@/assets/basic/checker.png";

// 聚光灯阴影
const HelloSpotLightShadow = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		// 创建渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		renderer.shadowMap.enabled = true;

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0x333333);

		// 创建相机
		const camera = new PerspectiveCamera(45, 2, 5, 1000);
		camera.position.set(0, 10, 20);
		scene.add(camera);

		//
		const helperCamera = new PerspectiveCamera(45, 2, 5, 100);
		helperCamera.position.set(20, 10, 20);
		helperCamera.lookAt(0,5,0);
		scene.add(helperCamera)

		const cameraHelper = new CameraHelper(helperCamera);
		scene.add(cameraHelper);

		// 鼠标轨道空间
		const controls = new OrbitControls(camera, canvasRef.current);
		controls.target.set(0, 5,0);
		controls.update();

		// 创建灯光
		const light = new SpotLight(0xFFFFFF, 1);
		light.castShadow = true;
		light.position.set(0, 10, 0);
		light.target.position.set(-4, 0, -4);
		scene.add(light);

		const lightHelper = new SpotLightHelper(light);
		scene.add(lightHelper);

		const shadowCamera = light.shadow.camera;
		shadowCamera.updateProjectionMatrix();
		scene.add(shadowCamera);
		const shadowHelper = new CameraHelper(shadowCamera);
		scene.add(shadowHelper);

		const planeSize = 40;

		const loader = new TextureLoader();
		const texture = loader.load(checkerUrl);
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.magFilter = NearestFilter;
		texture.repeat.set(planeSize /2, planeSize /2);

		const planeGeo = new PlaneGeometry(planeSize, planeSize);
		const planeMat = new MeshPhongMaterial({
			map: texture,
			side: DoubleSide
		})
		const planeMesh = new Mesh(planeGeo, planeMat);
		planeMesh.receiveShadow = true;
		planeMesh.rotation.x = Math.PI * -0.5;
		scene.add(planeMesh);

		const material = new MeshPhongMaterial({
			color: 0x88AACC
		})
		const boxMat = new BoxGeometry(4,4,4);
		const boxMesh = new Mesh(boxMat, material);
		boxMesh.position.set(5, 3, 0);
		boxMesh.receiveShadow = true;
		boxMesh.castShadow = true;
		scene.add(boxMesh);

		const sphereMat = new SphereGeometry(3, 12, 16);
		const sphereMesh = new Mesh(sphereMat, material);
		sphereMesh.position.set(-4, 5, 0);
		sphereMesh.receiveShadow = true;
		sphereMesh.castShadow = true;
		scene.add(sphereMesh);

		const render = ()=>{
			// cameraHelper.update();
			lightHelper.update();
			shadowHelper.update();

			renderer.render(scene, camera);
			window.requestAnimationFrame(render)
		}
		window.requestAnimationFrame(render);

		const handleResize = ()=>{
			if(canvasRef.current === null){
				return
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
	}, [canvasRef])

	return <canvas ref={canvasRef}/>
}

export default HelloSpotLightShadow
