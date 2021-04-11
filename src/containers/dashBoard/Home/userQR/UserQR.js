import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Modal, Image} from 'react-native';
import {Style} from './style';
import MeSignShare from '../../../../components/cMeSignShare';
import {Constants} from '../../../../utilities';

const {LOCAL_PATH} = Constants;

class UserQR extends PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <Modal style={Style.modal} animationType="fade" transparent={true}>
        <View style={[Style.modalContainer]}>
          <TouchableOpacity style={Style.closeBtn} onPress={onPress}>
            <Image source={LOCAL_PATH.CROSS_ICON} style={Style.closeImg} />
          </TouchableOpacity>
          <MeSignShare />
        </View>
      </Modal>
    );
  }
}

export default UserQR;
