import {
	Color,
	DirectionalLight, DoubleSide,
	HemisphereLight, Material, MathUtils,
	Mesh, MeshBasicMaterial, MeshPhongMaterial, NearestFilter,
	Object3D,
	PerspectiveCamera, PlaneGeometry, RepeatWrapping,
	Scene, SphereGeometry,
	TextureLoader,
	WebGLRenderer
} from "three";
import {useEffect, useRef} from "react";
import checkerUrl from '@/assets/basic/checker.png'
import roundshadow from '@/assets/basic/roundshadow.png'
import {resolveBaseUrl} from "vite";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface SphereShadowBase{
	base: Object3D,
	sphereMesh: Mesh,
	shadowMesh: Mesh,
	y: number
}

/**
 * 1. 一个类似黑白棋盘一样的地面
 * 2. 在这个平台上面有15个跳动的小球
 * 3. 每个小球颜色均不同
 * 4. 每个小球在一定范围内循环、且有规律的跳动
 * 5. 每个小球都有自己在地面上的阴影。这个阴影四模拟出来的
 * 6. 小球阴影随着小球跳动而做出对应的位置、浓度（明暗）变化
 * @constructor
 */
const HelloFakeShadow = ()=>{
	const canvasRef=  useRef<HTMLCanvasElement>(null)

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}
		// 创建渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current,})
		renderer.useLegacyLights = false; // 按照物理矫正正确光照的模式来渲染场景

		// 创建相机
		const camera = new PerspectiveCamera(45, 2, 0.1, 1000);
		camera.position.set(0, 10, 20); // 设置相机的位置

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0xFFFFFF); // 设置场景的背景颜色

		// 创建球面灯光
		const hemisphereLight = new HemisphereLight(0xB1E1FF, 0xB97A20, 2);
		scene.add(hemisphereLight); // 将灯光添加到场景中
    // 创建平行灯光
		const directionalLight = new DirectionalLight(0xFFFFFF, 1);
		directionalLight.position.set(0, 10, 5); // 灯光的位置
		directionalLight.target.position.set(-5, 0,0); // 照射的目标位置
		scene.add(directionalLight); // 将灯光添加到场景中
		scene.add(directionalLight.target);

		// 创建平面
		const planeSize = 40; // 平面大小
		const loader = new TextureLoader();
		const texture = loader.load(checkerUrl); // 纹理
		texture.wrapS = RepeatWrapping; // 纹理水平方向的重复方式
		texture.wrapT = RepeatWrapping;
		texture.magFilter = NearestFilter; // 纹理方法的方式
		texture.repeat.set(planeSize/2, planeSize/2); // 纹理重复的大小
		const planeMaterial = new MeshBasicMaterial({ // 创建平面材质
			map: texture,
			side: DoubleSide
		})
		planeMaterial.color.setRGB(1.5, 1.5, 1.5); // 平面材质的颜色
		const planeGeo = new PlaneGeometry(planeSize, planeSize); // 创建平面几何
		const mesh = new Mesh(planeGeo, planeMaterial);// 创建平面网格
		mesh.rotation.x = Math.PI * -0.5; // 网格x轴旋转
		scene.add(mesh); // 将网格添加到场景中

		const shadowTexture = loader.load(roundshadow);
		const basesArray: SphereShadowBase[] = []// 所有球体假阴影对应的数组

		const sphereRadius = 1;
		const sphereGeo = new SphereGeometry(sphereRadius, 32, 16);
		const shadowSize = 1;// 加阴影的尺寸
		const shadowGeo = new PlaneGeometry(shadowSize, shadowSize);// 假阴影对应的集合平面

		const numberSphere = 15;// 将随机创建15个球体
		for(let i = 0; i < numberSphere; i++){
			const base = new Object3D(); // 创建球和阴影的整体对象
			scene.add(base);

			const shadowMat = new MeshBasicMaterial({
				map: shadowTexture,
				transparent: true, // 启用透明度，否则渲染出的阴影为一个整体的黑块
				depthWrite: false // 降低阴影渲染精度，让阴影更加模糊平滑
			})

			const shadowSize = sphereRadius * 4;
			const shadowMesh = new Mesh(shadowGeo, shadowMat);
			shadowMesh.rotation.y = 0.001; // 让阴影更加贴近地面
			shadowMesh.rotation.x = Math.PI * -0.5;
			shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
			base.add(shadowMesh);

			const sphereMat = new MeshPhongMaterial();
			sphereMat.color.setHSL(i/numberSphere, 1, 0.75);
			const sphereMesh = new Mesh(sphereGeo, sphereMat);
			sphereMesh.position.set(0, sphereRadius + 2, 0);
			base.add(sphereMesh);

			basesArray.push({
				base,
				sphereMesh,
				shadowMesh,
				y: sphereMesh.position.y
			})
		}

		const controls = new OrbitControls(camera, canvasRef.current);
		controls.target.set(0, 5, 0);
		controls.update();

		const render = (time: number)=>{
			time = time * 0.001;

			basesArray.forEach((item, index)=>{
				const {base, sphereMesh, shadowMesh, y} = item;

				const u = index / basesArray.length;
				const speed = time * 0.2;
				const angle = speed + u * Math.PI * 2 * (index % 1? 1 : -1);
				const radius = Math.sin(speed - index) * 10;

				base.position.set(Math.cos(angle)* radius, 0, Math.sin(angle)* radius);
				const yOff = Math.abs(Math.sin(time*2+index));
				sphereMesh.position.y = y + MathUtils.lerp(-2,2,yOff);
				(shadowMesh.material as Material).opacity = MathUtils.lerp(1, 0.25, yOff);// 修改阴影的透明度来模拟阴影的明暗变化
			})

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
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height, false);
		}

		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize);
		}

	}, [canvasRef])

	return <canvas ref={canvasRef} />
}

export default HelloFakeShadow;
