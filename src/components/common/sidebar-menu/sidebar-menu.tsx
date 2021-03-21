import React from 'react';
import './sidebar-menu.scss';
import { MenuRoute, menuRoutes } from '../../common/main-menu/main-menu';
import {
  NavLink
} from 'react-router-dom';

const initialState = {
  sidebarItems: null,
  selectSidebarMenu: null
};
const reducer = (state: any, action: any) => {
  return {
    ...state,
    ...action
  };
}

export const getSideBarItems = () => {
  const pathname = window.location.pathname;
  const menu = menuRoutes.find(m => m?.children?.some(sm => sm.url?.includes(pathname) || pathname.includes(sm.url)));
  const sidebarItems = menu?.children?.find((x: MenuRoute) => x.url === pathname || pathname.includes(x.url))?.submenu;
  return sidebarItems;
}

export const SidebarMenu = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const anchor = window.location.hash;
  React.useEffect(() => {
    const sidebarItems = props.items || getSideBarItems();
    const selectSidebarMenu = sidebarItems?.find((x: MenuRoute) => x.url === anchor);
    dispatch({ sidebarItems, selectSidebarMenu })
  }, []);
  return props.tabView ? (
    <React.Fragment>
    <div className="row no-gutters-2 navigate-sidebar-tab">
      {state?.sidebarItems?.map((menu, index) => (
        <NavLink
          key={index}
          to={`${menu.url}`}
          className="col-auto"
          activeClassName="active">
          {menu.name}
        </NavLink>
      ))}
    </div>
    <hr className="sidebar-hr_margin-block-start"/>
    </React.Fragment>
  ) : (
    <div className="row vertical navigate-sidebar">
      {state?.sidebarItems?.map((sb: MenuRoute, index: number) => {
        const selectSb = state.selectSidebarMenu || (index === 0 ? sb : null);
        return (
          props.notAnchor ?
          <NavLink
            key={index}
            to={sb.url}
            activeClassName="active"
            className={
              'col ' +
              (index < state?.sidebarItems.length - 1
                ? ' border_bottom '
                : '')
            }
          >
            {sb.name}
          </NavLink>

          :

          <a
            key={index}
            href={sb.url}
            className={
              'col ' +
              (index < state?.sidebarItems.length - 1
                ? ' border_bottom '
                : '') +
              (selectSb?.url === sb.url ? 'active' : '')
            }
            onClick={() =>
              dispatch({
                selectSidebarMenu: sb,
              })
            }
          >
            {sb.name}
          </a>
        );
      })}
    </div>
  );
}