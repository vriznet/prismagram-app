import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from 'styled-components';
import options from './apollo';
import style from './style';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync(Ionicons.font);
      await Asset.loadAsync([require('./assets/icon.png')]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...options,
      });
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={style}>
        <AuthProvider>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
