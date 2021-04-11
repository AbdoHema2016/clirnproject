import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import Style from '../style';
import CText from '../../../../components/cTextField';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CPicker from '../../../../components/cPicker';
import {LOCAL_PATH, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';

import CTitleAndInputField from '../../../../components/cTitleAndInputField';

const CTestDetails = (props) => {
  const [isTextInputForTestMethod, setIsTextInputForTestMethod] = useState(
    false,
  );
  const [testMethod, setChosenTestMethod] = useState(
    props.item.testData.howWasThistestPerformed.value,
  );
  const [testMethodPickerVisible, setTestMethodPickerVisible] = useState(false);
  const {
    setTestData,
    index,
    item: {testData},
  } = props;
  const initialTestMethods = [...translate('testMethods')];
  if (!initialTestMethods.includes(testData.howWasThistestPerformed.value)) {
    initialTestMethods.push(testData.howWasThistestPerformed.value);
  }
  const showTestMethodPicker = () => setTestMethodPickerVisible(true);
  const hideTestMethodPicker = () => setTestMethodPickerVisible(false);

  const [testMesthods, setTestMethods] = useState(initialTestMethods);
  const onTestMethodInputChange = (method) => {
    setTestData(index, 'how', method);
  };
  const onTestMethodChange = (method) => {
    setTestMethods(translate('testMethods'));
    setChosenTestMethod(method);
    if (method === translate('STRINGS.OTHER_TEST_METHOD')) {
      setTestData(index, 'how', '');
      return setIsTextInputForTestMethod(true);
    }
    if (isTextInputForTestMethod) {
      setIsTextInputForTestMethod(false);
    }
    setTestData(index, 'how', method);
  };
  let resultOptions = [];

  const selectedResultValue = props.results.find(
    (result) =>
      result.type.toLowerCase() ===
      props.item.testData.testType.value.toLowerCase(),
  );

  if (selectedResultValue) {
    resultOptions = selectedResultValue.options;
  }

  const uploadHealthTestImage = () => props.uploadImage(props.index, 'photo');

  const deleteHealthTestCell = () => props.deleteCell(props.index);

  const selectHealthTestDate = () => props.showDatePicker(props.index, 'date');

  const showResultPicker = () => props.showPicker(props.index, 'result');

  const showTypePicker = () => props.showPicker(props.index, 'type');

  return (
    <View
      style={[
        Style.inputContainer,
        (!props.item.testData.missingFields && props.dataSize > 1) ||
        props.source === 'Profile'
          ? props.borderStyle
          : null,
      ]}>
      {(!props.item.testData.missingFields && props.dataSize > 1) ||
      props.source === 'Profile' ? (
        <CButtonWithImage
          testID={testIds.deleteTest + props.index}
          accessibilityLabel={testIds.deleteTest + props.index}
          buttonContainerStyle={Style.crossButtonContainer}
          buttonCustomStyle={Style.crsossButton}
          textStyle={Style.textStyle}
          customeImageStyle={Style.customeImageStyle}
          imagePath={LOCAL_PATH.CROSS_ICON}
          onPress={deleteHealthTestCell}
        />
      ) : null}
      <CTitleAndInputField
        testID={testIds.centre}
        accessibilityLabel={testIds.centre}
        type={'TF'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? [
                Style.inputLabelOnDataFilled,
                Style.testCentreLableTopOnDataFilled,
              ]
            : Style.inputLabel
        }
        title={'Test centre*'}
        customSuperContainer={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        state={props.item.testData.testCentre.state}
        placeHolderText={'Enter the name'}
        value={props.item.testData.testCentre.value}
        error={
          props.item.testData.testCentre.empty &&
          props.item.testData.checkMissingFieldsAtTheEnd
        }
        onChangeText={(val) => props.setTestData(props.index, 'centre', val)}
        errorMessage={'Please enter test centre'}
      />
      <CTitleAndInputField
        testID={testIds.type}
        accessibilityLabel={testIds.type}
        type={Platform.OS === 'ios' ? 'Button' : 'Picker'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.inputLabelOnDataFilled
            : Style.inputLabel
        }
        title={'Test type*'}
        buttonContainerStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        buttonCustomStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        imagePath={LOCAL_PATH.DROP_DOWN_ICON}
        onPress={showTypePicker}
        state={props.item.testData.testType.state}
        error={
          props.item.testData.testType.empty &&
          props.item.testData.checkMissingFieldsAtTheEnd
        }
        textStyle={
          props.item.testData.testType.value === ''
            ? Style.titleNillColor
            : Style.titleSelectedColor
        }
        text={
          props.item.testData.testType.value === ''
            ? 'Choose type'
            : props.item.testData.testType.value
        }
        androidPickerContainer={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        selectedValue={props.item.testData.testType.value}
        setTitle={(title) => props.setTestData(props.index, 'type', title)}
        showDatePicker={showTypePicker}
        pickerItems={props.typeArray}
      />
      <CTitleAndInputField
        testID={testIds.testDate}
        accessibilityLabel={testIds.testDate}
        type={'Button'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.inputLabelOnDataFilled
            : Style.inputLabel
        }
        title={'Test date*'}
        buttonContainerStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        buttonCustomStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        state={props.item.testData.testDate.state}
        imagePath={LOCAL_PATH.DROP_DOWN_ICON}
        onPress={selectHealthTestDate}
        error={
          props.item.testData.testDate.empty &&
          props.item.testData.checkMissingFieldsAtTheEnd
        }
        textStyle={
          props.item.testData.testDate.value === ''
            ? Style.titleNillColor
            : Style.titleSelectedColor
        }
        text={
          props.item.testData.testDate.value === ''
            ? 'XX/XX/XX'
            : props.item.testData.testDate.value
        }
      />
      <CTitleAndInputField
        testID={testIds.testResult}
        accessibilityLabel={testIds.testResult}
        type={Platform.OS === 'ios' ? 'Button' : 'Picker'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.inputLabelOnDataFilled
            : Style.inputLabel
        }
        title={'Test results*'}
        buttonContainerStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        buttonCustomStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        state={props.item.testData.testResult.state}
        imagePath={LOCAL_PATH.DROP_DOWN_ICON}
        onPress={showResultPicker}
        error={
          props.item.testData.testResult.empty &&
          props.item.testData.checkMissingFieldsAtTheEnd
        }
        textStyle={
          props.item.testData.testResult.value === ''
            ? Style.titleNillColor
            : Style.titleSelectedColor
        }
        text={
          props.item.testData.testResult.value === ''
            ? 'Choose the answer'
            : props.item.testData.testResult.value
        }
        androidPickerContainer={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        selectedValue={props.item.testData.testResult.value}
        setTitle={(title) => props.setTestData(props.index, 'result', title)}
        showDatePicker={showResultPicker}
        pickerItems={resultOptions}
      />
      <CTitleAndInputField
        testID={testIds.how}
        accessibilityLabel={testIds.how}
        type={Platform.OS === 'ios' ? 'Button' : 'Picker'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.inputLabelOnDataFilled
            : Style.inputLabel
        }
        title={'How was this test performed*'}
        buttonContainerStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        buttonCustomStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
        imagePath={LOCAL_PATH.DROP_DOWN_ICON}
        state={props.item.testData.howWasThistestPerformed.state}
        onPress={showTestMethodPicker}
        error={
          props.item.testData.howWasThistestPerformed.empty &&
          props.item.testData.checkMissingFieldsAtTheEnd
        }
        textStyle={
          !testMethod ? Style.titleNillColor : Style.titleSelectedColor
        }
        text={!testMethod ? 'Choose the answer' : testMethod}
        setTitle={onTestMethodChange}
        selectedValue={testMethod}
        showDatePicker={hideTestMethodPicker}
        pickerItems={testMesthods}
        modalVisible={testMethodPickerVisible}
        androidPickerContainer={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.buttonContainerStyleOnDataFilled
            : null
        }
      />
      {isTextInputForTestMethod ? (
        <CText
          customSuperContainer={
            (!props.item.testData.missingFields && props.dataSize > 1) ||
            props.source === 'Profile'
              ? Style.buttonContainerStyleOnDataFilled
              : null
          }
          state={props.item.testData.howWasThistestPerformed.state}
          placeHolderText={'Someone swabbed my nose'}
          error={
            props.item.testData.howWasThistestPerformed.empty &&
            props.item.testData.checkMissingFieldsAtTheEnd
          }
          onChangeText={onTestMethodInputChange}
          errorMessage={'Please enter your test description'}
        />
      ) : null}
      {Platform.OS === 'ios' && (
        <CPicker
          setTitle={onTestMethodChange}
          selectedValue={testMethod}
          showDatePicker={hideTestMethodPicker}
          pickerItems={translate('testMethods')}
          modalVisible={testMethodPickerVisible}
        />
      )}
      <CTitleAndInputField
        testID={testIds.imagePicker}
        accessibilityLabel={testIds.imagePicker}
        type={'Button'}
        titleStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.inputLabelOnDataFilled
            : Style.inputLabel
        }
        title={'Document(Proof of test)*'}
        imagePath={LOCAL_PATH.UPLOAD_ICON}
        onPress={uploadHealthTestImage}
        error={
          props.item.testData.document?.name === '' &&
          props.item.testData.checkMissingFieldsAtTheEnd
            ? true
            : false
        }
        textStyle={Style.uploadButtonTitle}
        text={
          !props.item.testData.document?.name
            ? 'Upload photo'
            : props.item.testData.document?.name
        }
        buttonContainerStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.uploadButtonContainerWidthOnDataFilled
            : Style.uploadButtonContainer
        }
        customeImageStyle={Style.uploadButtonIcon}
        buttonCustomStyle={
          (!props.item.testData.missingFields && props.dataSize > 1) ||
          props.source === 'Profile'
            ? Style.uploadButtonOnDataFilled
            : Style.uploadButton
        }
        loading={props.loading}
      />
    </View>
  );
};

export default CTestDetails;
