
import worldUrl from '@/assets/basic/world.jpg'
import  ascUrl  from '@/assets/data/gpw_v4_basic_2010_cntm_1_deg.asc'
import {
	BoxGeometry, BufferAttribute, Color,
	MathUtils,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	Object3D, PerspectiveCamera,
	Scene, SphereGeometry,
	Texture,
	TextureLoader,
	WebGLRenderer
} from "three";
import {useEffect, useRef} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";
// 加载人口数据文件
const loadDataFile = async(url: string)=>{
	const res = await window.fetch(url);
	const text = await res.text(); // text 就是.asc 文件里面的内容
	return text;
}

// loadDataFile(ascUrl);

// 解析人口数据
type DataType = (number|undefined)[][];
type ASCData = {
	data: DataType,
	ncols: number,
	nrows: number,
	xllcorner: number,
	yllcorner: number,
	cellsize: number,
	NODATA_value: number,
	max: number,
	min: number
}

// 解析asc文件内容
const parseData = (text: string)=>{
	const data: (number| undefined)[][] = [];
	const settings: {[key: string]: any} = {data};
	let max: number = 0;
	let min: number = 99999;
	// 对每一行进行切分
	text.split('\n').forEach((line)=>{
		const parts = line.trim().split(/\s+/);
		if(parts.length ===2 ){ // 长度为2的必定是键值对
			settings[parts[0]] = parseFloat(parts[1]);
		}else if(parts.length > 2){ // 长度超过2的肯定是网格数据
			const values = parts.map((item)=>{
				const value = parseFloat(item);
				if(value === settings['NODATA_value']){
					return undefined
				}
				max = Math.max(max, value);
				min = Math.min(min, value);
				return value;
			})
			data.push(values);
		}
	})
	return { ...settings, ...{max, min}} as ASCData
}

const hsl = (h: number, s: number, l: number)=>{
	return `hsl(${h * 360 | 0}, ${s * 100 | 0}%, ${l * 100 |0}%)`
}

let renderRequested = false;

// 加载地球纹理图片
const loader = new TextureLoader();
// const texture = loader.load(worldUrl, render); // 当纹理图片加载完成后，才执行render渲染

