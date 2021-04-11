import React, {PureComponent} from 'react';
import {Modal} from 'react-native';
import CButtonWithImage from '../cButtonWithImage';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Constants} from '../../utilities';
import Style from './style';
const {LOCAL_PATH} = Constants;
class CZoomImage extends PureComponent {
  render() {
    const {image, modalStyle, closeModal} = this.props;

    return (
      <Modal visible={true} transparent={true} style={modalStyle}>
        <ImageViewer imageUrls={image} />
        <CButtonWithImage
          onPress={closeModal}
          imagePath={LOCAL_PATH.CROSS_ICON}
          buttonContainerStyle={Style.zoom}
          customeImageStyle={Style.zoomImage}
          buttonCustomStyle={Style.zoomButton}
        />
      </Modal>
    );
  }
}

export default CZoomImage;
