import React from 'react';
import {View, Keyboard} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import Style from '../Style';
import CPassword from '../../../../../components/cPassword';
import {validatePassword} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
import {
  ifKeyAlreadyExists,
  createBiometricId,
  deleteKeys,
} from '../../../../Biomitric/Biometrics';
import {showErrorMessage} from '../../../../../utilities';
import {testIds} from '../../../../../utilities';
class PasswordSettingsHelperFunctions {
  constructor() {
    this.props = null;
    this.instance = null;
    this.oldPassword = {};
    this.newPassword = {};
    this.confirmPassword = {};
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }

  setReferences = (index, ref) => {
    switch (index) {
      case 0:
        return (this.oldPassword = ref);
      case 1:
        return (this.newPassword = ref);
      case 2:
        return (this.confirmPassword = ref);
    }
  };

  createPasswordFeilds = () => {
    const {
      oldPassword: {value: oldValue, state: oldState, hidden: oldHidden},
      newPassword: {value: newValue, state: newState, hidden: newHidden},
      confirmNewPassword: {value: conValue, state: conState, hidden: conHidden},
    } = this.instance.state;
    let passwordDetails = [
      {
        id: '0',
        title: translate('PASSWORD_SETTINGS.CURRENT_PASSWORD'),
        placeholder: translate('PASSWORD_SETTINGS.ENTER_THE_PASSWORD'),
        value: oldValue,
        state: oldState,
        hiddenPasswordState: oldHidden,
        checkError: this.checkOldPasswordError(),
        returnError: this.returnOldPasswordError(),
        focusNext: () => this.newPassword.focus(),
        returnKeyType: 'next',
        hidePassword: () => this.hideOldPassword(),
        testID: testIds.oldPassword,
        accessibilityLabel: testIds.oldPassword,
      },
      {
        id: '1',
        title: translate('PASSWORD_SETTINGS.NEW_PASSWORD'),
        placeholder: translate('PASSWORD_SETTINGS.ENTER_NEW_PASSWORD'),
        value: newValue,
        state: newState,
        hiddenPasswordState: newHidden,
        checkError: this.checkNewPasswordError(),
        returnError: this.returnNewPasswordError(),
        focusNext: () => this.confirmPassword.focus(),
        returnKeyType: 'next',
        hidePassword: () => this.hideNewPassword(),
        testID: testIds.newPassword,
        accessibilityLabel: testIds.newPassword,
      },
      {
        id: '2',
        title: translate('PASSWORD_SETTINGS.CONFIRM_NEW_PASSWORD'),
        placeholder: translate('PASSWORD_SETTINGS.ENTER_NEW_PASSWORD'),
        value: conValue,
        state: conState,
        hiddenPasswordState: conHidden,
        checkError: this.checkConfirmPasswordError(),
        returnError: this.returnConfirmPasswordError(),
        focusNext: this.doneAction,
        returnKeyType: 'done',
        hidePassword: () => this.hideConfirmPassword(),
        testID: testIds.confirmPassword,
        accessibilityLabel: testIds.confirmPassword,
      },
    ];
    return passwordDetails.map((detail, index) => (
      <View key={detail.id}>
        <CLabel style={Style.inputLabel} text={detail.title} />
        <CPassword
          testID={detail.testID}
          accessibilityLabel={detail.accessibilityLabel}
          reference={(input) => {
            this.setReferences(index, input);
          }}
          editable={true}
          blurOnSubmit={false}
          hidePasswordAction={detail.hidePassword}
          hidePassword={detail.hiddenPasswordState}
          placeHolderText={detail.placeholder}
          onSubmitEditing={detail.focusNext}
          value={detail.value}
          state={detail.state}
          customSuperContainer={Style.inputTextsupreContainerStyle}
          containerStyle={Style.inputTextStyle}
          error={detail.checkError}
          returnKeyType={detail.returnKeyType}
          onChangeText={(val) => this.editPassword(index, val)}
          errorMessage={detail.returnError}
        />
      </View>
    ));
  };

  doneAction = () => {
    Keyboard.dismiss();
  };

  checkOldPasswordError = () => {
    if (!this.instance.state.checkError) {
      return;
    }
    return !validatePassword(this.instance.state.oldPassword.value);
  };

