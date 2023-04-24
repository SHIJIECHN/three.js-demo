import {BoxGeometry, Color, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene} from "three";

// 子场景
const scene = new Scene();
scene.background = new Color(0x00FFFF);

// 镜头
const camera = new PerspectiveCamera(45, 1, 0.1, 10);
camera.position.z = 10;

// 灯光
const light = new DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 10, 10);
scene.add(light);


// 3个立方体
const colors = [0xFF0000, 0x00FF00, 0x0000FF];
const boxes: Mesh[] = [];

colors.forEach((color,index)=>{
	const mat = new MeshPhongMaterial({ color});
	const geo = new BoxGeometry(2,2,2);
	const mesh = new Mesh(geo, mat);
	mesh.position.x = (index -1) *3;
	scene.add(mesh);
	boxes.push(mesh);
})

export default {
	scene,
	boxes,
	camera
}
