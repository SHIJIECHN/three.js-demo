import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {Mesh, Object3D} from "three";
import {createMaterial} from "../index";

	// 1. 最原始的方式加载
	// =====================================================================
	// const loader = new FontLoader()
	// const url = 'https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json';
	// const onLoadHandle = (responseFont: Font)=>{
	// 	console.log(responseFont)
	// }
	//
	// const onProgressHandle = (event: ProgressEvent<EventTarget>) =>{
	// 	console.log(event);
	// }
	//
	// const onErrorHandle = (error: ErrorEvent) => {
	// 	console.log(error);
	// }
	//
	// loader.load(url, onLoadHandle, onProgressHandle, onErrorHandle);

	// 2. 使用async/await
	const loadFont: (url: string) => Promise<Font> = (url)=>{
		const loader = new FontLoader();
		return new Promise((resolve, reject:(error:ErrorEvent)=> void)=>{
			loader.load(url, resolve, undefined, reject)
		})
	}

	const createText = async ()=>{
		const url = 'https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json';

		const font = await loadFont(url);

		const geometry = new TextGeometry('hello', {
			font: font,
			size: 3.0,
			height: .2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.15,
			bevelSize: .3,
			bevelSegments: 5
		});

		const mesh = new Mesh(geometry, createMaterial());

		// Three.js默认是以文字左侧为中心旋转点，下面代码将文字旋转点位置该为文字的中心
		geometry.computeBoundingBox();
		geometry.boundingBox?.getCenter(mesh.position).multiplyScalar(-1);

		const text = new Object3D();
		text.add(mesh);
		return text
	}

export  default createText;
