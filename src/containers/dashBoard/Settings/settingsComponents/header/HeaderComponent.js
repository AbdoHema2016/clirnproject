import React, {PureComponent} from 'react';
import {View, Text} from 'react-native';
import Style from './style';

class HeaderComponent extends PureComponent {
  render() {
    return (
      <View style={Style.header}>
        <Text style={Style.title}>Settings</Text>
      </View>
    );
  }
}

export default HeaderComponent;
