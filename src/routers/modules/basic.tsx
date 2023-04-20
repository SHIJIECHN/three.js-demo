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
				path: '/basic/03-drawing-cube',
				element: lazyLoad(React.lazy(() => import('@/views/basic/03-drawing-cube'))),
				meta: {
					requiresAuth: true,
					title: 'drawingCube',
					key: 'DrawingCube'
				}
			},
			{
				path: '/basic/04-primitives',
				element: lazyLoad(React.lazy(() => import('@/views/basic/04-primitives'))),
				meta: {
					requiresAuth: true,
					title: 'primitives',
					key: 'Primitives'
				}
			},
			{
				path: '/basic/05-scene',
				element: lazyLoad(React.lazy(() => import('@/views/basic/05-scene'))),
				meta: {
					requiresAuth: true,
					title: 'font',
					key: 'Font'
				}
			},
			{
				path: '/basic/06-material',
				element: lazyLoad(React.lazy(() => import('@/views/basic/06-material'))),
				meta: {
					requiresAuth: true,
					title: 'material',
					key: 'Material'
				}
			},
			{
				path: '/basic/07-texture',
				element: lazyLoad(React.lazy(() => import('@/views/basic/07-texture'))),
				meta: {
					requiresAuth: true,
					title: 'texture',
					key: 'Texture'
				}
			},
			{
				path: '/basic/08-light',
				element: lazyLoad(React.lazy(() => import('@/views/basic/08-light'))),
				meta: {
					requiresAuth: true,
					title: 'texture',
					key: 'Texture'
				}
			}
		]
	}
];

export default basicRouter;
