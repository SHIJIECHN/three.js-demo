import {useEffect, useRef} from "react";
import {
	BoxGeometry,
	Color,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	Object3D,
	OrthographicCamera,
	Scene, Vector3,
	WebGLRenderer
} from "three";

const state  = { x: 0, y: 0, z: 0};

const PreserveDrawingBuffer = ()=>{
	const canvasRef=  useRef<HTMLCanvasElement|null>(null);

	useEffect(()=>{
		if(canvasRef.current === null) return;

		const renderer = new WebGLRenderer({
			canvas: canvasRef.current,
			preserveDrawingBuffer: true,
			alpha: true
		})
		renderer.autoClear = false;

		const camera = new OrthographicCamera(-2, 2, 1, -1, -1, 1);

		const scene = new Scene();
		scene.background = new Color(0xFFFFFF);

		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(-1, 2,3);
		scene.add(light);

		const geometry = new BoxGeometry(1,1,1);
		const base = new Object3D();
		scene.add(base);
		base.scale.set(0.1, 0.1, 0.1);

		const colors = [0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF];
		const numArr = [-2, 2]; // 同一个坐标轴上，对称2个立方体的坐标
		colors.forEach((color, index)=>{
			const material = new MeshPhongMaterial({color});
			const cube = new Mesh(geometry, material);

			const col = Math.floor(index / numArr.length);
			const row = index % numArr.length;
			let result = [0,0,0];
			result[col] = numArr[row];

			cube.position.set(result[0], result[1], result[2]);

			base.add(cube);
		})

		const temp = new Vector3();
		const updatePosition = (x: number, y: number) => {
			if(canvasRef.current === null) return;
			const resX = x / canvasRef.current.width * 2 - 1;
			const resY = y / canvasRef.current.height * -2 + 1;

			temp.set(resX, resY, 0).unproject(camera);
			state.x = temp.x;
			state.y = temp.y;
		}

		const handleMouseMove = (eve: MouseEvent)=>{
			updatePosition(eve.clientX, eve.clientY);
		}

		const handleTouchMove = (eve: TouchEvent) => {
			eve.preventDefault();
			const touche = eve.touches[0];
			updatePosition(touche.clientX, touche.clientY);
		}

		canvasRef.current.addEventListener('mousemove', handleMouseMove);
		canvasRef.current.addEventListener('touchmove', handleTouchMove, {passive: false});

		const render = (time: number)=>{
			time = time * 0.001;
			base.position.set(state.x, state.y, state.z);
			base.rotation.x = time;
			base.rotation.y = time * 1.11;
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);
		const handleResize = () =>{
			if(canvasRef.current === null) return;
			const width = canvasRef.current.width;
			const height = canvasRef.current.height;
			camera.right = width / height;
			camera.left = - camera.right;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return ()=>{
			window.removeEventListener('resize', handleResize);
		}
	}, [canvasRef])

	return (
		<canvas ref={canvasRef} />
	)
}
