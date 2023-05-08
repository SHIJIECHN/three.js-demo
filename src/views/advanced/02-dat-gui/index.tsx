import * as dat from 'dat.gui'
import './index.less'
import {useState} from 'react';
import DatGui from "react-dat-gui";

const HelloGUI = ()=>{
	/**
	 * dat-gui
	 */
	const gui = new dat.GUI();
	console.log(gui)
	const options = {
		message: 'data.gui', // 输入框
		speed: 0.8, // 如果是一个数字则是输入框，如果在add的时候传入有最大值，最小值，则是滑块
		displayOutline: false, // 单选框
		color: '#ffae23', // 颜色控件，提供4中颜色值类型css(#ffae23)、RGB([ 0, 128, 255 ])、RGBA([[ 0, 128, 255, 0.3])、Hue({ h: 350, s: 0.9, v: 0.3 })
	}

	const testObj = {
		type: 'two',
		speed: 50
	}

	gui.add(options, 'message');
	gui.add(options, 'speed', -5, 5);
	gui.add(options, 'displayOutline');
	gui.addColor(options, 'color').name('CSS颜色值');
	const folder = gui.addFolder('下拉框')
	folder.add(testObj, 'type', ['one', 'two', 'three'])


	return <div>123</div>
}

export default HelloGUI
