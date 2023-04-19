import React, { useEffect, useRef } from "react";
import { BoxGeometry, DirectionalLight, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const DrawingCube = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const resizeHandleRef = useRef<() => void>();

	useEffect(() => {
		if (canvasRef.current) {
			// 1. 初始化场景：添加场景、照相机、渲染器
			// =================================================================
			// 创建渲染器
			const renderer = new WebGLRenderer({ canvas: canvasRef.current });
			// 创建相机
			const camera = new PerspectiveCamera(75, 2, 0.1, 5);
			// 创建场景
			const scene = new Scene();

			// 2. 添加几何体
			// =================================================================
			// 创建几何体
			const geometry = new BoxGeometry(1, 1, 1);
			// 创建材质
			const material1 = new MeshBasicMaterial({ color: 0x44aa88 });
			const material2 = new MeshBasicMaterial({ color: 0xc50d0d });
			const material3 = new MeshBasicMaterial({ color: 0x39b20a });
			// 创建网格
			const cube1 = new Mesh(geometry, material1);
			cube1.position.x = -2;
			scene.add(cube1); // 将网格添加到场景中

			const cube2 = new Mesh(geometry, material2);
			cube2.position.x = 0;
			scene.add(cube2); // 将网格添加到场景中

			const cube3 = new Mesh(geometry, material3);
			cube3.position.x = 2;
			scene.add(cube3); // 将网格添加到场景中

			const cubes = [cube1, cube2, cube3];

			// 创建光源
			const light = new DirectionalLight(0xffffff, 1);
			light.position.set(-1, 2, 4);
			scene.add(light); // 将光源添加到场景中

			// 设置透视镜头的Z轴距离，以便以某个距离开观察几何体。在初始化透视镜头时，色湖之的近平面为0.1，远平面为5，座椅camera.position.z值应该在0.1和5之间
			camera.position.z = 4;

			// 添加自动旋转渲染东环
			const render = (time: number) => {
				time = time * 0.001;

				cubes.forEach((cube) => {
					cube.rotation.x = time;
					cube.rotation.y = time;
				});

				renderer.render(scene, camera);
				window.requestAnimationFrame(render);
			};
			window.requestAnimationFrame(render);

			const handleResize = () => {
				const canvas = renderer.domElement; // 获取canvas
				camera.aspect = canvas.clientWidth / canvas.clientHeight; // 设置镜头宽高比
				camera.updateProjectionMatrix(); // 通知镜头更新视锥（视野）
				renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
			};

			handleResize(); // 默认打开时，即重新触发一次

			resizeHandleRef.current = handleResize; // 将resizeHandleRef.current于useEffect中声明的函数进行绑定
			// window.addEventListener("resize", handleResize); // 添加窗口resize事件处理函数

			// 修改为使用ResizeObserver来监听尺寸变化
			const resizeObserver = new ResizeObserver(()=>{
				handleResize();
			})
			resizeObserver.observe(canvasRef.current)

			return () => {
				if (resizeHandleRef && resizeHandleRef.current) {
					// window.removeEventListener("resize", resizeHandleRef.current);
					resizeObserver.disconnect();
				}
			};
		}
	}, [canvasRef]);

	return <canvas ref={canvasRef} />;
};

export default DrawingCube;
