import React, { useEffect, useRef } from "react";
import { BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";

const DrawingLine: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const width = window.innerWidth - 325;
	const height = window.innerHeight - 20;

	useEffect(() => {
		start();
	}, []);

	const start = () => {
		if (canvasRef.current) {
			// 1. 初始化场景：创建场景、照相机、渲染器
			// ================================================================
			// 创建场景
			const scene = new Scene();
			// 设置相机（视口，宽高比，近裁剪面，远裁剪面）
			const camera = new PerspectiveCamera(45, width / height, 1, 500);
			//设置相机的视点
			camera.position.set(0, 0, 100);
			//设置相机的朝向
			camera.lookAt(0, 0, 0);
			// 创建渲染器
			const renderer = new WebGLRenderer({ canvas: canvasRef.current });
			// 设置渲染器的高度和宽度，如果加上第三个参数false，则按照场景大小显示，等比缩放
			renderer.setSize(width, height);

			// 2. 添加线
			// ================================================================
			// 定义线的基本材料，可以使用LineBasicMaterial（实线材料）和LineDashedMaterial（虚线材料）
			const material = new LineBasicMaterial({ color: 0x00ff00 });
			const points = [];
			points.push(new Vector3(-10, 0, 0));
			points.push(new Vector3(0, 10, 0));
			points.push(new Vector3(10, 0, 0));
			// 设置集合顶点的集合（Geometry）或缓冲区几何（BufferGeometry）设置顶点位置
			// 一个时直接将数据保存在js里面，另一个时保存在webGL缓冲区内，肯定时保存到WebGL缓冲区的效率高
			const geometry = new BufferGeometry().setFromPoints(points);
			// 使用Line方法将线初始化
			const line = new Line(geometry, material);
			// 将线添加到场景
			scene.add(line);

			// 3. 渲染场景和相机
			// ================================================================
			renderer.render(scene, camera);
		}
	};

	return <canvas ref={canvasRef} />;
};

export default DrawingLine;
