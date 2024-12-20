import React from 'react';
import BottomTabBar from './src/routes/BottomNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import Loader from './src/components/Loader';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <NavigationContainer>
          <BottomTabBar />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
