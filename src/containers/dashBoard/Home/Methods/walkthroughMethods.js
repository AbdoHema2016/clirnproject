import AsyncStorage from '../../../../utilities/AsyncStorage';
import ModalsQueue from '../../../../services/ModalsQueue';
import {Constants} from '../../../../utilities';

const {modalIds} = Constants;

class WalkthroughMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }

  profileVisitedBefore = (status) => {
    const {profileVisitedBefore} = this.props;
    profileVisitedBefore(status);
  };

  logout = (token) => {
    const {logout} = this.props;
    logout(token);
  };
  skipPressed = () => {
    ModalsQueue.hideModal({
      modalId: modalIds.walkThrough,
      hideModalFunction: () => this.props.profileVisitedBefore(true),
    });

    AsyncStorage.setItemInStorage('PROFILEVISITED', '1');
    this.instance.setState({
      step: 8,
    });
  };

  nextStepPressed = () => {
    this.instance.setState(
      {
        step: this.instance.state.step + 1,
      },
      () => {
        if (this.instance.state.step > 6) {
          ModalsQueue.hideModal({
            modalId: modalIds.walkThrough,
            hideModalFunction: () => this.props.profileVisitedBefore(true),
          });
          AsyncStorage.setItemInStorage('PROFILEVISITED', '1');
        }
      },
    );
  };

  setMarginTopForWalkthrough = (step) => {
    const {
      switchPosition: {top: switchTop, height: switchHeight},
      uploadImagePosition: {top: uploadTop, height: uploadHeigth},
      bottom: {top: bottomTop, height: bottomHeight},
      scanMePosition: {top: scanTop, height: scanHeight},
    } = this.instance.state;
    switch (step) {
      case 1:
        return switchTop + switchHeight + 24;
      case 2:
        return uploadTop + uploadHeigth + 8;
      case 3:
        return bottomTop + bottomHeight - 152;
      case 4:
        return bottomTop - (bottomHeight + 112);
      case 5:
        return scanTop + scanHeight + 16;
      case 6:
        return scanTop + 16;
    }
  };

  setMarginLeftForWalkthrough = (step) => {
    const {
      switchPosition: {x: switchX},
      uploadImagePosition: {width, x: uploadX},
      bottom: {x: bottomX},
      scanMePosition: {x: scanX},
    } = this.instance.state;
    switch (step) {
      case 1:
        return switchX;
      case 2:
        return uploadX + width / 2;
      case 3:
        return bottomX;
      case 4:
        return bottomX;
      case 5:
        return scanX;
      case 6:
        return scanX;
    }
  };

  setBottomMeasurements = () => {
    this.instance.bottom.measure((x, y, width, height, pageX, pageY) => {
      this.instance.setState({
        bottom: {
          height: height,
          top: pageY,
          x: pageX,
          width: width,
          y: pageY,
        },
      });
    });
  };

  setBottomPosition = () => {
    if (this.instance.bottom) {
      this.setBottomMeasurements();
    }
  };
}

export const WalkthroughMethodsObj = new WalkthroughMethods();
