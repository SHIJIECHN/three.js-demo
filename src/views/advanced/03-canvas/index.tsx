import './index.less'
import DatGUI, {DatButton} from "react-dat-gui";
import {useRef, useState} from "react";
import useCreateScene from "./use-create-scene";

const HelloCanvas = ()=>{
	const canvasRef=  useRef<HTMLCanvasElement>(null);
	const [date, setDate] = useState<any>({});

	useCreateScene(canvasRef);

	const handleGUIUpdate = (newDate: any) =>{
		setDate(newDate);
	}

	const handleSaveClick = ()=>{
		// 点击后的代码
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
