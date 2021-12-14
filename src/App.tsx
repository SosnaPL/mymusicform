import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
import DotLoader from "react-spinners/DotLoader";

const Main = React.lazy(() => import('./pages/Main'));

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" name='keywords' content='MyMusic Form' />
          <title>MyMusic Form</title>
          <meta name="description" content="MyMusic Form" />
        </Helmet>
        <Router>
          <React.Suspense
            fallback={(
              <div className="suspense">
                <DotLoader />
              </div>
            )}
          >
            <Switch>
              <Route path='/' exact={true} component={Main} />
              <Route path='*' exact={true} component={Main} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}
