import {useEffect, useRef} from "react";
import {
	AxesHelper, BoxGeometry,
	CameraHelper, Color,
	DirectionalLight,
	DirectionalLightHelper, DoubleSide, HemisphereLight,
	Material, Mesh, MeshPhongMaterial, NearestFilter,
	PerspectiveCamera, PlaneGeometry, RepeatWrapping,
	Scene, SphereGeometry, TextureLoader,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import checkerUrl from '@/assets/basic/checker.png';

const HelloShadow = ()=>{

	const canvasRef=  useRef<HTMLCanvasElement|null>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}

		// 创建渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		renderer.shadowMap.enabled = true; // 开启渲染阴影
		renderer.useLegacyLights = false; // 修改为false，否则添加环境光后，画面高亮。按照物理矫正正确光照的模式来渲染场景

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0x333333);

		// 创建镜头
		const camera = new PerspectiveCamera(45, 2, 5, 1000);
		camera.position.set(0,10,20);
		scene.add(camera);
		// 相机辅助对象
		const helperCamera = new PerspectiveCamera(45, 2, 5, 100);
		helperCamera.position.set(20, 10, 20);
		helperCamera.lookAt(0, 5, 0);
		scene.add(helperCamera);

		const cameraHelper = new CameraHelper(helperCamera);
		scene.add(cameraHelper);

		// 鼠标镜头轨道控件
		const controls = new OrbitControls(camera, canvasRef.current);
		controls.target.set(0, 5, 0);
		controls.update();

		// 创建灯光
		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(0, 10,0);
		light.target.position.set(-4,0,-4);
		light.castShadow = true; // 开启投射阴影
		// 坐标轴辅助对象
		const axes = new AxesHelper();
		(axes.material as Material).depthTest = false;
		axes.renderOrder = 1;
		light.add(axes);
		scene.add(light);
		scene.add(light.target);
		// 灯光辅助对象
		const lightHelper = new DirectionalLightHelper(light);
		scene.add(lightHelper);

		// 添加半球环境光。
		const hemisphereLight = new HemisphereLight(0xFFFFFF, 0x000000,2);
		scene.add(hemisphereLight);

		// 阴影辅助对象：灯光中阴影的镜头对应的辅助对象，为了方便通过灯光的辅助对象来观察灯光所能投射的阴影可见区域
		const shadowCamera = light.shadow.camera;
		// 修正阴影镜头视锥的可见范围
		shadowCamera.left = -10;
		shadowCamera.right = 10;
		shadowCamera.top = 10;
		shadowCamera.bottom = -10;
		shadowCamera.updateProjectionMatrix();
		// 阴影辅助对象
		const shadowHelper = new CameraHelper(shadowCamera);
		scene.add(shadowHelper);

		// 创建平面、球体、立方体
		// ===========================================================
		const planeSize = 40;
		// 平面
		//------------------Plane start----------------------------
		const loader = new TextureLoader();
		const texture = loader.load(checkerUrl);
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
		texture.magFilter = NearestFilter;
		texture.repeat.set(planeSize/2, planeSize/2);
		const planeGeo = new PlaneGeometry(planeSize, planeSize);
		const planeMat = new MeshPhongMaterial({ // 材质
			map: texture,
			side: DoubleSide
		})
		const planeMesh = new Mesh(planeGeo, planeMat);
		planeMesh.receiveShadow = true;
		planeMesh.rotation.x = Math.PI * -0.5;
		scene.add(planeMesh);
		//-------------------Plane end ------------------------------

		// 立方体
		// --------------------Box start-----------------------------
		const material = new MeshPhongMaterial({
			color: 0x88AACC
		});
		const boxMat = new BoxGeometry(4,4,4);
		const boxMesh = new Mesh(boxMat, material);
		boxMesh.castShadow = true; // 开启投影映射
		boxMesh.receiveShadow = true; // 开启接收投影
		boxMesh.position.set(5, 3, 0);
		scene.add(boxMesh);
		//----------------------Box end--------------------------------

		// 球体
		// ----------------------Sphere start--------------------------
		const sphereMat = new SphereGeometry(3, 12, 16);
		const sphereMesh = new Mesh(sphereMat, material);
		sphereMesh.castShadow = true;
		sphereMesh.receiveShadow = true;
		sphereMesh.position.set(-4, 5, 0);
		scene.add(sphereMesh);
		//----------------------Sphere end--------------------------------

		// 渲染器渲染
		// ===============================================================
		const render = ()=>{
			cameraHelper.update();
			lightHelper.update();
			shadowHelper.update();

			renderer.render(scene, camera)
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
	}, [canvasRef])


	return <canvas ref={canvasRef}/>
}

export default HelloShadow;
