import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Card} from 'react-native-paper';
import {Button} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useTranslation} from 'react-i18next';


const HomeScreen = () => {
  const colors = ['#cccc00', '#ffbb33', '#ff4444', '#33b5e5', '#4CAF50'];
  const navigation = useNavigation();
  const {t} = useTranslation();

  const categories = [
    t('category_1'),
    t('category_2'),
    t('category_3'),
    t('category_4'),
    t('category_5'),
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        // <Button onPress={() => navigation.openDrawer()} />
        <Icon
          reverse
          name='menu'
          type='ionicon'
          color='transparent'
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [navigation]);

  function navigateToDetails(index) {
    navigation.navigate('RecipesCategory', {
      name: categories[index],
      index,
    });
  }

  return (
    <View>
      <View style={styles.list}>
        {
          categories.map(((value, index) => {
            return (
              <Button
                key={index}
                title={value}
                buttonStyle={[styles.button, {backgroundColor: colors[index]}]}
                titleStyle={styles.title}
                onPress={() => navigateToDetails(index)}
              />
            );
          }))
        }
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    width: wp('90%'),
    margin: 10,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
});
