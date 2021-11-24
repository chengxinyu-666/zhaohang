/*
 * @Author: chengxinyu
 * @Date: 2021-11-22 18:20:06
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 12:17:34
 */
import { cookie } from 'project-libs';
import { history } from 'umi';

export function onRouteChange(route) {
  console.log(route);
  const nowPath = route.routes[0].routes.filter(
    (item) => item.path === route.location.pathname,
  );
  const isLogin = cookie.get('user');
  console.log(99, isLogin, nowPath);
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname,
      },
    });
  }
}
