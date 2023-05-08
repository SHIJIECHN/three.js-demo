import '@/styles/react-dat-gui.css'
import './index.less'
import DatGUI, {DatButton} from "react-dat-gui";
import React, {useRef, useState} from "react";
import useCreateScene from "./use-create-scene";

const HelloCanvas = ()=>{
	const canvasRef=  useRef<HTMLCanvasElement>(null);
	const [date, setDate] = useState<any>({});

	const renderRef = useCreateScene(canvasRef); // 获取自定义hook返回的renderRef

	const handleGUIUpdate = (newDate: any) =>{
		setDate(newDate);
	}

	const handleSaveClick = ()=>{
		// 点击后的代码
		if(canvasRef.current === null || renderRef.current === null){ return }
		const canvas = canvasRef.current;
		renderRef.current();// 此时调用render(), 进行一次渲染，确保canvas缓冲区有数据
		// 采用toDataUrl方式
		// const imageUrl = canvas.toDataURL('image/jpeg');
		// const a = document.createElement('a');
		// a.href = imageUrl;
		// a.download = 'myImg.jpeg'; // 图片名称
		// a.click();

		// 采用 toBlob 方式
		canvas.toBlob((blob)=>{
			const imgUrl = window.URL.createObjectURL(blob!);
			const a = document.createElement('a');
			a.href = imgUrl;
			a.download = 'myImg.jpeg';
			a.click();
		}, 'image/jpeg', 0.8);
	}

	return (
		<div className='full-screen'>
			<canvas ref={canvasRef} className='full-screen'/>
			<DatGUI data={date} onUpdate={handleGUIUpdate} className='dat-gui'>
				<DatButton label='点击保存画布快照' onClick={handleSaveClick}></DatButton>
			</DatGUI>
		</div>
	)
}

export default HelloCanvas;
