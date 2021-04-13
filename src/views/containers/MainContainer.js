import {useTranslation} from 'react-i18next';
import {Divider, Icon} from 'react-native-elements';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeContainer from './HomeContainer';
import DrawerContentScrollView from '@react-navigation/drawer/src/views/DrawerContentScrollView';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import DrawerItemList from '@react-navigation/drawer/src/views/DrawerItemList';
import Space from '../components/Space';
import DrawerItem from '@react-navigation/drawer/src/views/DrawerItem';
import SearchScreen from '../screens/SearchScreen';
import appColors from '../../res/appColors';
import {red200} from 'react-native-paper/lib/typescript/styles/colors';

const Drawer = createDrawerNavigator();



const MainContainer = () => {
  const {t, i18n} = useTranslation();

  function CustomDrawerContent(props) {
    const {t, i18n} = useTranslation();

    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            backgroundColor: appColors.primary,
            height: 160,
            marginTop: -8,
            paddingBottom: 12,
            paddingStart: 8,
            paddingEnd: 8,
          }}
        >
          <View style={{flex: 1}}/>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold'}}>User</Text>
          <Text style={{ color: 'white', fontSize: 14}}>{auth().currentUser.email}</Text>
        </View>
        <DrawerItemList {...props} activeTintColor={appColors.primary} />
        <Space height={12}/>
        <Divider style={{ backgroundColor: appColors.primary, height: 1 }} />
        <DrawerItem
          label={t('disconnect')}
          icon={({ _, __ }) => (<Icon name='logout' size={20} color={appColors.primary}/>)}
          onPress={() => {auth().signOut()}}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={t('home')} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='home' size={20} color={appColors.primary}/>)
      }}>
        {(props) => <HomeContainer {...props} />}
      </Drawer.Screen>

      <Drawer.Screen name={t('create_recipe')} component={CreateRecipeScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='edit' size={20} color={appColors.primary}/>)
      }}/>

      <Drawer.Screen name={t('favourites')} component={FavouritesScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='star' size={20} color={appColors.primary}/>)
      }}/>

      <Drawer.Screen name={t('search_recipes')} component={SearchScreen} options={{
        drawerIcon: ({ _, __ }) => (<Icon name='search' size={20} color={appColors.primary}/>)
      }}/>
    </Drawer.Navigator>
  );
};

export default MainContainer;
