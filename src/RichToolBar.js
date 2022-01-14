import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {actions, defaultActions} from './constant';

const RichToolBar = props => {
  const editorRef = props.editorRef;
  const {style, disabled, children, flatContainerStyle} = props;
  const [data, setData] = useState([]);
  const [selectedAction, setSelectedAction] = useState({});
  const [listActions, setListActions] = useState([]);

  useEffect(() => {
    setListActions(props.actions || Object.keys(actions));
  }, [props.actions]);

  const stringFormat = JSON.stringify(props.format);

  useEffect(() => {
    let format = props.format;
    format = {...format, indent: false, outdent: false};
    if (format.list) {
      format[format.list] = true;
    }
    console.log('format', format);

    setSelectedAction(format);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringFormat]);

  useEffect(() => {
    console.log('selectedAction', selectedAction);
    const tempData = listActions.map(action => ({
      action,
      selected: selectedAction[action] || false,
    }));
    setData(tempData);
  }, [selectedAction, listActions]);

  const onPress = action => {
    console.log('action', action);
    const {onPressAddImage, onInsertLink, insertVideo} = props;
    const editor = editor;

    switch (action) {
      case actions.insertLink: {
        if (onInsertLink) {
          return onInsertLink();
        }
        break;
      }
      case actions.bold:
      case actions.italic:
      case actions.checkboxList:
      case actions.underline:
      case actions.heading1:
      case actions.heading2:
      case actions.heading3:
      case actions.heading4:
      case actions.heading5:
      case actions.heading6:
      case actions.code:
      case actions.blockquote:
      case actions.line:
      case actions.setParagraph:
      case actions.alignLeft:
      case actions.alignCenter:
      case actions.alignRight:
      case actions.alignFull:
      case actions.setSubscript:
      case actions.setSuperscript:
      case actions.setStrikethrough:
      case actions.setHR:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'format',
            value: action,
          }),
        );
        break;
      case actions.removeFormat:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'removeFormat',
            value: Object.keys(selectedAction).filter(a => selectedAction[a]),
          }),
        );
        break;
      case actions.insertBulletsList:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'list',
            value: 'bullet',
          }),
        );
        break;
      case actions.insertOrderedList:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'list',
            value: 'ordered',
          }),
        );
        break;
      case actions.undo:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'undo',
          }),
        );
        break;
      case actions.redo:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'redo',
          }),
        );
        break;
      case actions.indent:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'indent',
          }),
        );
        break;
      case actions.outdent:
        editorRef?.current?.postMessage(
          JSON.stringify({
            type: 'outdent',
          }),
        );
        break;
      case actions.insertImage:
        onPressAddImage && onPressAddImage();
        break;
      case actions.insertVideo:
        insertVideo && insertVideo();
        break;
      case actions.keyboard:
        // handleKeyboard();
        break;
      default:
        props[action] && props[action]();
        break;
    }
  };

  const getButtonSelectedStyle = () => {
    return props.selectedButtonStyle && props.selectedButtonStyle;
  };

  const getButtonUnselectedStyle = () => {
    return props.unselectedButtonStyle && props.unselectedButtonStyle;
  };

  const getButtonDisabledStyle = () => {
    return props.disabledButtonStyle && props.disabledButtonStyle;
  };

  const getDefaultIcon = useCallback(() => {
    const icons = {};
    // new icon styles of experiment
    icons[actions.insertImage] = require('./img/image.png');
    icons[actions.keyboard] = require('./img/keyboard.png');
    icons[actions.bold] = require('./img/bold.png');
    icons[actions.italic] = require('./img/italic.png');
    icons[actions.setSubscript] = require('./img/subscript.png');
    icons[actions.setSuperscript] = require('./img/superscript.png');
    icons[actions.insertBulletsList] = require('./img/ul.png');
    icons[actions.insertOrderedList] = require('./img/ol.png');
    icons[actions.insertLink] = require('./img/link.png');
    icons[actions.setStrikethrough] = require('./img/strikethrough.png');
    icons[actions.underline] = require('./img/underline.png');
    icons[actions.insertVideo] = require('./img/video.png');
    icons[actions.removeFormat] = require('./img/remove_format.png');
    icons[actions.undo] = require('./img/undo.png');
    icons[actions.redo] = require('./img/redo.png');
    icons[actions.checkboxList] = require('./img/checkbox.png');
    icons[actions.table] = require('./img/table.png');
    icons[actions.code] = require('./img/code.png');
    icons[actions.outdent] = require('./img/outdent.png');
    icons[actions.indent] = require('./img/indent.png');
    icons[actions.alignLeft] = require('./img/justify_left.png');
    icons[actions.alignCenter] = require('./img/justify_center.png');
    icons[actions.alignRight] = require('./img/justify_right.png');
    icons[actions.alignFull] = require('./img/justify_full.png');
    icons[actions.blockquote] = require('./img/blockquote.png');
    icons[actions.line] = require('./img/line.png');
    icons[actions.fontSize] = require('./img/fontSize.png');
    return icons;
  }, []);

  const getButtonIcon = action => {
    const {iconMap} = props;
    if (iconMap && iconMap[action]) {
      return iconMap[action];
    } else {
      return getDefaultIcon()[action];
    }
  };

  const defaultRenderAction = (action, selected) => {
    const icon = getButtonIcon(action);
    const {iconSize, iconGap, itemStyle} = props;
    const actionStyle = selected
      ? getButtonSelectedStyle()
      : getButtonUnselectedStyle();
    const tintColor = disabled
      ? props.disabledIconTint
      : selected
      ? props.selectedIconTint
      : props.iconTint;
    console.log(
      'defaultRenderAction',
      disabled,
      selected,
      tintColor,
      props.selectedIconTint,
    );
    return (
      <TouchableOpacity
        key={action}
        disabled={disabled}
        style={[
          {width: iconGap + iconSize},
          styles.item,
          itemStyle,
          actionStyle,
        ]}
        onPress={() => onPress(action)}>
        {icon ? (
          typeof icon === 'function' ? (
            icon({selected, disabled, tintColor, iconSize, iconGap})
          ) : (
            <Image
              source={icon}
              style={{
                tintColor,
                height: iconSize,
                width: iconSize,
              }}
            />
          )
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderAction = (action, selected) => {
    return props.renderAction
      ? props.renderAction(action, selected)
      : defaultRenderAction(action, selected);
  };

  const vStyle = [
    styles.barContainer,
    style,
    disabled && getButtonDisabledStyle(),
  ];

  console.log('data', data);
  return (
    <View style={vStyle}>
      <FlatList
        horizontal
        keyboardShouldPersistTaps={'always'}
        keyExtractor={(item, index) => item.action + '-' + index}
        data={data}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => renderAction(item.action, item.selected)}
        contentContainerStyle={flatContainerStyle}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 44,
    backgroundColor: '#efefef',
    alignItems: 'center',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

RichToolBar.defaultProps = {
  actions: defaultActions,
  disabled: false,
  iconTint: '#71787F',
  iconSize: 20,
  iconGap: 16,
  selectedIconTint: 'red',
};

export default React.memo(RichToolBar);
