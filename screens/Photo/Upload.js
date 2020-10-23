import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import style from '../../style';

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
  const [fileUrl, setFileUrl] = useState('');
  const captionInput = useInput('');
  const locationInput = useInput('');
  const handleSubmit = async () => {
    if (captionInput.value === '' || locationInput.value === '') {
      Alert.alert('All fields are required');
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: navigation.getParam('photo').uri }}
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