  returnOldPasswordError = () => {
    if (!this.instance.state.oldPassword.value) {
      return translate('PASSWORD_SETTINGS.EMPTY_PASSWORD');
    }
    if (!validatePassword(this.instance.state.oldPassword.value)) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_PASSWORD');
    }
  };

  checkNewPasswordError = () => {
    const {
      checkError,
      newPassword: {value: newValue},
      oldPassword: {value: oldValue},
    } = this.instance.state;
    if (!checkError) {
      return;
    }
    return !validatePassword(newValue) || newValue === oldValue;
  };

  returnNewPasswordError = () => {
    const {
      newPassword: {value: newValue},
      oldPassword: {value: oldValue},
    } = this.instance.state;
    if (!newValue) {
      return translate('PASSWORD_SETTINGS.EMPTY_PASSWORD');
    }
    if (oldValue === newValue) {
      return translate('PASSWORD_SETTINGS.SAME_PASSWORD');
    }
    if (!validatePassword(newValue)) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_PASSWORD');
    }
  };

  checkConfirmPasswordError = () => {
    const {
      checkError,
      newPassword: {value: newValue},
      confirmNewPassword: {value: conValue},
    } = this.instance.state;
    if (!checkError) {
      return;
    }
    return newValue !== conValue || newValue.length === 0;
  };

  returnConfirmPasswordError = () => {
    const {
      newPassword: {value: newValue},
      confirmNewPassword: {value: conValue},
    } = this.instance.state;
    if (!conValue) {
      return translate('PASSWORD_SETTINGS.EMPTY_PASSWORD');
    }
    if (newValue !== conValue) {
      return translate('PASSWORD_SETTINGS.CONFIRM_PASSWORD_DOES_NOT_MATCH');
    }
  };

  editPassword = (pos, pwd) => {
    const {oldPassword, newPassword, confirmNewPassword} = this.instance.state;
    switch (pos) {
      case 0:
        return this.instance.setState({
          oldPassword: {
            value: pwd,
            state: 'Focused',
            hidden: oldPassword.hidden,
          },
          newPassword: {
            ...newPassword,
            state: 'Active',
          },
          confirmNewPassword: {
            ...confirmNewPassword,
            state: 'Active',
          },
        });
      case 1:
        return this.instance.setState({
          newPassword: {
            value: pwd,
            state: 'Focused',
            hidden: newPassword.hidden,
          },
          oldPassword: {
            ...oldPassword,
            state: 'Active',
          },
          confirmNewPassword: {
            ...confirmNewPassword,
            state: 'Active',
          },
        });
      case 2:
        return this.instance.setState({
          confirmNewPassword: {
            value: pwd,
            state: 'Focused',
            hidden: confirmNewPassword.hidden,
          },
          newPassword: {
            ...newPassword,
            state: 'Active',
          },
          oldPassword: {
            ...oldPassword,
            state: 'Active',
          },
        });
    }
  };

  hideOldPassword = () => {
    const {oldPassword} = this.instance.state;
    this.instance.setState({
      oldPassword: {
        ...oldPassword,
        hidden: !oldPassword.hidden,
      },
    });
  };

  hideNewPassword = () => {
    const {newPassword} = this.instance.state;

    this.instance.setState({
      newPassword: {
        ...newPassword,
        hidden: !newPassword.hidden,
      },
    });
  };

  hideConfirmPassword = () => {
    const {confirmNewPassword} = this.instance.state;

    this.instance.setState({
      confirmNewPassword: {
        ...confirmNewPassword,
        hidden: !confirmNewPassword.hidden,
      },
    });
  };
  changeBiometric = async () => {
    const {
      sendPublicKey,
      updatePublicKey,
      access_token,
      userID,
      email,
    } = this.props;
    try {
      let biometricEnabled = await AsyncStorage.getItemFromStorage(
        AsyncConstants.BIOMETRIC_ENABLED,
      );
      await AsyncStorage.setItemInStorage(
        AsyncConstants.BIOMETRIC_ENABLED,
        !biometricEnabled,
      );
      let publicKey = await AsyncStorage.getItemFromStorage(
        AsyncConstants.PUBLIC_KEY,
      );
      if (biometricEnabled) {
        updatePublicKey({
          token: access_token,
          publicKey,
          userID,
          biometricEnabled,
        });
        this.instance.setState({
          biometricEnabled: !biometricEnabled,
        });
        return;
      }
      let publicKeyExist = await ifKeyAlreadyExists();
      if (publicKeyExist) {
        await deleteKeys();
      }
      let publicKeyID = await createBiometricId();
      if (publicKeyID) {
        let formatPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyID}\n-----END PUBLIC KEY-----`;
        await AsyncStorage.setItemInStorage(
          AsyncConstants.USER_EMAIL,
          email.toLowerCase(),
        );
        await AsyncStorage.setItemInStorage(
          AsyncConstants.BIOMETRIC_ENABLED,
          true,
        );
        await AsyncStorage.setItemInStorage(
          AsyncConstants.PUBLIC_KEY,
          formatPublicKey,
        );
        sendPublicKey({
          token: access_token,
          publicKey: formatPublicKey,
          userID,
        });
      }
      this.instance.setState({
        biometricEnabled: !biometricEnabled,
      });
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };

  checkBiometricEnabled = async () => {
    try {
      let userEmail = await AsyncStorage.getItemFromStorage(
        AsyncConstants.USER_EMAIL,
      );
      let biometricEnabled = await AsyncStorage.getItemFromStorage(
        AsyncConstants.BIOMETRIC_ENABLED,
      );
      let publicKeyCheck = await ifKeyAlreadyExists();
      if (publicKeyCheck && userEmail && biometricEnabled) {
        this.instance.setState({
          biometricEnabled: true,
        });
        return;
      }

      this.instance.setState({
        biometricEnabled: false,
      });
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };

  updatePassword = () => {
    this.instance.setState(
      {
        checkError: true,
      },
      () => {
        const {
          oldPassword,
          newPassword,
          confirmNewPassword,
        } = this.instance.state;
        const {userID, access_token, updatePassword} = this.props;
        let data = {
          password: oldPassword.value,
          new_password: newPassword.value,
          confirm_new_password: confirmNewPassword.value,
          id: userID,
          token: access_token,
        };
        if (
          !this.checkOldPasswordError() &&
          !this.checkNewPasswordError() &&
          !this.checkConfirmPasswordError()
        ) {
          updatePassword(data);
        }
      },
    );
  };
}

const passwordSettingsHelperFunctions = new PasswordSettingsHelperFunctions();

export default passwordSettingsHelperFunctions;
