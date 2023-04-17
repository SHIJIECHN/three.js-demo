import { RouteObject } from '@/routers/interface';
import { LayoutIndex } from '@/routers/constant';
import Home from '@/views/home';

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
