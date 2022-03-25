const sassTrue = require('sass-true');
const path = require('path');

const file = path.join(__dirname, 'sass.test.scss');

sassTrue.runSass({ file }, { describe, it });
