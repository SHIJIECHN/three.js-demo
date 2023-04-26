import imgSrc from '@/assets/basic/mapping.jpg';
import imgSrc1 from '@/assets/basic/flower-1.jpg'
import imgSrc2 from '@/assets/basic/flower-2.jpg'
import imgSrc3 from '@/assets/basic/flower-3.jpg'
import imgSrc4 from '@/assets/basic/flower-4.jpg'
import imgSrc5 from '@/assets/basic/flower-5.jpg'
import imgSrc6 from '@/assets/basic/flower-6.jpg'

import {useEffect, useRef} from "react";
import {
	BoxGeometry, ClampToEdgeWrapping,
	Color,
	LoadingManager, MathUtils,
	Mesh,
	MeshBasicMaterial, MirroredRepeatWrapping,
	PerspectiveCamera, RepeatWrapping,
	Scene, Texture,
	TextureLoader,
	WebGLRenderer
} from "three";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {GUI} from "dat.gui";
import {StringToNumberHelper} from "@/views/basic/07-texture/helper";
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
		const loader = new TextureLoader();
		const texture = loader.load(imgSrc,
			(texture)=>{
				console.log('纹理图片加载完成');
				console.log(texture);
				console.log(texture.image.currentSrc) // 图片实际加载的地址
			},
			(event)=>{
				console.log('纹理图片加载中');
				console.log(event)
			},
			(error)=>{
				console.log('纹理图片加载失败');
				console.log(error);
			}
		)
		const material = new MeshBasicMaterial({
			// loader.load('xxx.jpg')返回值为Text类型实例
			map: texture,
		});


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

		// 3. 使用纹理加载管理器
		// 创建所有纹理加载的管理器
		// const loadingManager = new LoadingManager();
		// // 创建一个纹理加载器
		// const loader = new TextureLoader(loadingManager);
		// // 创建6个面对应的材质
		// const materialArr: MeshBasicMaterial[] = [];
		// for(let i=0; i < 6; i++){
		// 	materialArr.push(new MeshBasicMaterial({
		// 		map: loader.load(`imgSrc${i}`)
		// 	}))
		// }
		// // 添加加载管理器的各种事件处理函数
		// loadingManager.onLoad = ()=>{
		// 	console.log('纹理图片资源加载完成')
		// }
		// loadingManager.onProgress = (url, loaded, total)=>{
		// 	console.log(`图片加载中,共${total}张,当前已加载${loaded}张${url}`);
		// }
		// loadingManager.onError = (url)=>{
		// 	console.log(`加载失败 ${url}`);
		// }

		// 4. 纹理重复、偏移、旋转
		// const loader = new TextureLoader();
		// const texture: Texture = loader.load(imgSrc);
		// texture.wrapS = RepeatWrapping;
		// texture.wrapT = RepeatWrapping;
		// texture.repeat.set(2,3); // 设置水平方向重复2次\垂直方向重复3次
		// texture.offset.set(0.5, 0.25); // 设置纹理水平方向偏移0.5个纹理宽度、垂直方向偏移0.25个纹理宽度
		// texture.center.set(0.5,0.5); // 将旋转中心点改为图片的正中心位置
		// texture.rotation = MathUtils.degToRad(45);// 设置纹理旋转弧度
		// const material = new MeshBasicMaterial({
		// 	map: texture
		// })

		// dat-gui
		const wrapModes = {
			'ClampToEdgeWrapping': ClampToEdgeWrapping,
			'RepeatWrapping': RepeatWrapping,
			'MirroredRepeatWrapping': MirroredRepeatWrapping,
		};

		const updateTexture = ()=> {
			texture.needsUpdate = true;
		}

		const gui = new GUI();
		gui.width = 300;
		type ITexture = {
			obj: Texture,
			props: string
		}
		gui.add< Record<string, unknown>>(new StringToNumberHelper< Record<string, unknown>>(texture, 'wrapS'), 'value',wrapModes).name('texture.wrapS').onChange(updateTexture);
		// @ts-ignore
		gui.add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes);
		// @ts-ignore
		gui.add(texture.repeat, 'x', 0, 5, .01).name('texture.repeat.x')

		// 创建物体
		const box = new BoxGeometry(8,8,8);
		const mesh = new Mesh(box, material);
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
