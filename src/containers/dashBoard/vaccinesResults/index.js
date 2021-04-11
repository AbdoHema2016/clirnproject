import React, {Component} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Style} from './style';
import CLabel from '../../../components/cLabel';
import {connect} from 'react-redux';
import {HelperFunctions, testIds, LOCAL_PATH} from '../../../utilities';
import {translate} from '../../../Localization';

import Loader from '../../../components/cLoader';
import resultsMethods from './resultsMethods';
import CButtonWithImage from '../../../components/cButtonWithImage';
import {
  getVaccinationAction,
  deleteVaccineAction,
  uploadImageSuccessAction,
  uploadVaccineImageAction,
  editVaccineDetailsAction,
  setVaccineFieldsToBeEditedAction,
  showVaccineModalAction,
} from './redux/actions';
import VaccineRemovePopup from './vaccinePopups/vaccineRemovePopup';
const {keyExtractor} = HelperFunctions;
class VaccinesResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      removeVaccineVisible: false,
      vaccineName: '',
      vaccineId: '',
      editData: false,
      editIndex: 0,
      showDatePicker: false,
      dateType: '',
      editVaccineName: {value: '', isEmpty: true},
      editHealthCentre: {value: '', isEmpty: true},
      editTestDate: {value: '', isEmpty: true},
      editExpiryDate: {value: '', isEmpty: true},
      editPhoto: {value: '', isEmpty: true},
      checkMissingFields: false,
      error: '',
      loading: false,
    };
    resultsMethods.setProps = this.props;
    resultsMethods.setInstance = this;
  }

  componentDidMount() {
    resultsMethods.refreshVaccineResults();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vaccinations !== this.props.vaccinations) {
      resultsMethods.setProps = this.props;
    }
  }
  checkforVaccine = () => {
    const {vaccinationResults} = this.props;
    if (vaccinationResults?.length > 0) {
      return (
        <View style={Style.flatList}>
          <FlatList
            data={vaccinationResults}
            contentContainerStyle={Style.listContainer}
            renderItem={resultsMethods.vaccineRenderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={resultsMethods.refreshVaccineResults}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }

    return (
      <View style={Style.noHistoryContainer}>
        <CLabel
          style={Style.noData}
          text={translate('VACCINE_SCREEN.NO_RESULTS')}
        />
      </View>
    );
  };

  render() {
    let {removeVaccineVisible, vaccineName, vaccineId, editIndex} = this.state;
    const {deleteVaccine, vaccinationResults, showVaccineModal} = this.props;
    return (
      <View style={Style.container}>
        <CLabel
          style={Style.appTitle}
          text={translate('VACCINE_SCREEN.TITLE')}
        />
        {this.checkforVaccine()}

        <Loader loading={this.props.loading} />
        <CButtonWithImage
          testID={testIds.addNewVaccine}
          accessibilityLabel={testIds.addNewVaccine}
          buttonContainerStyle={Style.addNewButton}
          text={translate('VACCINE_SCREEN.ADD')}
          textStyle={Style.addNewButtonText}
          imagePath={LOCAL_PATH.plus}
          customeImageStyle={Style.addImageStyle}
          onPress={resultsMethods.addNewTest}
        />

        {removeVaccineVisible && (
          <VaccineRemovePopup
            vaccineName={vaccineName}
            vaccineId={vaccineId}
            toggleRemoveVaccine={resultsMethods.toggleRemoveVaccine}
            deleteVaccine={deleteVaccine}
          />
        )}
        {showVaccineModal &&
          resultsMethods.returnEditableVaccineData(
            vaccinationResults[editIndex],
          )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    vaccinations: {
      vaccinationResults,
      loading,
      imageName,
      uploadingImageLoader,
      showVaccineModal,
    },
    signIn: {token, userID},
    vaccinations,
  } = state;
  return {
    vaccinationResults,
    loading,
    token,
    userID,
    imageName,
    vaccinations,
    uploadingImageLoader,
    showVaccineModal,
  };
};

const mapDispatchToProps = {
  getVaccinations: getVaccinationAction,
  deleteVaccine: deleteVaccineAction,
  uploadVaccineDetails: uploadImageSuccessAction,
  uploadImageS3: uploadVaccineImageAction,
  editVaccineDetails: editVaccineDetailsAction,
  setVaccineFieldsToBeEdited: setVaccineFieldsToBeEditedAction,
  showVaccineModalOnVaccineList: showVaccineModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinesResults);
