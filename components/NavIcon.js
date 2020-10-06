import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import style from '../style';

const NavIcon = ({
  focused = true,
  name,
  color = style.blackColor,
  size = 26,
}) => (
  <Ionicons
    name={name}
    color={focused ? color : style.darkGrayColor}
    size={size}
  />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon;
