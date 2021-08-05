import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const FormPag = React.lazy(() => import('pages/FormPag'));
const Society = React.lazy(() => import('pages/Society'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));
const ProcessedPage = React.lazy(() => import('pages/ProcessedPage'));
const RequestsPages = React.lazy(() => import('pages/RequestsPages'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/account" component={FormPag} />
                <Route exact path="/processed" component={ProcessedPage} />
                <Route exact path="/requests" component={RequestsPages} /> 
                            <Route exact path="/rejects" component={CardPage} />
                            <Route exact path="/society" component={Society} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);