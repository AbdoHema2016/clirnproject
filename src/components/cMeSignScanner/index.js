import React, {PureComponent} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Layout, Constants} from '../../utilities';
import {translate} from '../../Localization';

import CButtonWithImage from '../cButtonWithImage';
import Style from './style';
import ErrorView from '../cMeError';
import {HelperFunctions} from '../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES} = Layout;
const {LOCAL_PATH, apiError} = Constants;
const {errorReportLogger} = HelperFunctions;

class CMeSignScanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  onError = (errorDetails, response, networkFailure) => {
    errorReportLogger(errorDetails);
    if (networkFailure || errorDetails?.status > 501) {
      this.setState({
        error: {
          status: apiError.serverIssue,
        },
      });
      return;
    }

    if (errorDetails.status === apiError.forbidden) {
      this.setState({
        error: {
          status: apiError.forbidden,
        },
      });
      return;
    }

    this.setState({
      error: {
        status: apiError.notFound,
      },
    });
  };

  onTryAgain = () => {
    this.setState({error: false});
  };
  render() {
    const {onRead, onPlaceRead, close} = this.props;

    return (
      <View style={Style.scannerContainer}>
        <Modal style={Style.modal} animationType="fade" transparent={true}>
          <View style={Style.modalContainer}>
            
          </View>
        </Modal>
      </View>
    );
  }
}

export default CMeSignScanner;
