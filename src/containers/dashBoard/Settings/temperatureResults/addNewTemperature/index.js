import React, {PureComponent} from 'react';
import {View, SafeAreaView, Modal} from 'react-native';
import Style from '../../../Home/components/overlayComponent/style';
import CTemparatureUpdateModal from '../../../../health/temperature/addTemperatureModalComponent';
import CFeeling from '../../../../../components/cHowYouFeeling';
import {Constants} from '../../../../../utilities';
import ContactHR from '../../../../../components/ContactHR';
const {profileModals} = Constants;

class COverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
    };
  }
  render() {
    const {instance, props, instanceState, source, hideModal} = this.props;
    return (
      <SafeAreaView>
        <View style={[Style.modalContainer]}>
          <Modal
            style={Style.modal}
            animationType="slide"
            transparent={true}
            visible={instanceState.showModal}>
            <View style={Style.dataContainer}>
              {props.modalIndex === profileModals.temparatureUpdateModal ? (
                <CTemparatureUpdateModal
                  instance={instance}
                  props={props}
                  source={source}
                  hideModal={hideModal}
                  showPicker={this.state.showPicker}
                />
              ) : props.modalIndex === profileModals.feelingUpdateModal ? (
                <CFeeling
                  instance={instance}
                  props={props}
                  source={source}
                  hideModal={hideModal}
                  showPicker={this.state.showPicker}
                />
              ) : (
                <ContactHR
                  instance={instance}
                  props={props}
                  hideModal={hideModal}
                  source={source}
                />
              )}
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
export default COverlay;
