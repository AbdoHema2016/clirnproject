import React, {PureComponent} from 'react';
import {Image} from 'react-native';

import FastImage from 'react-native-fast-image';
class CImage extends PureComponent {
  render() {
    const {
      imageStyle,
      imagePath,
      resizeMode,
      onLoadEnd,
      onLoadStart,
      testID,
    } = this.props;

    return (
      <FastImage
        testID={testID}
        accessibilityLabel={testID}
        resizeMode={resizeMode}
        style={imageStyle}
        source={{
          uri: Image.resolveAssetSource(imagePath)?.uri,
          cache: FastImage.cacheControl.immutable,
        }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />
    );
  }
}

export default CImage;
