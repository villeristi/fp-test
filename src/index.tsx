import React from 'react';
import ReactDOM from 'react-dom';

const statusFile = require('./static/status.real');
import { ComponentProps } from './util/types';

import './index.css';
import Root from './Root/Root';
import { createPackagesCollection } from './util/helpers';

const renderApp = (props: ComponentProps): void => {
  ReactDOM.render(<Root {...props} />, document.getElementById('root'));
}

fetch(statusFile)
  .then((res) => res.text())
  .then((text: string) => {
    const packages = createPackagesCollection(text);
    return renderApp({ packages });
  });