const HelloEarth = () =>{
	const canvasRef = useRef<HTMLCanvasElement|null>(null);
	/**
	 * 每个数据画一个点
	 */
	// const drawData = (ascData: ASCData) => {
	// 	if (canvasRef.current === null) { return }
	// 	const ctx = canvasRef.current.getContext('2d')
	// 	if (ctx === null) { return }
	//
	// 	const range = ascData.max - ascData.min
	// 新建一个和网格数据尺寸相等的canvas
	// 	ctx.canvas.width = ascData.ncols
	// 	ctx.canvas.height = ascData.nrows
	// 用黑灰色填充
	// 	ctx.fillStyle = '#444'
	// 	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	// 绘制数据点
	// 	ascData.data.forEach((row, rowIndex) => {
	// 		row.forEach((value, colIndex) => {
	// 			if (value === undefined) { return }
	// 			const amount = (value - ascData.min) / range
	// 			const hue = 1
	// 			const saturation = 1
	// 			const lightness = amount
	// 			ctx.fillStyle = hsl(hue, saturation, lightness)
	// 			ctx.fillRect(colIndex,rowIndex,1,1)
	// 		})
	// 	})
	// }

	/**
	 * 绘制3D立方体地球，并在球体上添加柱状物
	 * @param ascData
	 * @param scene
	 */
	const addBoxes = (ascData: ASCData, scene: Scene) =>{
		// // 新建一个box
		// const geometry :BoxGeometry = new BoxGeometry(1,1,1);
		// // 沿着 Z 轴缩放
		// geometry.applyMatrix4(new Matrix4().makeTranslation(0,0,0.5));

		const lonHelper: Object3D<Event> = new Object3D(); // 用于赤道上的经度旋转
		scene.add(lonHelper);

		const latHelper:Object3D<Event> = new Object3D(); // 用于纬度旋转
		lonHelper.add(latHelper);

		const positionHelper:Object3D<Event> = new Object3D(); // 用于Z轴（地球地面）上的偏移
		positionHelper.position.z = 1;
		latHelper.add(positionHelper); // positionHelper是由lonHelper和latHelper逐级组合而来，它可以帮助我们计算球面上的经纬度来放置几何体

		// 用来定位盒子的中心，以便接下来沿着z轴缩放
		const originHelper = new Object3D();
		originHelper.position.z = 0.5;
		positionHelper.add(originHelper);

		const range:number = ascData.max - ascData.min;
		const lonFudge: number = Math.PI * 0.5; // 相当于1/4个圆（地球1/4圈）
		const latFudge: number = Math.PI * -0.135;
		const geometries: BoxGeometry[] = [];
		const color = new Color();
		ascData.data.forEach((row:(number|undefined)[], latIndex:number):void=>{
			row.forEach((value:number|undefined, lonIndex:number):void=>{
				if(value === undefined) { return}
				const amount:number = (value - ascData.min) / range;
				// const material:MeshBasicMaterial = new MeshBasicMaterial();
				// const hue:number = MathUtils.lerp(0.7, 0.3, amount);
				// const saturation: number = 1;
				// const lightness:number = MathUtils.lerp(0.1, 1, amount);
				// material.color.setHSL(hue, saturation, lightness);
				// const mesh: Mesh<BoxGeometry, MeshBasicMaterial> = new Mesh(geometry, material);
				// scene.add(mesh);
				const geometry = new BoxGeometry(1,1,1);

				lonHelper.rotation.y = MathUtils.degToRad(lonIndex + ascData.xllcorner) + lonFudge;
				latHelper.rotation.x = MathUtils.degToRad(latIndex + ascData.yllcorner) + latFudge;

				// positionHelper.updateWorldMatrix(true, false);
				// mesh.applyMatrix4(positionHelper.matrixWorld);
				// mesh.scale.set(0.005, 0.005, MathUtils.lerp(0.001, 0.5, amount))

				positionHelper.scale.set(0.005, 0.005, MathUtils.lerp(0.01, 0.5, amount));
				originHelper.updateWorldMatrix(true, false);
				geometry.applyMatrix4(originHelper.matrixWorld);

				// 计算颜色
				const hue = MathUtils.lerp(0.7, 0.3, amount);
				const saturation = 1;
				const lightness = MathUtils.lerp(0.4, 1, amount);
				color.setHSL(hue, saturation, lightness);
				// 以0到255之间的值数组形式获取颜色
				const rgb = color.toArray().map((value)=>{
					return value * 255;
				})
				// 创建一个数组来存储每个顶点的颜色
				const numVerts = geometry.getAttribute('position').count; // 通过position属性获取所需的数量和顶点
				const itemSize = 3; // r, g, b
				const colors = new Uint8Array(itemSize * numVerts); // 创建Uint8Array来输入颜色

				// 将颜色复制到每个顶点的颜色数组中
				colors.forEach((_, index)=>{
					colors[index] = rgb[index % 3]
				})

				const normalized = true;
				const colorAttrib = new BufferAttribute(colors, itemSize, normalized);
				geometry.setAttribute('color', colorAttrib); // 设置color属性
				geometries.push(geometry);
			})
		})

		const mergedGeometry = mergeBufferGeometries(geometries);
		const material = new MeshBasicMaterial({
			vertexColors: true, // 使用顶点上色
		})
		const mesh = new Mesh(mergedGeometry, material);
		scene.add(mesh);
	}


	useEffect(()=>{
		if(canvasRef.current === null) return;

		const canvas = canvasRef.current;
		const renderer:WebGLRenderer = new WebGLRenderer({antialias: true, canvas});
		const camera:PerspectiveCamera = new PerspectiveCamera(45, 2, 0.1, 100);
		camera.position.z = 4;
		const scene = new Scene();
		scene.background = new Color('black');

		const controls: OrbitControls = new OrbitControls(camera, canvas);
		controls.enableDamping = true;
		controls.enablePan = false;
		controls.update();

		const render = () =>{
			renderRequested = false;
			controls.update();
			renderer.render(scene, camera);
		}

		const handleChange = ()=>{
			if(renderRequested === false){
				renderRequested = true;
				window.requestAnimationFrame(render);
			}
		}

		controls.addEventListener('change', handleChange);

		// 加载球体
		{
			const loader: TextureLoader = new TextureLoader();
			const texture: Texture = loader.load('https://threejs.org/manual/examples/resources/images/world.jpg', render); // 当材质加载完成后才调用render方法
			const material:MeshBasicMaterial = new MeshBasicMaterial({
				map: texture
			})
			const geometry = new SphereGeometry(1, 64, 32);
			const earth = new Mesh(geometry, material);
			scene.add(earth);
		}

		const handleResize = ()=>{
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height, false);
			window.requestAnimationFrame(render);
		}

		handleResize();
		window.addEventListener('resize', handleResize);

		loadDataFile('https://threejs.org/manual/examples/resources/data/gpw/gpw_v4_basic_demographic_characteristics_rev10_a000_014mt_2010_cntm_1_deg.asc').then(res=>{
			const ascData = parseData(res);
			// drawData(ascData)
			addBoxes(ascData, scene);
			render()
		}).catch(e=>{
			console.log(e)
		})

		return ()=>{
			controls.removeEventListener('change', handleChange);
			window.removeEventListener('resize', handleResize);
		}
	})

	return <canvas ref={canvasRef}/>
}
export default HelloEarth
