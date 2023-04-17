import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import React, { useEffect, useRef } from "react";

const HelloWorld: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const width = window.innerWidth - 325;
	const height = window.innerHeight - 20;

	useEffect(() => {
		start();
	}, []);

	const start = () => {
		if (canvasRef.current) {
			// 1. 初始化场景：添加场景、照相机、renderer渲染器
			// ===================================================================
			// 创建场景
			const scene = new Scene();
			// 设置相机（视野，显示的宽高比，近裁剪面，远裁剪面）
			const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
			// 渲染器
			const renderer = new WebGLRenderer({ canvas: canvasRef.current });
			// 设置渲染器的高度和宽度，如果加上第三个值false，则按场景大学奥显示，等比例缩放
			renderer.setSize(width, height);
			// 将render渲染器的dom元素（render.domElement）添加到html文档中，这是渲染器用来显示场景的canvas元素

			// 2. 添加立方体
			// ====================================================================
			// 盒子模型（BoxGeometry）这是一个包含立方体所有顶点和填充颜色的对象
			const geometry = new BoxGeometry(1, 1, 1);
			// 使用网孔基础材料（MeshBasicMaterial）进行着色器，这里只绘制一个而绿色
			const material = new MeshBasicMaterial({ color: 0x00ff00 });
			// 使用网孔（Mesh）来承载几何模型
			const cube = new Mesh(geometry, material);
			// 将模型添加到场景中
			scene.add(cube);
			// 将相机沿z轴偏移5
			camera.position.z = 5;

			// 3. 渲染场景
			// ====================================================================
			// 设置一个动画函数
			const render = (time: number) => {
				time = time * 0.001;
				// 一秒钟调用60次，也就是以每秒60帧的频率来绘制场景
				// 每次调用模型的沿xy轴旋转0.01
				cube.rotation.x = time;
				cube.rotation.y = time;
				//使用渲染器把场景和相机都渲染出来
				renderer.render(scene, camera);
				requestAnimationFrame(render);
			};

			requestAnimationFrame(render);
		}
	};

	return <canvas ref={canvasRef} />;
};

export default HelloWorld;
