/*
 * @Author: chengxinyu
 * @Date: 2021-11-22 18:20:06
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 15:25:33
 */
import { cookie } from 'project-libs';
import { history } from 'umi';
//路由拦截判断
export function onRouteChange(route) {
  // console.log(route);
  const nowPath = route.routes[0].routes.filter(
    (item) => item.path === route.location.pathname,
  );
  const isLogin = cookie.get('user');
  // console.log(99, isLogin, nowPath);
  if (nowPath.length === 1 && nowPath[0].auth && !isLogin) {
    history.push({
      pathname: '/login',
      query: {
        from: route.location.pathname,
      },
    });
  }
}
