import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as routes from '../config/RoutesConstant';
import {FavoriteViewModel, HomeViewModel} from '../viewModels';
import Constants from '../config/Constants';
import Colors from '../config/Colors';
import Icons from '../assets/icons';

type TabStackList = {
  [routes.HOME]: undefined;
  [routes.FAVORITE]: undefined;
};

interface IBottomTab {
  name: keyof TabStackList;
  component: ({navigation}: NativeStackScreenProps<any>) => any;
  tabBarIcon: any;
  tabName: string;
}

const BottomTab = createBottomTabNavigator<TabStackList>();

const BOTTOM_TABS: IBottomTab[] = [
  {
    name: routes.HOME,
    component: HomeViewModel,
    tabBarIcon: Icons.HOME,
    tabName: Constants.home,
  },
  {
    name: routes.FAVORITE,
    component: FavoriteViewModel,
    tabBarIcon: Icons.STAR,
    tabName: Constants.favorite,
  },
];

const BottomTabBar = () => {
  const getTintColor = (focused: boolean) => {
    return focused ? Colors.primary : Colors.grey;
  };

  return (
    <BottomTab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}>
      {BOTTOM_TABS.map(tab => {
        return (
          <BottomTab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => (
                <View style={styles.tabItem}>
                  <Image
                    source={tab.tabBarIcon}
                    style={[
                      styles.bottomIconImage,
                      {tintColor: getTintColor(focused)},
                    ]}
                  />
                  <Text
                    style={[styles.tabLabel, {color: getTintColor(focused)}]}>
                    {tab.tabName}
                  </Text>
                </View>
              ),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  bottomIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 30,
  },
  tabBar: {
    height: Platform.OS === 'android' ? 70 : 90,
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
