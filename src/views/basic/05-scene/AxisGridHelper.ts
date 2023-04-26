import {AxesHelper, GridHelper, Material, Object3D, Scene} from "three";

class AxisGridHelper{
	grid;
	axes;
	private _visible: boolean = false;
	constructor(node: Object3D, units = 10) {
		// 坐标轴
		const axes = new AxesHelper();
		(axes.material as Material).depthTest = false;
		axes.renderOrder = 2;
		node.add(axes);

		// 网格图
		const grid = new GridHelper(units, units);
		(grid.material as Material).depthTest = false;
		grid.renderOrder = 1;
		node.add(grid);

		this.grid = grid;
		this.axes = axes;
		this.visible = false;
	}

	// 获取visible属性
	get visible(){
		return this._visible;
	}

	// 设置visible属性
	set visible(v){
		this._visible = v;
		this.grid.visible = v;
		this.axes.visible = v;
	}
}

export default AxisGridHelper;
