import React, {useEffect} from "react";
import {BoxGeometry, Color, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const useCreateScene = (canvasRef: React.RefObject<HTMLCanvasElement>)=>{
	useEffect(()=>{
		if(canvasRef.current === null) return;

		const renderer = new WebGLRenderer({canvas:canvasRef.current});
		const scene = new Scene();
		scene.background = new Color(0x222222);
		const camera = new PerspectiveCamera(45, 2, 0.1, 100);
		camera.position.set(0, 5, 10);

		const light = new DirectionalLight(0xFFFFFF, 1);
		light.position.set(5, 10, 0);
		scene.add(light);

		const controls = new OrbitControls(camera, canvasRef.current);
		controls.update();

		const colors = [0xFF0000, 0x00FF00, 0x0000FF];
		const cubes:Mesh[] = [];
		colors.forEach((color, index)=>{
			const material = new MeshPhongMaterial({color});
			const geo = new BoxGeometry(2,2,2);
			const mesh = new Mesh(geo, material);
			mesh.position.x = (index -1) * 4;
			scene.add(mesh);
			cubes.push(mesh);
		})

		const render = (time: number) =>{
			time  *= 0.001;
			cubes.forEach(cube=>{
				cube.rotation.x = cube.rotation.y = time;
			})
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		const handleResize = ()=>{
			if(canvasRef.current === null) return;
			const width =  canvasRef.current.clientWidth;
			const height = canvasRef.current.clientHeight;
			camera.aspect = width /height;
			camera.updateProjectionMatrix()
			renderer.setSize(width, height, false);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return ()=>{
			window.removeEventListener('resize', handleResize);
		}
	}, [canvasRef])
}

export default useCreateScene;
