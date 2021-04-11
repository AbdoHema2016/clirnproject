import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Constants} from '../../utilities';
import {Style} from './style';

const {LOCAL_PATH} = Constants;

class CNavigationBackButton extends React.Component {
  render() {
    const {
      backButtonAction,
      tintColor,
      buttonBackgroundColor,
      title,
      grey,
      titleStyle,
    } = this.props;
    return (
      <View style={[Style.container, tintColor]}>
        <TouchableOpacity
          style={[Style.backButton, buttonBackgroundColor]}
          onPress={backButtonAction}>
          <Image
            resizeMode={'contain'}
            style={Style.backButtonImage}
            source={
              grey
                ? LOCAL_PATH.ARROW_LEFT_ICON
                : LOCAL_PATH.NAV_BACK_BUTTON_ICON
            }
          />
          <Text style={[Style.backButtonTitle, titleStyle]}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CNavigationBackButton;
