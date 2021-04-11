import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import CText from '../../../../../components/cTextField';
import LabelContainer from '../../../../../components/cLabelContainer';
import {Layout, testIds} from '../../../../../utilities';

import {translate} from '../../../../../Localization';

import CPhoneNum from '../../../../../components/cPhoneNumber';
import Style from '../style';

const {HEX_COLOR_CODES} = Layout;

export function createContactDetailFields(props) {
  const {
    checkEmailError,
    returnEmailError,
    checkMobileError,
    returnMobileError,
    email,
    mobile,
    editEmail,
    editMobile,
    editable,
    focusMobile,
    setMobileRef,
    doneAction,
    countryCode,
    onCountryCodeSelect,
    fetchingData,
    countryCodeList,
  } = props;
  let contactDetails = [
    {
      id: '0',
      title: translate('CONTACT_DETAILS_SCREEN_STRINGS.EMAIL_LABEL'),
      value: email.value,
      state: email.state,
      checkError: checkEmailError,
      returnError: returnEmailError,
      editVal: editEmail,
      focusMobile: () => focusMobile(),
      returnKeyType: 'next',
    },
    {
      id: '1',
      title: translate('CONTACT_DETAILS_SCREEN_STRINGS.PHONE_NUMBER_LABEL'),
      value: mobile.value,
      state: mobile.state,
      checkError: checkMobileError,
      returnError: returnMobileError,
      editVal: editMobile,
      focusMobile: doneAction,
      returnKeyType: 'done',
    },
  ];
  if (fetchingData) {
    return (
      <ActivityIndicator size={'large'} color={HEX_COLOR_CODES.GREEN_BLUE} />
    );
  }

  return contactDetails.map((detail, index) => (
    <View key={detail.id}>
      <CLabel style={Style.inputLabel} text={detail.title} />
      {index === 0 ? (
        <CText
          testID={testIds.emailSignIn}
          accessibilityLabel={testIds.emailSignIn}
          editable={editable}
          blurOnSubmit={false}
          onSubmitEditing={detail.focusMobile}
          placeHolderText={detail.value}
          value={detail.value}
          state={detail.state}
          customSuperContainer={Style.inputTextsupreContainerStyle}
          containerStyle={Style.inputTextStyle}
          error={detail.checkError}
          returnKeyType={detail.returnKeyType}
          keyboardType={'email-address'}
          onChangeText={(val) => detail.editVal(val)}
          errorMessage={detail.returnError}
        />
      ) : (
        <CPhoneNum
          testID={testIds.phone}
          accessibilityLabel={testIds.phone}
          reference={(input) => {
            setMobileRef(input);
          }}
          onCountryCodeSelect={onCountryCodeSelect}
          editable={editable}
          returnKeyType={'next'}
          state={detail.state}
          placeHolderText={'_ _ _ _ _ _ _ _ _ _'}
          value={detail.value}
          countryCodeList={countryCodeList}
          maxLength={11}
          code={countryCode}
          backgroundColor={Style.greyBackgroundColor}
          error={detail.checkError}
          onChangeText={(val) => detail.editVal(val)}
          errorMessage={detail.returnError}
          keyboardType={'phone-pad'}
          accessoryViewLabel={translate('STRINGS.DONE')}
        />
      )}
    </View>
  ));
}

export function createPersonalDetailFields(props) {
  const {title, firstName, middleName, lastName} = props;
  let personalDetails = [
    {
      id: '0',
      title: translate('PERSONAL_DETAILS_SCREEN_STRINGS.TITLE_LABEL'),
      value: title,
    },
    {
      id: '1',
      title: translate('PERSONAL_DETAILS_SCREEN_STRINGS.FIRSTNAME_LABEL'),
      value: firstName,
    },
    {
      id: '2',
      title: translate('PERSONAL_DETAILS_SCREEN_STRINGS.MIDDLENAME_LABEL'),
      value: middleName,
    },
    {
      id: '3',
      title: translate('PERSONAL_DETAILS_SCREEN_STRINGS.LASTNAME_LABEL'),
      value: lastName,
    },
  ];
  return personalDetails.map((detail) => (
    <View key={detail.id}>
      <CLabel style={Style.inputLabel} text={detail.title} />
      <LabelContainer>
        <CLabel
          style={Style.personalDetailText}
          text={detail.value}
          numberOfLines={1}
          ellipsizeMode={'middle'}
        />
      </LabelContainer>
    </View>
  ));
}
