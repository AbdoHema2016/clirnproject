import React from 'react';
import {View} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CLabel from '../../../../components/cLabel';
import CNavigationBackButton from '../../../../components/cNavigationBackButton';
import {translate} from '../../../../Localization';

class HealthTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValidation: false,
    };
  }

  componentDidMount() {
    this.navigationOptions();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={'Back'}
          tintColor={Style.tintColor}
          buttonBackgroundColor={Style.tintColor}
          backButtonAction={this.goBack}
        />
      ),
    });
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={Style.container}>
        <CLabel
          style={Style.title}
          text={translate('healthTest.healthTestResults')}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthTests);
