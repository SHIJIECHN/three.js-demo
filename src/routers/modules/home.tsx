import { RouteObject } from '@/routers/interface';
import { LayoutIndex } from '@/routers/constant';
import Home from '@/views/home';
import lazyLoad from "@/routers/utils/lazyLoad";
import React from "react";

const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: '/home/index',
				// element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
				element: <Home />,
				meta: {
					title: '首页',
					key: 'home'
				}
			}
		]
	}
];

export default homeRouter;
