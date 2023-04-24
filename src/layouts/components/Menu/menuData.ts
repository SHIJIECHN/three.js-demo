// @ts-ignore
export const data = [
	{
		icon: 'HomeOutlined',
		title: '首页',
		path: '/home/index'
	},
	{
		icon: 'TableOutlined',
		title: '基础',
		path: '/basic',
		children: [
			{
				icon: 'AppstoreOutlined',
				path: '/basic/01-hello-world',
				title: 'Three.js的hello world'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/02-drawing-line',
				title: 'Three.js绘制线'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/03-drawing-cube',
				title: 'Three.js绘制立方体'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/04-primitives',
				title: '图元'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/05-scene',
				title: '场景'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/07-texture',
				title: '纹理'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/08-light',
				title: '光照'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/09-camera',
				title: '镜头'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/10-fake-shadow',
				title: '阴影'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/11-fog',
				title: '雾'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/12-render-target',
				title: '离屏渲染'
			},
			{
				icon: 'AppstoreOutlined',
				path: '/basic/13-buffer-geometry',
				title: '自定义几何体'
			}
		]
	},
	{
		icon: 'TableOutlined',
		title: '进阶',
		path: '/advanced',
		children: [
			{
				icon: 'AppstoreOutlined',
				path: '/advanced/01-render-on-demand',
				title: '按需渲染'
			}
		]
	}
];
