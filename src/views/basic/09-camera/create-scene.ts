import {
	AxesHelper,
	BoxGeometry,
	DoubleSide,
	Material, Mesh,
	MeshPhongMaterial,
	MeshStandardMaterial,
	NearestFilter, PlaneGeometry,
	RepeatWrapping,
	Scene, SphereGeometry,
	TextureLoader
} from "three";

import checkerUrl from '@/assets/basic/checker.png'
export enum MaterialType{
	MESH_PHONE_MATERIAL = 'MESH_PHONE_MATERIAL',
	MESH_STANDARD_MATERIAL = 'MESH_STANDARD_MATERIAL',
}

/**
 * 创建基础场景
 * 1. 场景中包含1个黑白网格的地面、1个立方体、1个球体，但是该场景不包含任何灯光
 * 2. 创建基础场景时接收一个参数type，type只能为一下2个值其中的一种：MESH_PHONE_MATERIAL和MESH_STANDARD_MATERIAL
 * 3. type默认值是MESH_PHONE_MATERIAL
 * 由于ReactLight之作用在MeshStandardMaterial和MeshPhysicalMaterial材料物体上，所以才设置type这个参数：
 * 1. 当使用ReactLight时，告知createScene，使用MeshStandardMaterial材质创建地面、立方体、球体
 * 2. 当使用其他灯光是，使用MeshPhongMaterial材质创建地面、立方体、球体
 * @param type
 */
const createScene:(type?: keyof typeof MaterialType)=>Scene = (type= MaterialType.MESH_PHONE_MATERIAL)=>{

	const scene = new Scene();
	// 添加辅助坐标轴
	const axes = new AxesHelper();
	const material = axes.material as Material;
	material.depthTest = false;
	axes.renderOrder = 1;
	scene.add(axes)

	const planSize = 40;

	const loader = new TextureLoader();
	const texture = loader.load(checkerUrl);
	texture.wrapS = RepeatWrapping;
	texture.wrapT = RepeatWrapping;
	texture.magFilter = NearestFilter;
	texture.repeat.set(planSize/2,planSize/2); // 水平方向和垂直方向重复次数

	let planeMat: Material;
	let cubeMat: Material;
	let sphereMat: Material;
	switch (type) {
		case MaterialType.MESH_STANDARD_MATERIAL:
			planeMat = new MeshStandardMaterial({
				map: texture,
				side: DoubleSide
			})
			cubeMat = new MeshStandardMaterial({color: '#8AC'});
			sphereMat = new MeshStandardMaterial(({color: '#8AC'}));
			break;
		default:
			planeMat = new MeshPhongMaterial({
				map: texture,
				side: DoubleSide
			})
			cubeMat = new MeshPhongMaterial({color: '#8AC'});
			sphereMat = new MeshPhongMaterial({color: '#8AC'});
	}
	const planeGeo = new PlaneGeometry(planSize,planSize);
	const mesh = new Mesh(planeGeo, planeMat);
	mesh.rotation.x = Math.PI * -0.5;
	scene.add(mesh);

	const cubeGeo = new BoxGeometry(4,4,4);
	const cubeMesh = new Mesh(cubeGeo, cubeMat);
	cubeMesh.position.set(5,2.5,0);
	scene.add(cubeMesh);

	const sphereGeo = new SphereGeometry(3, 32, 16);
	const sphereMesh = new Mesh(sphereGeo, sphereMat);
	sphereMesh.position.set(-4,5,0);
	scene.add(sphereMesh);

	return scene;
}

export default createScene;
