import React, {PureComponent} from 'react';
import {View, SafeAreaView, Modal} from 'react-native';
import Style from '../../../dashBoard/Home/components/overlayComponent/style';
import CHealthTestContainer from '../../../health/healthTest/healthTestContainerForProfile';
import {HealthtestMethodsObj} from '../../Home/Methods';
import resultsMethods from '../Results/ResultsMethods';
import ErrorView from '../../../../components/cMeError';
import {translate} from '../../../../Localization';

import CLoader from '../../../../components/cLoader';

class COverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
    };
  }
  closePopUp = () => {
    const {instance} = this.props;
    instance.setState({showModal: false});
  };

  showPopUp = () => {
    const {instance, instanceState} = this.props;
    return (
      <>
        {instance.state.error && (
          <Modal visible={instance.state.error}>
            <ErrorView
              style={Style.errorContainer}
              errorText={translate('STRINGS.ERROR_CAMERA_PROFILE')}
              onClose={resultsMethods.showError}
            />
          </Modal>
        )}

        <CHealthTestContainer
          showPicker={instanceState.showPicker}
          instance={instance}
          pickerSelectedValue={HealthtestMethodsObj.pickerSelectedValue}
          callback={() => resultsMethods.showError()}
        />
      </>
    );
  };

  render() {
    const {
      instanceState,
      hideModal,
      props: {uploadingHealhtTestImage},
    } = this.props;
    return (
      <SafeAreaView>
        {instanceState.showModal && (
          <View style={[Style.modalContainer]}>
            <Modal
              style={Style.modal}
              animationType="slide"
              transparent={true}
              hideModal={hideModal}
              visible={instanceState.showModal}>
              <View style={Style.dataContainer}>
                {this.showPopUp(instanceState.popupType)}

                <CLoader loading={uploadingHealhtTestImage} />
              </View>
            </Modal>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default COverlay;
