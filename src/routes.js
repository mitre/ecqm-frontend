import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import ProviderMeasures from './containers/ProviderMeasures';
import EditProfile from './containers/EditProfile';
import ProviderList from './containers/ProviderList';
import TeamList from './containers/TeamList';

export default (
  <Route component={App}>
    <Route path="/" component={ProviderMeasures} />
    <Route path="/users/edit" component={EditProfile} />
    <Route path="/providers" component={ProviderList} />
    <Route path="/teams" component={TeamList} />
  </Route>
);
