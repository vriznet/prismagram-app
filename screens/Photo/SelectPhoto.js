import React, { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import constants from '../../constants';
import style from '../../style';

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const Button = styled.View`
  background-color: ${style.blueColor};
  width: 120px;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 3px 3px 6px rgb(50, 50, 50);
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        setHasPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  const handleSelected = () => {
    navigation.navigate('Upload', { photo: selected });
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <React.Fragment>
              <Image
                style={{ width: constants.width, height: constants.height / 2 }}
                source={{ uri: selected.uri }}
              />
              <TouchableOpacity
                onPress={handleSelected}
                style={{
                  position: 'absolute',
                  top: constants.height / 2 - 50,
                  left: constants.width / 2 - 60,
                }}
              >
                <Button>
                  <Text style={{ color: 'white', fontWeight: '700' }}>
                    Select Photo
                  </Text>
                </Button>
              </TouchableOpacity>

              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {allPhotos.map((photo, index) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => changeSelected(photo)}
                  >
                    <Image
                      style={{
                        width: constants.width / 3,
                        height: constants.width / 3,
                        opacity: photo.id === selected.id ? 0.5 : 1,
                      }}
                      source={{ uri: photo.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </React.Fragment>
          ) : null}
        </View>
      )}
    </View>
  );
};
