'use strict';

require('babel-polyfill');
require('core-js/fn/object/assign');
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(Test\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext);
