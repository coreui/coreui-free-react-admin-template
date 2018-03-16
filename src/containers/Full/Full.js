import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <FullHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}>
              <li class="breadcrumb-menu d-md-down-none">
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                  <a class="btn" href="#"><i class="icon-speech"></i></a>
                  <a class="btn" href="/dashboard"><i class="icon-graph"></i> &nbsp;Dashboard</a>
                  <a class="btn" href="#"><i class="icon-settings"></i> &nbsp;Settings</a>
                </div>
              </li>
            </AppBreadcrumb>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden display="lg">
            <FullAside />
          </AppAside>
        </div>
        <AppFooter fixed>
          <FullFooter />
        </AppFooter>
      </div>
    );
  }
}

export default Full;
