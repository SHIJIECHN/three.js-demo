import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

// 基础
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
			},
			{
				path: '/basic/09-camera',
				element: lazyLoad(React.lazy(() => import('@/views/basic/09-camera'))),
				meta: {
					requiresAuth: true,
					title: 'camera',
					key: 'Camera'
				}
			},
			{
				path: '/basic/10-fake-shadow',
				element: lazyLoad(React.lazy(() => import('@/views/basic/10-fake-shadow/index'))),
				meta: {
					requiresAuth: true,
					title: 'fake-shadow',
					key: 'FakeShadow'
				}
			},
			{
				path: '/basic/11-fog',
				element: lazyLoad(React.lazy(() => import('@/views/basic/11-fog'))),
				meta: {
					requiresAuth: true,
					title: 'fog',
					key: 'Fog'
				}
			},
			{
				path: '/basic/12-render-target',
				element: lazyLoad(React.lazy(() => import('@/views/basic/12-render-target'))),
				meta: {
					requiresAuth: true,
					title: 'render-target',
					key: 'RenderTarget'
				}
			},
			{
				path: '/basic/13-buffer-geometry',
				element: lazyLoad(React.lazy(() => import('@/views/basic/13-buffer-geometry'))),
				meta: {
					requiresAuth: true,
					title: 'buffer-geometry',
					key: 'BufferGeometry'
				}
			},
			// {
			// 	path: '/advanced/01-render-on-demand',
			// 	element: lazyLoad(React.lazy(() => import('@/views/advanced/01-render-on-demand'))),
			// 	meta: {
			// 		requiresAuth: true,
			// 		title: 'render-on-demand',
			// 		key: 'RenderOnDemand'
			// 	}
			// },
		]
	}
];

export default basicRouter;
