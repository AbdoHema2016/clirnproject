import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {Style} from './style';
import CLabel from '../../../../components/cLabel';
import {connect} from 'react-redux';
import {HelperFunctions} from '../../../../utilities';
import Loader from '../../../../components/cLoader';
import {historyRenderItem} from './helperFunctions';
import {getShareHistoryAction} from './redux/actions';
import {translate} from '../../../../Localization';
const {keyExtractor} = HelperFunctions;

const checkIfThereIsAnyHistory = (props) => {
  const {shareHistory, associatedCompanyID} = props;
  if (shareHistory.length > 0) {
    return (
      <View style={Style.flatList}>
        <FlatList
          data={shareHistory}
          contentContainerStyle={Style.listContainer}
          renderItem={(item) => historyRenderItem(item, associatedCompanyID)}
          keyExtractor={keyExtractor}
        />
      </View>
    );
  }
  return (
    <View style={Style.noHistoryContainer}>
      <CLabel
        style={Style.noData}
        text={translate('STRINGS.NO_SHARE_HISTORY')}
      />
    </View>
  );
};

const getShareHistoryApi = ({getShareHistory, access_token}) => {
  getShareHistory(access_token);
};
const ShareHistory = (props) => {
  const [loading] = useState(false);
  useEffect(() => {
    getShareHistoryApi(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={Style.container}>
      <CLabel
        style={Style.appTitle}
        text={translate('SHARE_HISTORY_SCREEN_STRINGS.TITLE')}
      />
      {checkIfThereIsAnyHistory(props)}
      <Loader loading={loading} />
    </View>
  );
};
const mapStateToProps = (state) => {
  const {
    signIn: {token},
    shareHistory: {shareHistory},
    temperatureHistoryReducer: {temperatureHistory, loading, modalIndex},
    userProfile: {associatedCompanyID},
  } = state;
  return {
    access_token: token,
    temperatureHistory,
    loading,
    modalIndex,
    shareHistory,
    associatedCompanyID,
  };
};
const mapDispatchToProps = {
  getShareHistory: getShareHistoryAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(ShareHistory);
