import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useRecoilValue  } from 'recoil';
import { loginState, accessTokenState } from '../atom/login';
import styles from './css/SplashScreen';

type SplashScreenProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const [login, setLoginState] = useRecoilState(loginState);
  const accessToken = useRecoilValue(accessTokenState);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log('Loaded Login State:', login);
      console.log('Loaded Access Token:', accessToken);

      if (accessToken) {
        setLoginState(true);
        navigation.replace('Home');
      } else {
        setLoginState(false);
        navigation.replace('Login');
      }
    };

    initializeApp();
  }, [navigation, accessToken, login]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Image
        source={require('./img/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>나비잠</Text>
      <Text style={styles.subtitle}>아기야 두 팔 벌리고 편하게 자렴 :)</Text>
    </View>
  );
};

export default SplashScreen;
