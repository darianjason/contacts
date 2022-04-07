import React from 'react';
import {Provider} from 'react-redux';

import {store} from './store/store';
import ContactsNavigator from './navigation/ContactsNavigator';

const App = () => (
  <Provider store={store}>
    <ContactsNavigator />
  </Provider>
);

export default App;
