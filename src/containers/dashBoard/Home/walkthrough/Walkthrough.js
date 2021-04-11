import React, {PureComponent} from 'react';
import {View, Modal} from 'react-native';
import {Style} from './style';
import TutOne from './TutorialOne';
import TutTwo from './TutorialTwo';
import TutThree from './TutorialThree';
import TutFour from './TutorialFour';
import TutSix from './TutorialSix';
import MeSignShare from './MeSign';
import {WalkthroughMethodsObj} from '../Methods';
import {Constants} from '../../../../utilities';

const {testIds} = Constants;
class CWalkthrough extends PureComponent {
  render() {
    const {marginTop, step, left, testID, accessibilityLabel} = this.props;
    const {skipPressed, nextStepPressed} = WalkthroughMethodsObj;
    return (
      <View style={[Style.countryPickerContainer]}>
        <Modal
          style={Style.modal}
          animationType="fade"
          transparent={true}
          visible={step <= 6}>
          <View style={[Style.modalContainer]}>
            {step === 1 ? (
              <TutOne
                testID={testID}
                accessibilityLabel={accessibilityLabel}
                skipTutID={testIds.skipTutID}
                onPress={nextStepPressed}
                marginTop={marginTop}
                step={step}
                skipPress={skipPressed}
                left={left}
              />
            ) : step === 2 ? (
              <TutTwo
                onPress={nextStepPressed}
                marginTop={marginTop}
                step={step}
                skipPress={skipPressed}
                left={left}
              />
            ) : step === 3 ? (
              <TutThree
                onPress={nextStepPressed}
                marginTop={marginTop}
                step={step}
                skipPress={skipPressed}
                left={left}
              />
            ) : step === 4 ? (
              <TutFour
                onPress={nextStepPressed}
                marginTop={marginTop}
                step={step}
                skipPress={skipPressed}
                left={left}
              />
            ) : step === 5 ? (
              <MeSignShare onPress={nextStepPressed} skipPress={skipPressed} />
            ) : (
              <TutSix
                onPress={nextStepPressed}
                marginTop={marginTop}
                step={step}
                skipPress={skipPressed}
                left={left}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

export default CWalkthrough;
