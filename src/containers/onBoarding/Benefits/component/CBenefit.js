import {View} from 'react-native';
import React, {Component} from 'react';
import CLabel from '../../../../components/cLabel/index';
import CImage from '../../../../components/cImage/index';
import Style from './style';

export default class CBenefit extends Component {
  render() {
    const {title, subTitle, imagePath} = this.props;
    return (
      <View style={Style.container}>
        <CLabel style={Style.mainTitle} text={title} />
        <CLabel style={Style.subTitle} text={subTitle} />
        <CImage type={'local'} imagePath={imagePath} imageStyle={Style.image} />
      </View>
    );
  }
}
