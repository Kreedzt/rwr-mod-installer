import { Navigate, useRoutes } from 'react-router-dom';
import Home from './entries/home/Home';
import Config from './entries/config/Config';
import Install from './entries/install/Install';
import Bundle from './entries/bundle/Bundle';
import NotFound from './entries/notFound/NotFound';
import About from './entries/about/About';

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
            children: [
                {
                    path: 'config',
                    element: <Config />,
                },
                {
                    path: 'install',
                    element: <Install />,
                },
                {
                    path: 'bundle',
                    element: <Bundle />,
                },
                {
                    path: 'about',
                    element: <About />,
                },
                {
                    path: '404',
                    element: <NotFound />,
                },
                {
                    path: '*',
                    element: <Navigate to="/404" />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);
};

export default Router;
