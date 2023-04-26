import {MathUtils} from "three";

type Data = {
	[s: string]: number
}
export class DegRadHelper{
	obj: Data;
	prop: string;
	constructor(obj: Data, prop: string ) {
		this.obj = obj;
		this.prop = prop;
	}
	get value(){
		return MathUtils.radToDeg(this.obj[this.prop]);
	}

	set value(v){
		this.obj[this.prop] = MathUtils.degToRad(v)
	}
}

export class StringToNumberHelper<T>{
	obj: T;
	prop: keyof T;
	constructor(obj: T ,prop:keyof T) {
		this.obj = obj;
		this.prop = prop;
	}
	get value(){
		return this.obj[this.prop];
	}
	set value(v:string){
		// @ts-ignore
		this.obj[this.prop] = parseFloat(v);
	}
}
