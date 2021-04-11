import React from 'react';
import {View} from 'react-native';
import Style from './Style';
import * as Progress from 'react-native-progress';

const CProgress = (props) => {
  const {style, animated, indeterminate, progress} = props;
  return (
    <View style={[style, Style.loadingProgressContainer]}>
      <Progress.Bar
        animated={animated}
        color={Style.progressBar.color}
        progress={progress}
        indeterminate={indeterminate}
        width={Style.progressBar.width}
      />
    </View>
  );
};
export default CProgress;
