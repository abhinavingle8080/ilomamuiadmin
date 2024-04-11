import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router';

import NoPermissionPage from 'src/pages/page-not-found';

import { useSelector } from '../redux/store';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
    children: PropTypes.node,
};

export default function RoleBasedGuard({ children }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { rolemodules } = useSelector((state) => state.roleaccess);

    const modules = rolemodules
        ?.flatMap((item) => item?.Modules?.flatMap((item2) => item2?.childrens?.map((item3) => item3?.path)))
        .filter((item4) => item4 !== undefined);

    modules?.push('/user-management/roles', '/dashboard', '/page-content', '/profile', '/global-settings', '/user-task', '/support', '/master/coupons/sub/:createdAt', '/master/coupons/sub/edit'); // temporary for page content and global setting

    const isRouteAllowed = (route) => {
        if (pathname === '/') {
            navigate('/dashboard', { replace: true });
            return true;
        }

        const convertedRoute = route?.replace(/s$/, '');
        return pathname.startsWith(route) || pathname.startsWith(`${convertedRoute}/`);
    };

    if (!modules?.some((item) => isRouteAllowed(item))) {
        return <NoPermissionPage />;
    }

    return <>{children}</>;
}
