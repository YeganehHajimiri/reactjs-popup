import React from 'react';
import theme from 'prism-react-renderer/themes/oceanicNext';
import Highlight, {defaultProps} from 'prism-react-renderer';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';

import Popup from '../../../../lib/reactjs-popup.es';
import Warper from '../../examples/Warper';

const Code = ({children, codeString, className = 'language-js', ...props}) => {
  const language = className.replace(/language-/, '');
  if (props.live) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{React, Popup, Warper}}
        theme={theme}
        noInline>
        <div className="example-warper">
          <LivePreview />
        </div>
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
