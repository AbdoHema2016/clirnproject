import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {View, SafeAreaView, Modal} from 'react-native';
import style from './style';
import CVaccineForm from '../vaccineDetails/CVaccineForm';
import Loader from '../../../../components/cLoader';

class COverlay extends PureComponent {
  render() {
    const {
      setCentreName,
      vaccineName,
      healthCentre,
      testDate,
      expiryDate,
      imageName,
      checkMissingFields,
      setVaccineName,
      uploadImage,
      save,
      showDatePicker,
      isDatePickerVisible,
      loading,
      renderDatePicker,
      isModalVisible,
      uploadingImageLoader,
      showVaccinePopUp,
      showVaccineModal,
      screenName,
    } = this.props;
    return (
      <SafeAreaView>
        <View style={style.modalContainer}>
          <Modal
            style={style.modal}
            animationType="slide"
            transparent={true}
            visible={isModalVisible}>
            <View style={style.dataContainer}>
              <View style={style.subDataContainer}>
                <CVaccineForm
                  vaccineName={vaccineName}
                  healthCentre={healthCentre}
                  testDate={testDate}
                  expiryDate={expiryDate}
                  photo={imageName}
                  checkMissingFields={checkMissingFields}
                  setCentreName={setCentreName}
                  setVaccineName={setVaccineName}
                  showDatePicker={showDatePicker}
                  isDatePickerVisible={isDatePickerVisible}
                  uploadImage={uploadImage}
                  save={save}
                  modal={true}
                  loading={loading}
                  renderDatePicker={renderDatePicker}
                  screenName={screenName}
                />
              </View>
            </View>
            {(showVaccineModal || showVaccinePopUp) && (
              <Loader loading={uploadingImageLoader} />
            )}
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {showVaccinePopUp},
    vaccinations: {uploadingImageLoader, showVaccineModal},
    vaccinations,
  } = state;

  return {
    showVaccinePopUp,
    uploadingImageLoader,
    vaccinations,
    showVaccineModal,
  };
};

export default connect(mapStateToProps, {})(COverlay);
