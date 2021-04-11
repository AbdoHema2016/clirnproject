import React, {PureComponent} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import Cell from './cell';

class CCountryPicker extends PureComponent {
  renderContry = ({item}) => (
    <Cell
      codeSelected={this.props.codeSelected}
      showModal={this.props.showModal}
      tittle={item.phone_code}
      countryName={item.name}
      countryId={item.id}
    />
  );

  keyExtractor = (item) => String(item.id);

  render() {
    const {data, modalVisible, showModal} = this.props;

    return (
      <SafeAreaView>
        <View style={[style.countryPickerContainer]}>
          <Modal
            style={style.modal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={style.flatlistContainer}>
              <TouchableOpacity style={style.closeButton} onPress={showModal} />
              <FlatList
                style={style.list}
                data={data}
                renderItem={this.renderContry}
                keyExtractor={this.keyExtractor}
              />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

export default CCountryPicker;
