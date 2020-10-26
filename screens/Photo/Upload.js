import React, { useState } from 'react';
import axios from 'axios';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import useInput from '../../hooks/useInput';
import style from '../../style';
import { useMutation } from 'react-apollo-hooks';
import { FEED_QUERY } from '../Tab/Home';

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      location
      caption
      files {
        id
        url
      }
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Container = styled.View`
  position: relative;
  top: -50px;
`;

const Form = styled.View``;

const STextInput = styled.TextInput`
  width: 300px;
  height: 36px;
  background-color: ${style.lightGrayColor};
  margin-bottom: 10px;
  padding-left: 14px;
  border-radius: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  align-items: center;
`;

const Button = styled.View`
  width: 300px;
  height: 36px;
  background-color: ${style.blueColor};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 700;
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const photo = navigation.getParam('photo');
  const captionInput = useInput('');
  const locationInput = useInput('');
  const [uploadMutation] = useMutation(UPLOAD, {
    variables: {
      caption: captionInput.value,
      location: locationInput.value,
    },
    refetchQueries: () => [{ query: FEED_QUERY }],
  });
  const handleSubmit = async () => {
    if (captionInput.value === '' || locationInput.value === '') {
      Alert.alert('All fields are required');
    }
    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split('.');
    const uri = photo.uri;
    formData.append('file', {
      name,
      type: type.toLowerCase(),
      uri,
    });
    try {
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post(
        'https://prismagram.run.goorm.io/api/upload',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
        },
      });
      if (upload.id) {
        navigation.navigate('TabNavigation');
      }
    } catch (e) {
      Alert.alert('Cannot upload');
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 300, width: 300, marginBottom: 20 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            placeholderTextColor={style.darkGrayColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            placeholderTextColor={style.darkGrayColor}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Button>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text>Upload</Text>
              )}
            </Button>
          </TouchableOpacity>
        </Form>
      </Container>
    </View>
  );
};
