import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import constants from '../constants';
import style from '../style';

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: constants.width - 50,
      height: 35,
      backgroundColor: style.lightGrayColor,
      borderRadius: 8,
      textAlign: 'center',
    }}
    returnKeyType="search"
    onChangeText={onChange}
    onEndEditing={onSubmit}
    value={value}
    placeholder={'Search'}
    placeholderTextColor={style.darkGrayColor}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
