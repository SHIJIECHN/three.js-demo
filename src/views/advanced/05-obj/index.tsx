import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import windmillObjUrl from '@/assets/model/windmill.obj'
import windmillMtlUrl from '@/assets/model/windmill.mtl'
import {useEffect, useRef} from "react";
import {HemisphereLight, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";

const getResourceUrl = (url: string) =>{
	return new URL(url, import.meta.url).href;
}

// const promise = loader.loadAsync(windmillUrl, (event)=>{
// 	console.log(Math.floor((event.loaded * 100) / event.total) + '% loaded');
// })
// promise.then((group)=>{
// 	console.log(group)
// })

const HelloOBJLoader = ()=>{
	const canvasRef = useRef<HTMLCanvasElement| null>(null);

	useEffect(()=>{
		if(canvasRef.current === null) return;

		const  renderer = new WebGLRenderer({canvas: canvasRef.current});
		const scene = new Scene();
		const camera = new PerspectiveCamera(45, 2, 0.1, 100);
		camera.position.set(10, 0, 10);

		const light = new HemisphereLight(0xFFFFFFF, 0x333333, 1); // 半球光线
		scene.add(light);

		const control = new OrbitControls(camera, canvasRef.current);
		control.update();

		// 加载模型
		const mtlLoader = new MTLLoader();
		const objLoader = new OBJLoader();
		mtlLoader.setPath('../public/model/');
		mtlLoader.load('../model/windmill.mtl', (materialCreator)=>{
			objLoader.setMaterials(materialCreator);
			objLoader.setPath('../public/model/')
			objLoader.load('windmill.obj', (group)=>{
				scene.add(group)
			})
		})
		// loader.load(windmillUrl, (group)=>{
		// 	console.log(group);
		// 	scene.add(group)
		// }, (event)=>{
		// 	console.log(Math.floor((event.loaded * 100) / event.total) + '% loaded');
		// }, (error)=>{
		// 	console.log(error.type)
		// })

		const render = () =>{
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		const handleResize =()=>{
			if(canvasRef.current === null) return;

			const width = canvasRef.current.clientWidth;
			const height  = canvasRef.current.clientHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize);
		}
	})

	return (
		<canvas  ref={canvasRef}/>
	)
}

export default HelloOBJLoader;