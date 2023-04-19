
import imgSrc from '@/assets/basic/mapping.jpg';
import imgSrc1 from '@/assets/basic/flower-1.jpg'
import imgSrc2 from '@/assets/basic/flower-2.jpg'
import imgSrc3 from '@/assets/basic/flower-3.jpg'
import imgSrc4 from '@/assets/basic/flower-4.jpg'
import imgSrc5 from '@/assets/basic/flower-5.jpg'
import imgSrc6 from '@/assets/basic/flower-6.jpg'

import {useEffect, useRef} from "react";
import {
	BoxGeometry,
	Color,
	LoadingManager,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	TextureLoader,
	WebGLRenderer
} from "three";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
// 引入图片资源

const HelloTexture = ()=>{
	const canvasRef = useRef<HTMLCanvasElement|null>(null);

	useEffect(()=>{
		if(canvasRef.current === null){
			return;
		}
		// 创建场景
		const renderer = new WebGLRenderer({canvas: canvasRef.current});

		// 创建相机
		const camera = new PerspectiveCamera(40, 2, 0.1, 1000);
		camera.position.set(0,0,40);

		// 创建场景
		const scene = new Scene();
		scene.background = new Color(0xcccccc);

		// 创建加载器
		// 1. 6个面都是统一张贴图
		// const loader = new TextureLoader();
		// const material = new MeshBasicMaterial({
		// 	// loader.load('xxx.jpg')返回值为Text类型实例
		// 	map: loader.load(imgSrc,
		// 		(texture)=>{
		// 			console.log('纹理图片加载完成');
		// 			console.log(texture);
		// 			console.log(texture.image.currentSrc) // 图片实际加载的地址
		// 		},
		// 		(event)=>{
		// 			console.log('纹理图片加载中');
		// 			console.log(event)
		// 		},
		// 		(error)=>{
		// 		  console.log('纹理图片加载失败');
		// 		  console.log(error);
		// 		}
		// 		),
		// });


		// // 2. 每个面不同的贴图
		// const loader = new TextureLoader();
		//
		// const imgSrcArr = [imgSrc1, imgSrc2,imgSrc3,imgSrc4,imgSrc5,imgSrc6];
		// // 创建一组材质,每个次啊之对应立方体每个面所用到的材质
		// const materialArr : MeshBasicMaterial[] = [];
		// imgSrcArr.forEach((src)=>{
		// 	materialArr.push(new MeshBasicMaterial({
		// 		map: loader.load(src)
		// 	}))
		// })

		// 使用纹理加载管理器
		// 创建所有纹理加载的管理器
		const loadingManager = new LoadingManager();
		// 创建一个纹理加载器
		const loader = new TextureLoader(loadingManager);
		// 创建6个面对应的材质
		const materialArr: MeshBasicMaterial[] = [];
		for(let i=0; i < 6; i++){
			materialArr.push(new MeshBasicMaterial({
				map: loader.load(`imgSrc${i}`)
			}))
		}
		// 添加加载管理器的各种事件处理函数
		loadingManager.onLoad = ()=>{
			console.log('纹理图片资源加载完成')
		}
		loadingManager.onProgress = (url, loaded, total)=>{
			console.log(`图片加载中,共${total}张,当前已加载${loaded}张${url}`);
		}
		loadingManager.onError = (url)=>{
			console.log(`加载失败 ${url}`);
		}

		// 创建物体
		const box = new BoxGeometry(8,8,8);
		const mesh = new Mesh(box, materialArr);
		scene.add(mesh);

		// 渲染器渲染

		const render = (time:number)=>{
			time = time * 0.001;
			mesh.rotation.x = time;
			mesh.rotation.y = time;
			renderer.render(scene, camera);

			window.requestAnimationFrame((render))
		}
		window.requestAnimationFrame(render);

		const resizeHandle = ()=>{
			const canvas = renderer.domElement;
			camera.aspect = (canvas.clientWidth / canvas.clientHeight);
			camera.updateProjectionMatrix();
			renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		}
		resizeHandle();
		window.addEventListener('resize', resizeHandle);

		return ()=>{
			window.removeEventListener('resize', resizeHandle);
		}
	}, [canvasRef])

	return <canvas ref={canvasRef}/>
}

export default HelloTexture;
