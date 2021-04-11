import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, Switch, Platform} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import CLabel from '../../../../components/cLabel';
import CPicker from '../../../../components/cPicker';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import {Constants, HelperFunctions, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {HealthtestMethodsObj} from '../../Home/Methods';
import Loader from '../../../../components/cLoader';
import {
  getAllCompaniesAction,
  showCompanyProfile,
  setRemoteWorking,
  updateCompanyDataAction,
  getRemoteReasonsAction,
} from '../redux/actions';
import ModalsQueue from '../../../../services/ModalsQueue';
import NoCompany from '../noCompany';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';
const {LOCAL_PATH, profileModals, analyticsIds} = Constants;
const {keyExtractor} = HelperFunctions;
const CompanyItem = ({item, props, refContainer, setPickerVisible}) => {
  const {
    item: {
      company,
      is_default,
      company_id,
      working_remotely,
      remote_working_reason,
    },
  } = item;
  const {
    token,
    showCompany,
    updateCompanyData,
    remoteReasons,
    setRemoteReason,
  } = props;
  const [remoteWork, setRemoteWorkState] = useState(working_remotely);
  const [remoteWorkingReason, setremoteWorkingReasonState] = useState(
    remote_working_reason,
  );
  const [isPickerVisible, setPickerValue] = useState(false);

  const showPicker = () => {
    if (isPickerVisible) {
      setPickerVisible(false);
      setPickerValue(false);
      setRemoteReason({company_id, reason: remoteWorkingReason});
    } else {
      setPickerVisible(true);
      setTimeout(
        () =>
          refContainer.current.scrollToIndex({
            index: item.index,
            animated: true,
          }),
        500,
      );

      setPickerValue(true);
    }
  };
  return (
    <View style={Style.companyContainer}>
      <View style={Style.companyCard}>
        <CLabel
          style={Style.companyNameTag}
          text={translate('COMPANY.COMPANY_TITLE')}
        />
        <View style={Style.flexRow}>
          <View style={Style.details}>
            <CLabel
              style={Style.companyName}
              text={company.location_name || company.company}
            />
          </View>
          <CButtonWithImage
            imagePath={LOCAL_PATH.BIN}
            buttonContainerStyle={Style.binButtonContainer}
            buttonCustomStyle={Style.binButton}
            customeImageStyle={Style.binIcon}
            onPress={() => {
              updateCompanyData({
                companyName: company.location_name || company.company,
                companyID: company_id,
              });
              ModalsQueue.showModal({
                modalId: profileModals.companyRemoveModal,
                showModalFunction: () => {
                  HealthtestMethodsObj.showModal(
                    profileModals.companyRemoveModal,
                  );
                },
              });
            }}
          />
        </View>
        <View style={Style.flexRow}>
          {is_default ? (
            <CButtonWithImage
              imagePath={LOCAL_PATH.RADIO_BTN}
              buttonContainerStyle={Style.cRadioBtn}
              buttonCustomStyle={Style.binButton}
              customeImageStyle={Style.radioBtnBckground}
              onPress={() => {
                showCompany({token, company_id});
              }}
            />
          ) : (
            <CButtonWithImage
              imagePath={LOCAL_PATH.RADIO_UNCHECKED_BTN}
              buttonContainerStyle={Style.cRadioUncheckedBtn}
              buttonCustomStyle={Style.binButton}
              customeImageStyle={Style.radioBtnBckground}
              onPress={() => {
                showCompany({token, company_id});
              }}
            />
          )}
          <CLabel
            style={Style.showinProfileLbl}
            text={translate('COMPANY.SHOW_IN_PROFILE')}
          />
        </View>
        <View style={Style.flexRow}>
          <CLabel
            style={Style.workRemotelyLbl}
            text={translate('COMPANY.WORKING_REMOTELY')}
          />
          <Switch
            testID={testIds.remoteWorkToggle}
            accessibilityLabel={testIds.remoteWorkToggle}
            style={Style.switchworkRemote}
            value={remoteWork}
            onValueChange={(value) => {
              setRemoteWorkState(!remoteWork);
              if (!value) {
                setRemoteReason({company_id});
                setremoteWorkingReasonState(props.remoteReasons[0]);
                return;
              }
              setRemoteReason({company_id, reason: props.remoteReasons[0]});
            }}
          />
        </View>
        {remoteWork && (
          <View>
            <CLabel
              style={Style.reason}
              text={translate('COMPANY.REASON_FOR_WORKING_REMOTELY')}
            />
            {Platform.OS === 'ios' ? (
              <CButtonWithImage
                text={
                  remoteWorkingReason
                    ? remoteWorkingReason
                    : props.remoteReasons[0]
                }
                textStyle={Style.dropDownTextStyle}
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
                buttonContainerStyle={Style.selectReason}
                buttonCustomStyle={Style.binButton}
                customeImageStyle={Style.dropDown}
                onPress={showPicker}
              />
            ) : (
              <CPicker
                androidPickerContainer={Style.selectReason}
                androidPicker={Style.androidDropDown}
                selectedValue={remoteWorkingReason}
                setTitle={(reason) => {
                  if (remoteWorkingReason !== reason) {
                    setremoteWorkingReasonState(reason);
                    setRemoteReason({company_id, reason});
                  }
                }}
                showDatePicker={showPicker}
                pickerItems={remoteReasons}
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              />
            )}
          </View>
        )}
        <View style={Style.underLine} />
      </View>
      {isPickerVisible && Platform.OS === 'ios' && (
        <CPicker
          selectedValue={remoteWorkingReason}
          showDatePicker={showPicker}
          pickerItems={remoteReasons}
          setTitle={(reason) => {
            if (remoteWorkingReason !== reason) {
              setremoteWorkingReasonState(reason);
            }
          }}
        />
      )}
    </View>
  );
};
const MyCompany = (props) => {
  const {associatedCompany} = props;
  const refContainer = useRef(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  useEffect(() => {
    const {getCompanies, getRemoteReasons, token} = props;
    if (associatedCompany) {
      getCompanies(token);
    }
    getRemoteReasons();
    logAnalyticsEvent(analyticsIds.my_company);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (associatedCompany) {
    return (
      <View style={Style.container}>
        <CLabel
          style={Style.appTitle}
          text={translate('SETTINGS.MY_COMPANY')}
        />
        <FlatList
          data={props.allCompanies}
          style={
            !pickerVisible
              ? Style.pickerVisiblelist
              : Style.pickerNotVisiblelist
          }
          renderItem={(item) => (
            <CompanyItem
              item={item}
              props={props}
              refContainer={refContainer}
              setPickerVisible={setPickerVisible}
            />
          )}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          ref={refContainer}
        />
        <Loader loading={props.loading} />
      </View>
    );
  } else {
    return <NoCompany />;
  }
};

const mapStateToProps = (state) => {
  const {
    signIn: {token},
    companies: {allCompanies, loading, remoteReasons},
    userProfile: {associatedCompany},
  } = state;
  return {
    loading,
    allCompanies,
    associatedCompany,
    remoteReasons,
    token,
  };
};
const mapDispatchToProps = {
  getCompanies: getAllCompaniesAction,
  showCompany: showCompanyProfile,
  updateCompanyData: updateCompanyDataAction,
  getRemoteReasons: getRemoteReasonsAction,
  setRemoteReason: setRemoteWorking,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCompany);
