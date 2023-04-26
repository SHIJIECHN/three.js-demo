import './index.less'
import DatGUI, {DatBoolean, DatButton, DatColor, DatFolder, DatNumber, DatPresets, DatSelect, DatString} from 'react-dat-gui'
import React, {useState} from "react";
import 'react-dat-gui/dist/index.css'

type DateType = {
	boo: boolean,
	title: string,
	num: number,
	color: string,
	select: string
}

const HelloGUI = ()=>{
	const [dat, setDat] = useState<DateType>({
		boo: false,
		title: 'hello',
		num: 2,
		color: '#FFFFFF',
		select: 'red'
	})

	const presetOptions = [
		{
			second: { boo: false, title: 'hello...', num: 2, color: '#FFFFFF', select: 'red' },
			third: { boo: false, title: 'hi...', num: 5, color: '#666666', select: 'yellow' }
		},
		{
			forth: { boo: true, title: 'hi...', num: `5`, color: '#000000', select: 'blue' }
		}
	];
	const handleUpdate = (newDate: any) =>{
		setDat(newDate);
		console.log(newDate)
	}

	const handleClick = ()=>{
		console.log('you clicked me');
	}

	const handlePresetsUpdate = (newDate: any)=>{
		setDat(newDate);
		console.log(newDate);
	}


	return (
		<DatGUI data={dat} onUpdate={handleUpdate} className='dat-gui'>
			 {/*@ts-ignore*/}
			<DatPresets onUpdate={handlePresetsUpdate} label='presets' options={presetOptions}/>
			<DatBoolean path='boo' label='Boo?' />
			<DatString path='title' label='title' />
			<DatNumber path='num' label='number' min={0} max={10} step={1} />
			<DatColor path='color' label='color' />
			<DatSelect path='select' options={['red', 'green', 'blue']} />
			<DatButton onClick={handleClick} label='button' />
			<DatFolder title='other' closed={true} >
				<DatString path='title' label='title' />
				<DatNumber path='num' label='number' min={0} max={10} step={1} />
			</DatFolder>
		</DatGUI>
	)
}

export default HelloGUI
