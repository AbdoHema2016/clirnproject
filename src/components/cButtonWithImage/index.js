import React, {PureComponent} from 'react';
import {View, ActivityIndicator} from 'react-native';
import style from './style';
import CButton from '../cButton';
import CImage from '../cImage';
import {Layout} from '../../utilities';
const {HEX_COLOR_CODES} = Layout;

class CButtonWithImage extends PureComponent {
  render() {
    const {
      textStyle,
      buttonContainerStyle,
      onPress,
      text,
      disabled,
      backgroundColor,
      buttonCustomStyle,
      imagePath,
      error,
      state,
      customeImageStyle,
      loading,
      reference,
      accessibilityLabel,
      testID,
      txtTestID,
    } = this.props;
    return (
      <View
        ref={reference}
        style={[
          style.buttonContainerStyle,
          error
            ? style.error
            : state === 'Active'
            ? style.active
            : state === 'Focused'
            ? style.focused
            : null,
          buttonContainerStyle,
        ]}>
        {loading ? (
          <View style={style.loaderView}>
            <ActivityIndicator size="small" color={HEX_COLOR_CODES.GREEN_2} />
          </View>
        ) : (
          <CButton
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            txtTestID={txtTestID}
            buttonContainerStyle={style.cButtonContainerStyle}
            buttonCustomStyle={[
              style.buttonStyle,
              {backgroundColor: backgroundColor},
              buttonCustomStyle,
            ]}
            onPress={onPress}
            disabled={disabled}
            text={text}
            textStyle={textStyle}>
            <CImage
              resizeMode={'contain'}
              imagePath={imagePath}
              imageStyle={[style.buttonImageStyle, customeImageStyle]}
            />
          </CButton>
        )}
      </View>
    );
  }
}

export default CButtonWithImage;
