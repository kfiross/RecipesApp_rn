import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Space from '../components/Space';
import {Button} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/core';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // if (isLogged) {
  //   navigation.dispatch(StackActions.replace('main'));
  // }

  async function login() {
    console.log('email:', email);
    console.log('password:', password);

    await auth().signInWithEmailAndPassword(email, password);

    // await authStore.login(email, password);
    // navigation.dispatch(StackActions.replace('main'));
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to Reciper</Text>
      <Space height={22}/>
      <TextInput
        placeholder="Enter email.."
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Space height={22}/>
      <TextInput
        placeholder="Enter password.."
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Space height={48}/>
      <Button
        title="Login"
        buttonStyle={styles.button}
        onPress={() => login()}
      />
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
