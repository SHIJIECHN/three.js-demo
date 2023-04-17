import { AnyAction } from 'redux';
import { GlobalState } from '@/redux/interface';
import produce from 'immer';
import * as types from '@/redux/mutation-types';

const globalState: GlobalState = {
	token: '',
	userInfo: '',
	assemblySize: 'middle',
	themeConfig: {
		// 默认 primary 主题颜色
		primary: '#1890ff',
		// 深色模式
		isDark: false,
		// 面包屑导航
		breadcrumb: true,
		// 页脚
		footer: true
	}
};

// global reducer
const global = (state: GlobalState = globalState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_TOKEN:
				draftState.token = action.token;
				break;
			case types.SET_ASSEMBLY_SIZE:
				draftState.assemblySize = action.assemblySize;
				break;
			case types.SET_THEME_CONFIG:
				draftState.themeConfig = action.themeConfig;
				break;
			default:
				return draftState;
		}
	});

export default global;
