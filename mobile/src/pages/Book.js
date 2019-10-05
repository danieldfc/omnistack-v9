import React, { useEffect } from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';

export default function Book({ navigation }) {
  const id = navigation.getParam('id');

  useEffect(() => {
    AsyncStorage.getItem('@user/id').then(user => {
      if (user) {
      }
    });
  }, []);

  return <SafeAreaView />;
}
