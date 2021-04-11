import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CLabel from '../../../components/cLabel';
import {HelperFunctions} from '../../../utilities';
import {translate} from '../../../Localization';

import {Style} from './style';
import CButton from '../../../components/cButton';
import {getCheckInListAction} from './redux/action';
import CheckoutPopup from './checkOutPopUp';
const {keyExtractor, formatCheckedInDate} = HelperFunctions;

const CheckedInList = () => {
  const [isCheckOutPopupVisible, showCheckOutPopup] = useState(false);
  const [visitorId, setVisitorId] = useState(null);
  const checkInList = useSelector(
    (state) => state.checkedInReducer.checkInList,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCheckInListAction());
  }, [dispatch]);
  const checkedInCell = ({item}) => {
    return (
      <View style={Style.cell}>
        <View style={Style.cellInnerView}>
          <View style={Style.checkedInInfo}>
            <CLabel
              style={Style.venueName}
              text={item.company?.location_name || item.company?.company}
            />
            <CLabel
              style={Style.checkedInTime}
              text={
                translate('CHECK_OUT_POPUP.CHECKED_IN') +
                formatCheckedInDate(item.created_at)
              }
            />
          </View>
          <CButton
            buttonContainerStyle={Style.checkOutButton}
            textStyle={Style.checkOutButtonTitle}
            text={translate('CHECK_OUT_POPUP.CHECK_OUT')}
            onPress={() => {
              showCheckOutPopup(true);
              setVisitorId(item.id);
            }}
          />
        </View>
        <View style={Style.underLine} />
      </View>
    );
  };
  return (
    <View style={Style.container}>
      <CLabel
        style={Style.appTitle}
        text={translate('CHECK_OUT_POPUP.CHECKED_IN')}
      />
      <View style={Style.flatList}>
        {checkInList.length > 0 ? (
          <FlatList
            data={checkInList}
            contentContainerStyle={Style.listContainer}
            renderItem={checkedInCell}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <CLabel
            style={Style.noCheckIn}
            text={translate('CHECK_OUT_POPUP.NO_CHECKIN')}
          />
        )}

        <CheckoutPopup
          isCheckOutPopupVisible={isCheckOutPopupVisible}
          showCheckOutPopup={showCheckOutPopup}
          visitorId={visitorId}
          getCheckInList={getCheckInListAction}
        />
      </View>
    </View>
  );
};

export default CheckedInList;
