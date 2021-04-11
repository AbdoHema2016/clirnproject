import React from 'react';
import {View} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import {Style} from '../style';
import {translate} from '../../../../../Localization';

import dayjs from 'dayjs';
import {shareHistory, DATEFORMATS} from '../../../../../Constants/appConstants';

const matchType = (item, associatedCompanyID) => {
  const {type, company_id, company} = item;
  const {
    GENERAL_PROFILE,
    HEALTH_TEST_RESULTS,
    CONTACT_DETAILS,
    SCANNED_COMPANY,
    PROFILE,
  } = shareHistory;
  if (type === GENERAL_PROFILE.type) {
    return GENERAL_PROFILE.value;
  }
  if (type === HEALTH_TEST_RESULTS.type) {
    return HEALTH_TEST_RESULTS.value;
  }
  if (type === CONTACT_DETAILS.type && associatedCompanyID === company_id) {
    return `${SCANNED_COMPANY.value}${company?.company}`;
  }
  if (type === CONTACT_DETAILS.type) {
    return CONTACT_DETAILS.value;
  }
  if (type === PROFILE.type) {
    return PROFILE.value;
  }
};

const getReceiversName = (item) => {
  const {GENERAL_PROFILE, HEALTH_TEST_RESULTS} = shareHistory;
  const {type, receiver_first_name, receiver_last_name, company} = item;
  if (type === GENERAL_PROFILE.type || type === HEALTH_TEST_RESULTS.type) {
    return receiver_first_name + ' ' + receiver_last_name;
  }
  return company?.location_name || company?.company;
};

export const historyRenderItem = ({item}, associatedCompanyID) => {
  const {SCANNED_COMPANY} = shareHistory;
  return (
    <View style={Style.historyCard}>
      <CLabel
        style={Style.sharedDetail}
        text={matchType(item, associatedCompanyID)}
      />
      {!(
        associatedCompanyID === item.company_id &&
        item.type === SCANNED_COMPANY.type
      ) && (
        <CLabel
          style={Style.sharedWith}
          text={translate('STRINGS.SHARE_WITH') + getReceiversName(item)}
        />
      )}

      <CLabel
        style={Style.time}
        text={dayjs(item.created_at).format(DATEFORMATS.TESTDETAILS)}
      />
      <View style={Style.underLine} />
    </View>
  );
};
