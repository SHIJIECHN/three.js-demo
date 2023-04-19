
import {Mesh, MeshPhongMaterial, Object3D, PointLight, SphereGeometry} from "three";
// 创建一个球体
const sphere =  new SphereGeometry(1,6,6);

// 创建太阳
const sunMaterial = new MeshPhongMaterial({emissive: 0xFFFF00})
const sumMesh = new Mesh(sphere,sunMaterial);
sumMesh.scale.set(4,4,4); // 将球体放大4倍

// 创建地球
const earthMaterial = new MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new Mesh(sphere, earthMaterial);

// 创建月球
const moonMaterial = new MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new Mesh(sphere, moonMaterial);
moonMesh.scale.set(0.5,0.5,0.5); // 将球体尺寸缩小0.5倍

// 创建一个3D空间，用来容纳月球，相当于月球轨迹空间
export const moonOribit = new Object3D();
moonOribit.position.x = 2;
moonOribit.add(moonMesh);

// 创建一个3D空间，用来容纳地球，相当于地球轨迹空间
export const earthOribit = new Object3D();
earthOribit.position.x = 10;
earthOribit.add(earthMesh);
earthOribit.add(moonOribit);

// 创建一个3D空间，用来容纳太阳和地球（含地球）
export const solarSystem = new Object3D();
solarSystem.add(sumMesh);
solarSystem.add(earthOribit);

// 创建点光源
export const pointLight = new PointLight(0xFFFFFF, 3);

export default {}
