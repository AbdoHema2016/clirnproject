import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';

class Cell extends PureComponent {
  render() {
    const {
      tittle,
      codeSelected,
      countryId,
      showModal,
      countryName,
    } = this.props;
    return (
      <View style={style.cellContainer}>
        <TouchableOpacity
          style={style.cell}
          onPress={() => {
            codeSelected('+' + tittle, countryId);
            showModal();
          }}>
          <Text style={style.countryNameLabel}>{countryName}</Text>
          <Text style={style.cellLabel}>+{tittle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Cell;
