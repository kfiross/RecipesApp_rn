import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {Icon} from 'react-native-elements';
import Space from '../components/Space';
import {useTranslation} from 'react-i18next';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-community/picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const IngredientInput = ({ingredient}) => {
  const [gender, setGender] = useState();
  const {t} = useTranslation();

  const units = [
    t('unit_g'),
    t('unit_kg'),
    t('unit_cup'),
    t('unit_spoon'),
    t('unit_teaspoon'),
  ];

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
      <View style={{flex: 1}}>
        <Text>{t('name')}</Text>
        <TextInput value={ingredient}  multiline={true}  />
      </View>

      <Space width={12}/>

      <View>
        <Text>{t('count')}</Text>
        <TextInput value={ingredient} style={{width: 60}} />
      </View>


      <View style={{width: 134}}>
        <Text style={{marginStart: 12}}>{t('type')}</Text>
        <Picker
          removeClippedSubviews={true}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) =>
            setGender(itemValue)
          }>

          {
            units.map((unitName, i) => {
              return <Picker.Item label={unitName} value={`${i}`} key={`unit_${i}}`} />
            })
          }
        </Picker>
      </View>

    </View>

  );
}


const appBar = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();
  return (
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
  );
}

const body = () => {
  const {t} = useTranslation();


  const [ingredients, setIngredients] = useState(Array.from({length: 3}));
  const [steps, setSteps] = useState(Array.from({length: 3}));


  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = () => {
    if(ingredients.length > 2) {
      setIngredients(ingredients.slice(0, -1));
    }
  }

  const addStep = () => setSteps([...steps, '']);
  const removeStep = () => {
    if(steps.length > 2) {
      setSteps(steps.slice(0, -1));
    }
  }

  return (
    <View style={{padding: 12}}>
      <TextInput placeholder={t('enter_recipe_name')}/>
      <Space height={12}/>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={[styles.title, {paddingTop: 4}]}>{t('ingredients')}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button icon="plus" mode="text" onPress={() => addIngredient()}>
            {t('add')}
          </Button>
          <Button icon="minus" mode="text" onPress={() => removeIngredient()}>
            {t('remove')}
          </Button>
        </View>
      </View>

      <Space height={8}/>
      {
        ingredients.map((ingredient, i) => {
          return (
            <IngredientInput key={`ingredient_${i}`}/>
          )
        })
      }
      <Space height={12}/>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
        <Text style={[styles.title, {paddingTop: 4}]}>{t('steps')}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button icon="plus" mode="text" onPress={() => addStep()}>
            {t('add')}
          </Button>
          <Button icon="minus" mode="text" onPress={() => removeStep()}>
            {t('remove')}
          </Button>
        </View>
      </View>
      <Space height={8}/>
      {
        steps.map((step, i) => {
          return <TextInput style={{ marginBottom: 10}} key={`step_${i}`} placeholder={t('enter_step')} value={step}/>
        })
      }
      <Space height={8}/>

      <View>
        <Text style={[styles.title, {paddingTop: 4}]}>{t('notes')}</Text>
        <Space height={8}/>
        <TextInput
          multiline={true} placeholder={t('enter_notes')} />
      </View>
      {/*<KeyboardSpacer/>*/}

    </View>
  );
}

const bottom = () => {
  const {t} = useTranslation();

  return (
    <Button
      style={{marginHorizontal:24}}
      mode="contained"
      onPress={() => {}}>
      {t('add_recipe')}
    </Button>
  );
}



const CreateRecipeScreenContent = ({appBar, body, bottom}) => {
  return(
    <View style={{display: 'flex'}}>
      <View>{appBar}</View>
      <KeyboardAwareScrollView
        style={{height: hp(83),}}
        extraHeight={0} enabledOnAndroid={true}
                               extraScrollHeight={hp(30)}
                               automaticallyAdjustContentInsets={true}
                               enableOnAndroid={true}
                               keyboardShouldPersistTaps='handled'
                               scrollEnabled={true} >

        <View>{body}</View>
      </KeyboardAwareScrollView>
      <View>{bottom}</View>
    </View>
  );
}

const CreateRecipeScreen = () => {
  return <CreateRecipeScreenContent
    appBar={appBar()}
    body={body()}
    bottom={bottom()}
  />;
}

export default CreateRecipeScreen;

const styles = {
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
