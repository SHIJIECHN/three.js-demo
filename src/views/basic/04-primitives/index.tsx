import {
	BufferGeometry,
	Color,
	DirectionalLight, DoubleSide, LineBasicMaterial,
	LineSegments,
	Mesh,
	MeshPhongMaterial, Object3D,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from "three";
import React, {useCallback, useEffect, useRef} from "react";
import myBox from './my-box';
import myCircle from './my-circle';
import myCone from './my-cone';
import myCylinder from './my-circle';
import myDodecahedron from './my-dodecahedron'
import myExtrude from './my-extrude'
import myIcosahedron from './my-icosahedron'
import myLathe from './my-lathe'
import myOct from './my-octahedron'
import myParam from "@/views/basic/04-primitives/my-parametric";
import myPlan from "@/views/basic/04-primitives/my-plane";
import myPoly from "@/views/basic/04-primitives/my-polyhedron";
import myRing from "@/views/basic/04-primitives/my-ring";
import mySphere from "@/views/basic/04-primitives/my-sphere";
import myShape from "@/views/basic/04-primitives/my-shape";
import myTetra from "@/views/basic/04-primitives/my-tetrahedron";
import myTorus from "@/views/basic/04-primitives/my-torus";
import myTorusKnot from "@/views/basic/04-primitives/my-torus-knot";
import myTube from "@/views/basic/04-primitives/my-tube";
import myWire from "@/views/basic/04-primitives/my-wireframe";
import myEdge from "./my-edges";
import createText from "@/views/basic/04-primitives/my-text";

/**
 * 随机生成材质
 */
export const createMaterial = ()=>{
	const material = new MeshPhongMaterial({side: DoubleSide}); // 两面
	const hue = Math.floor(Math.random() * 100) / 100; // 随机获得一个颜色
	const saturation  = 1; // 饱和度
	const luminance = 0.5; // 亮度
	material.color.setHSL(hue, saturation, luminance); // 材质颜色、饱和度、亮度
	return material;
}

const meshArr:(Mesh|LineSegments|Object3D)[] = []

const HelloPrimitives = ()=>{
	const canvasRef = useRef<HTMLCanvasElement>(null); // canvas元素
	const cameraRef = useRef<PerspectiveCamera|null>(null); // 照相机
	const rendererRef = useRef<WebGLRenderer |null>(null);// 渲染器

	const createInit = useCallback(async ()=>{
		if(canvasRef.current === null){
			return;
		}
		meshArr.length = 0; // 清空数组

		// 初始化场景
		const scene = new Scene();
		scene.background = new Color(0x440088);

		// 初始化镜头
		const camera = new PerspectiveCamera(40, 2, 0.1, 1000);
		camera.position.z = 120;
		cameraRef.current = camera;

		// 初始化渲染器
		const renderer = new WebGLRenderer({canvas: canvasRef.current});
		rendererRef.current = renderer;

		// 添加 2 盏灯光
		const light1 = new DirectionalLight(0xFF0000, 1); // 白色
		light1.position.set(-1,2,4);// 左前上
		scene.add(light1);

		// const light2 = new DirectionalLight(0x0000ff, 1);
		// light2.position.set(1,-2,-4); // 右后下
		// scene.add(light2);

		// 获得各个solid类型的图元实例，并添加到solidPrimitivesArr中
		const solidPrimitivesArr: BufferGeometry[] = [];
		solidPrimitivesArr.push(myBox, myCircle, myCone, myCylinder, myDodecahedron);
		solidPrimitivesArr.push(myExtrude, myIcosahedron, myLathe, myOct, myParam)
		solidPrimitivesArr.push(myPlan, myPoly, myRing, mySphere, myShape)
		solidPrimitivesArr.push(myTetra, myTorus, myTorusKnot, myTube)

		solidPrimitivesArr.forEach((item)=>{
			const material = createMaterial(); // 随机获得一种颜色材质
			const mesh = new Mesh(item, material); // 网格
			meshArr.push(mesh);
		})

		// 创建3D文字，并添加到meshArr中
		meshArr.push(await createText())

		// 获得各个line类型的图元实例，并添加到meshArr中
		const linePrimitivesArr: BufferGeometry[] = [];
		linePrimitivesArr.push(myEdge, myWire)

		// 将各个line类型的图元实例转化为网络，并添加到meshArr中
		linePrimitivesArr.forEach((item)=>{
			const material = new LineBasicMaterial({color: 0x000000}); // 黑色
			const mesh = new LineSegments(item, material);
			meshArr.push(mesh);
		})

		// 定义物体在画面中显示的网格布局
		const eachRow = 5; // 每行显示5个
		const spread = 15; // 行高和列宽

		// 配置每一个图元实例，转换为网络，并位置和材质后，将其添加到场景中
		meshArr.forEach((mesh, index)=>{
			// 设定的排列是每行显示5个，即5个物体、行高和列高均为spread15。因此每个物体根据顺序，计算出自己所在的位置
			const row = Math.floor(index/ eachRow); // 计算出行
			const column = index % eachRow; // 计算出列
			mesh.position.x = (column - 2) * spread; // column - 2是因为希望将每一行物体摆放的单元格依次是：-2、-1、0、1、2，这样可以使整体物体处于居中显示
			mesh.position.y = (2 - row) * spread;
			scene.add(mesh); // 将网格添加到场景中
		})

		// 添加自动旋转渲染动画
		const render = (time: number)=>{
			time = time * 0.001;
			meshArr.forEach(item=>{
				item.rotation.x = time;
				item.rotation.y = time;
			})
			renderer.render(scene, camera); // 渲染器渲染场景和照相机
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);
	}, [canvasRef]);

	const resizeHandle = ()=>{
		// 根据窗口大小变化，重新修改渲染器的视锥
		if(rendererRef.current === null || cameraRef.current === null){
			return;
		}
		const canvas = rendererRef.current.domElement;
		cameraRef.current.aspect = canvas.clientWidth / canvas.clientHeight;
		cameraRef.current.updateMatrix();
		rendererRef.current.setSize(canvas.clientWidth, canvas.clientHeight, false);
	}

	// 组件首次装载到网页后触发，开始创建并初始化3D场景
	useEffect(()=>{
		createInit(); // 初始化场景、渲染器、照相机。并将网格添加到场景中
		resizeHandle();
		window.addEventListener('resize', resizeHandle);
		return ()=>{
			window.removeEventListener('resize', resizeHandle)
		}
	}, [canvasRef, createInit])

	return <canvas ref={canvasRef}/>
}

export default HelloPrimitives;
