import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Constants} from '../../../../../utilities';
import Style from './style';

const {LOCAL_PATH} = Constants;

class HeaderComponent extends PureComponent {
  render() {
    const {
      option: {id, title},
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={title}
        testID={title}
        style={Style.cellCotainer}
        onPress={() => onPress(id)}
        activeOpacity={0.7}>
        <View style={Style.titleContainer}>
          <Text
            style={[
              Style.title,
              id === 11 ? Style.redTitle : id === 10 ? Style.greenTitle : null,
            ]}>
            {title}
          </Text>

          {id !== 10 && id !== 11 && (
            <Image style={Style.goIcon} source={LOCAL_PATH.RIGHT_ARROW_ICON} />
          )}
        </View>
        {id !== 11 && <View style={Style.underLine} />}
      </TouchableOpacity>
    );
  }
}

export default HeaderComponent;
