import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import style from './styles';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

class CButton extends PureComponent {
  render() {
    const {
      textStyle,
      buttonContainerStyle,
      onPress,
      text,
      disabled,
      backgroundColor,
      buttonCustomStyle,
      loading,
      children,
      accessibilityLabel,
      testID,
      txtTestID,
    } = this.props;
    return (
      <View style={[style.buttonContainerStyle, buttonContainerStyle]}>
        <TouchableOpacity
          accessible={true}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          style={[
            style.buttonStyle,
            {backgroundColor: backgroundColor},
            buttonCustomStyle,
          ]}
          onPress={onPress}
          disabled={disabled}>
          {loading ? (
            <ActivityIndicator size="small" color={HEX_COLOR_CODES.GREEN_2} />
          ) : (
            <>
              <Text
                accessibilityLabel={txtTestID}
                testID={txtTestID}
                numberOfLines={1}
                style={[style.buttonTextStyle, textStyle]}>
                {text}
              </Text>
              {children}
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default CButton;
