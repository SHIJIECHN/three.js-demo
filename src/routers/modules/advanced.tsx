import React from 'react';
import lazyLoad from '@/routers/utils/lazyLoad';
import { LayoutIndex } from '@/routers/constant';
import { RouteObject } from '@/routers/interface';

const advancedRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: '进阶'
		},
		children: [
			{
				path: '/advanced/01-render-on-demand',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/01-render-on-demand'))),
				meta: {
					requiresAuth: true,
					title: 'render-on-demand',
					key: 'RenderOnDemand'
				}
			},
			{
				path: '/advanced/03-canvas',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/03-canvas'))),
				meta: {
					requiresAuth: true,
					title: 'canvas',
					key: 'Canvas'
				}
			},
			{
				path: '/advanced/02-dat-gui',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/02-dat-gui/index'))),
				meta: {
					requiresAuth: true,
					title: 'dat-gui',
					key: 'DatGUI'
				}
			},
			{
				path: '/advanced/04-earth',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/04-earth'))),
				meta: {
					requiresAuth: true,
					title: 'earth',
					key: 'Earth'
				}
			},
			{
				path: '/advanced/05-obj',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/05-obj'))),
				meta: {
					requiresAuth: true,
					title: 'obj',
					key: 'Obj'
				}
			},
		]
	}
	]
export default advancedRouter;

