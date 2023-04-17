import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

// 超级表格模块
const basicRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: '基础'
		},
		children: [
			{
				path: '/basic/01-hello-world',
				element: lazyLoad(React.lazy(() => import('@/views/basic/01-hello-world/index'))),
				meta: {
					requiresAuth: true,
					title: 'helloWorld',
					key: 'HelloWorld'
				}
			},
			{
				path: '/basic/02-drawing-line',
				element: lazyLoad(React.lazy(() => import('@/views/basic/02-drawing-line'))),
				meta: {
					requiresAuth: true,
					title: 'drawingLine',
					key: 'DrawingLine'
				}
			},
			{
				path: '/basic/03/-drawing-cube',
				element: lazyLoad(React.lazy(() => import('@/views/basic/03-drawing-cube'))),
				meta: {
					requiresAuth: true,
					title: 'drawingCube',
					key: 'DrawingCube'
				}
			}
		]
	}
];

export default basicRouter;
