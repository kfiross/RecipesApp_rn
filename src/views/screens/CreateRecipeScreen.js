import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import Space from '../components/Space';

const CreateRecipeScreen = () => {
  const navigation = useNavigation();

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
          title={<Text>Add New Recipe</Text>}
          style={{ alignItems: 'center', paddingEnd: 80}}>
        </Appbar.Content>
      </Appbar.Header>
      <View style={{padding: 24}}>
        <TextInput placeholder="Enter name.."/>
        <Space height={12}/>
        <TextInput placeholder="Enter making time.."/>
        <Space height={12}/>
        <TextInput placeholder="Enter Ingredients List.."/>
        <Space height={12}/>
        <TextInput placeholder="Enter Steps.."/>
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
