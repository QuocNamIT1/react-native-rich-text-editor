import React from 'react';
import {WebView} from 'react-native-webview';
import {transformStyleSheetToCSS} from './transformStyleSheetToCSS';

const RichEditor = props => {
  const editorContainerCss = transformStyleSheetToCSS(
    props.editorContainerStyle,
  );

  const html = `<!DOCTYPE html>
  <html>
     <head>
        <meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
        
        <title>Page Title</title>
        <style>
            #editor ${editorContainerCss}
        </style>
     </head>
     <body>
        <div id="editor">
        </div>
        <script>
           var quill = new Quill('#editor');
           let format = {}
          quill.on('editor-change', function(delta, oldDelta, source) 
            {
              format = quill.getFormat();
              window.ReactNativeWebView.postMessage(JSON.stringify({type:'editor-change',value:{html:quill.root.innerHTML,format}}));
            });
          window.addEventListener('message', message => {
            const data = JSON.parse(message?.data)

           switch(data?.type){
             case 'format':  
              quill.format(data?.value,!format[data?.value]);
              break
             case 'removeFormat': {
              data?.value?.forEach(a => {
                quill.format(a,false)
              })
               break;
             }
             case 'list': {
              quill.format('list',format['list'] && format['list'] === data?.value ? '' : data?.value)
              break;
             }
             case 'undo': {
              quill.history.undo()
              break;
             }
             case 'redo': {
              quill.history.redo()
              break;
             }
             case 'indent': {
              quill.format('indent',(format['indent']|| 0) +1)
              break;
             }
             case 'outdent': {
              quill.format('indent','-1')
              break;
             }
           }
           format = quill.getFormat();   
           window.ReactNativeWebView.postMessage(JSON.stringify({type:'editor-change',value:{html:quill.root.innerHTML,format}}));
          })
        </script>
     </body>
  </html>`;

  return (
    <WebView
      ref={props.editorRef}
      source={{
        html,
      }}
      style={{backgroundColor: 'red'}}
      startInLoadingState={true}
      onNavigationStateChange={props.onNavigationStateChange}
      onMessage={event => {
        const tempData = JSON.parse(event?.nativeEvent?.data);
        switch (tempData.type) {
          case 'editor-change': {
            props.onHTMLChange?.(tempData.value?.html);
            props.onFormatChange?.(tempData.value?.format);
          }
        }
      }}
    />
  );
};

export default React.memo(RichEditor);
