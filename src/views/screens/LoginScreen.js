import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import Space from '../components/Space';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState(0);      // 0 = login, 1 = register

  const {t} = useTranslation();

  async function loginOrRegister() {
    // if we on 'login' mode
    if(loginType === 0) {
      await auth().signInWithEmailAndPassword(email, password);
    }
    // if we on 'register' mode
    else {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().signInWithEmailAndPassword(email, password);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <Space height={22}/>
      <TextInput
        placeholder={t('enter_email')}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Space height={22}/>
      <TextInput
        placeholder={t('enter_password')}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Space height={48}/>
      <Button
        mode="contained"
        buttonStyle={styles.button}
        onPress={() => loginOrRegister()}
      >{t(loginType === 0 ? 'login' : 'register')}</Button>
      <Space height={12}/>
      <Button
        mode="text"
        type='solid'
        buttonStyle={styles.button}
        onPress={() => setLoginType(loginType === 0 ? 1 : 0)}
      >{t(loginType === 0 ? 'go_to_register' : 'go_to_login')}</Button>

    </View>
  );


};

export default LoginScreen;

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'center',
  },
  screen: {
    padding: 24,
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    width: wp('80%'),
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#3f51b5',
  },
};
