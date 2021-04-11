import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import style from './style';

class CCheckBox extends PureComponent {
  render() {
    const {
      onPress,
      disabled,
      imagePath,
      state,
      testID,
      accessibilityLabel,
    } = this.props;
    return (
      <View style={[style.checkBoxContainerStyle]}>
        <TouchableOpacity
          testID={testID}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          style={[style.buttonStyle, !state ? style.errorBorder : null]}
          onPress={onPress}
          disabled={disabled}>
          <Image
            resizeMode={'contain'}
            source={imagePath}
            style={
              !state
                ? style.unslectedbuttonImageStyle
                : style.slectedbuttonImageStyle
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default CCheckBox;
