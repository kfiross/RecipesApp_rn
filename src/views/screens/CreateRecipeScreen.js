import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import Space from '../components/Space';
import {useTranslation} from 'react-i18next';

const CreateRecipeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View>
      <Appbar.Header>
        <Icon
          reverse
          name='menu'
          type='ionicon'
          color='transparent'
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content
          title={<Text>{t('add_new_recipe')}</Text>}
          style={{ alignItems: 'center', paddingEnd: 80}}>
        </Appbar.Content>
      </Appbar.Header>
      <View style={{padding: 24}}>
        <TextInput placeholder={t('enter_recipe_name')}/>
        <Space height={12}/>
        <TextInput placeholder={t('enter_ingredients')}/>
        <Space height={12}/>
        <TextInput placeholder={t('enter_steps')}/>
        <Space height={24}/>
        <Button
          mode="text"
          type='solid'
         onPress={() => {}} title={t('add_recipe')}/>

      </View>
    </View>
  );
};

export default CreateRecipeScreen;

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
