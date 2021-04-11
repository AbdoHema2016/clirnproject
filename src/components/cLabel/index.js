import React, {PureComponent} from 'react';
import {Text, Linking} from 'react-native';
import Style from './style';
class CLabel extends PureComponent {
  render() {
    const {
      text,
      style,
      numberOfLines,
      onPress,
      testID,
      accessibilityLabel,
      link,
      url,
      subText,
      subTextStyle,
      ellipsizeMode,
    } = this.props;
    return (
      <Text
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        numberOfLines={numberOfLines}
        style={[style]}
        ellipsizeMode={ellipsizeMode}
        onPress={onPress}>
        {text}
        {link && (
          <Text style={Style.link} onPress={() => Linking.openURL(url)}>
            {link}
          </Text>
        )}
        {subText && <Text style={subTextStyle}>{subText}</Text>}
      </Text>
    );
  }
}
export default CLabel;
