import {AxesHelper, GridHelper, Material, Object3D, Scene} from "three";

class AxisGridHelper{
	grid;
	axes;
	_visible;
	constructor(node: Object3D, units = 10) {
		const axes = new AxesHelper();
		(axes.material as Material).depthTest = false;
		axes.renderOrder = 2;
		node.add(axes);

		const grid = new GridHelper(units, units);
		(grid.material as Material).depthTest = false;
		grid.renderOrder = 1;
		node.add(grid);

		this.grid = grid;
		this.axes = axes;
		this._visible = false;
	}

	get visible(){
		return this._visible;
	}

	set visible(v){
		this._visible = v;
		this.grid.visible = v;
		this.axes.visible = v;
	}
}

export default AxisGridHelper;
