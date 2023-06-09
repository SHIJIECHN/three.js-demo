import {useEffect, useRef} from "react";
import {
	AxesHelper,
	BackSide,
	BoxGeometry,
	CameraHelper,
	Color, DirectionalLight, DirectionalLightHelper, DoubleSide, HemisphereLight, Material, Mesh, MeshPhongMaterial, NearestFilter,
	PerspectiveCamera, PlaneGeometry,
	PointLight,
	PointLightHelper,
	RepeatWrapping,
	Scene, SphereGeometry, SpotLight,
	TextureLoader,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import checkerUrl from '@/assets/basic/checker.png';


const HelloPointLightShadow = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		renderer.shadowMap.enabled = true;

		const scene = new Scene();
		scene.background = new Color(0x333333);

		const camera = new PerspectiveCamera(45, 2, 5, 1000);
		camera.position.set(0, 10, 20);
		scene.add(camera);

		const helperCamera = new PerspectiveCamera(45, 2, 5, 100);
		helperCamera.position.set(20, 10 ,20);
		helperCamera.lookAt(0, 5, 0);
		scene.add(helperCamera);

		const cameraHelper = new CameraHelper(helperCamera);
		scene.add(cameraHelper);

		const controls = new OrbitControls(camera, canvasRef.current);
		controls.target.set(0, 5,0);
		controls.update();

		// 灯光
		const light = new PointLight(0xFFFFFF, 1);
		light.castShadow = true;
		light.position.set(0, 10, 0);
		scene.add(light);

		const lightHelper = new PointLightHelper(light);
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
		texture.repeat.set(planeSize/2, planeSize/2);
		const planeMat = new MeshPhongMaterial({
			map: texture,
			side: DoubleSide
		})
		const planeGeo = new PlaneGeometry(planeSize, planeSize);
		const planeMesh = new Mesh(planeGeo, planeMat);
		planeMesh.receiveShadow = true;
		planeMesh.rotation.x = Math.PI * -0.5;
		scene.add(planeMesh);

		const material = new MeshPhongMaterial({
			color: 0x88AACC
		})

		const boxMat = new BoxGeometry(4,4,4);
		const boxMesh = new Mesh(boxMat, material);
		boxMesh.castShadow = true;
		boxMesh.position.set(5, 3,0)
		scene.add(boxMesh);

		const sphereMat= new SphereGeometry(3, 12, 16);
		const sphereMesh = new Mesh(sphereMat, material);
		sphereMesh.castShadow = true;
		sphereMesh.position.set(-4, 5,0);
		scene.add(sphereMesh);

		const room = new MeshPhongMaterial({
			color: 0xCCCCCC,
			side: BackSide
		})
		const roomGeo = new BoxGeometry(30,30,30);
		const roomMesh = new Mesh(roomGeo, room);
		roomMesh.receiveShadow = true;
		roomMesh.position.set(0,14.9,0);
		scene.add(roomMesh)

		const render = ()=>{
			cameraHelper.update();
			lightHelper.update();

			renderer.render(scene, camera);
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
			window.removeEventListener('resize', handleResize);
		}
	}, [canvasRef])

	return <canvas ref={canvasRef}/>
}

export default  HelloPointLightShadow;
