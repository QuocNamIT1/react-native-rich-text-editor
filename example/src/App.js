import React, {useState} from 'react';
import {View} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-rich-text-editor';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';

const ListNewsView = props => {
  const {injectedJS} = props;
  const editorRef = React.useRef();
  const [format, setFormat] = useState({});
  return (
    <View style={{flex: 1, marginTop: 200, backgroundColor: 'red'}}>
      {/* <RichEditor
        onHTMLChange={html => {
          console.log('onHTMLChange', html);
        }}
        onFormatChange={f => {
          console.log('onFormatChange', f);
          setFormat(f);
        }}
        editorRef={editorRef}
        editorContainerStyle={{height: 200, backgroundColor: 'yellow'}}
      /> */}

      <KeyboardAccessoryView>
        <RichToolbar format={format} editorRef={editorRef} />
      </KeyboardAccessoryView>
    </View>
  );
};

export default React.memo(ListNewsView);
