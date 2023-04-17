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
				path: '/basic/03/-drawing-cube',
				title: 'Three.js绘制立方体'
			}
		]
	}
];
