import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import constants from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import style from '../../style';

const View = styled.View`
  flex: 1;
`;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: 'flex-end',
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={toggleType}>
            <Ionicons
              name={
                Platform.OS === 'ios'
                  ? 'ios-reverse-camera'
                  : 'md-reverse-camera'
              }
              size={28}
              color={style.blackColor}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
