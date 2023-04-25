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
				path: '/advanced.tsx/01-render-on-demand',
				element: lazyLoad(React.lazy(() => import('@/views/advanced/01-render-on-demand'))),
				meta: {
					requiresAuth: true,
					title: 'render-on-demand',
					key: 'RenderOnDemand'
				}
			},

		]
	}
	]
export default advancedRouter;
