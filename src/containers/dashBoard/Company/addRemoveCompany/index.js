import React from 'react';
import {View, Text} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CButton from '../../../../components/cButton';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {HealthtestMethodsObj, ProfleMethodsObj} from '../../Home/Methods';
import {businessAPIAction} from '../../Home/redux/actions';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import ModalsQueue from '../../../../services/ModalsQueue';
import {removeCompanyAction} from '../redux/actions';
const {LOCAL_PATH, profileModals, businessRequest, modalIds} = Constants;

class CAddRemoveCompany extends React.PureComponent {
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId:
        this.props.modalIndex === profileModals.companyRemoveModal
          ? profileModals.companyRemoveModal
          : modalIds.addRemoveCompany,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };

  businessRequestApi = (status) => {
    const {businessAPI, token, inviteId} = this.props;
    businessAPI(inviteId, token, status);
    this.closemodal();
    AsyncStorage.removeItemFromStorage(AsyncConstants.COMPANY_NAME);
    AsyncStorage.removeItemFromStorage(AsyncConstants.INVITE_ID);
    setTimeout(function () {
      ProfleMethodsObj._onRefresh();
    }, 1000);
  };
  removeBusiness = () => {
    const {removeCompany, removedCompanyID, token} = this.props;
    removeCompany({token, removedCompanyID});
    this.closemodal();
    setTimeout(function () {
      ProfleMethodsObj._onRefresh();
    }, 1000);
  };
  popupContent = () => {
    const {companyName, removedCompanyName, title, addCompany} = this.props;
    if (addCompany) {
      return (
        <>
          <Text style={Style.topMsg}>
            <Text style={Style.companyName}>{companyName}</Text>
            <Text style={Style.addMsg}>{title}</Text>
          </Text>
          <Text style={Style.confirmMsg}>
            {translate('notificationCompany.body')}
          </Text>
        </>
      );
    }
    return (
      <>
        <Text style={Style.topMsg}>
          <Text style={Style.addMsg}>{title}</Text>
        </Text>
        <Text style={Style.removeBody}>
          <Text style={Style.confirmMsg}>
            {translate('REMOVE_COMPANY.bodyBegin')}
          </Text>
          <Text style={Style.RemoveCompanyName}>{removedCompanyName}</Text>
          <Text style={Style.confirmMsg}>
            {translate('REMOVE_COMPANY.bodyEnd')}
          </Text>
        </Text>
      </>
    );
  };
  render() {
    const {addCompany, accept, reject} = this.props;
    return (
      <View style={Style.container}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closemodal}
        />
        <View style={Style.msgs}>{this.popupContent()}</View>
        <View style={Style.descision}>
          <CButton
            buttonContainerStyle={Style.rejectContainer}
            buttonCustomStyle={Style.buttonStyle}
            textStyle={Style.descisionTxt}
            text={reject}
            onPress={() => {
              addCompany
                ? this.businessRequestApi(businessRequest.reject)
                : this.closemodal();
            }}
          />
          <CButton
            buttonContainerStyle={Style.acceptContainer}
            buttonCustomStyle={Style.buttonStyle}
            textStyle={Style.descisionTxt}
            text={accept}
            onPress={() => {
              addCompany
                ? this.businessRequestApi(businessRequest.accept)
                : this.removeBusiness();
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  signIn: {token},
  userProfile: {inviteId, companyName, modalIndex},
  companies: {removedCompanyName, removedCompanyID},
}) => ({
  modalIndex,
  token,
  inviteId,
  companyName,
  removedCompanyName,
  removedCompanyID,
});

const mapDispatchToProps = {
  businessAPI: businessAPIAction,
  removeCompany: removeCompanyAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CAddRemoveCompany);
