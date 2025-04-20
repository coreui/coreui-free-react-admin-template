// AppSidebar.js
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
import { set } from '../app/store';
import navigation from '../_nav';
import { filterAccessibleNavItems } from "../features/access/permission";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector(state => state.ui.sidebarUnfoldable);
  const sidebarShow = useSelector(state => state.ui.sidebarShow);
  const theme = useSelector(state => state.ui.theme);
  const currentUser = useSelector(state => state.auth.user);

  const filteredNavItems =  filterAccessibleNavItems(navigation, currentUser)

  return (
    <CSidebar
      className="border-end"
      colorScheme={theme}
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => dispatch(set({ sidebarShow: visible }))}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          {unfoldable ? <img src='/favicon.ico' style={{width:"18px", height:"18px"}} /> : <h2>Chorvoq</h2>}
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => dispatch(set({ sidebarShow: false }))} />
      </CSidebarHeader>
      <AppSidebarNav items={filteredNavItems} />
      <CSidebarFooter className="border-top d-none d-lg-flex"></CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);