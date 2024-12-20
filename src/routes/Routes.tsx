import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as routes from '../config/RoutesConstant';
import BottomTabBar from './BottomNavigation';

type RootStackList = {
  [routes.HOME]: undefined;
  [routes.FAVORITE]: undefined;
};

const Stack = createNativeStackNavigator<RootStackList>();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.HOME} component={BottomTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
