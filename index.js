/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-webcam',
  init() {
    this._super.init && this._super.init.apply(this, arguments);
    let assetsPath = require('path').join('webcamjs', 'webcam.js');
    this.treePaths['vendor'] =
      require.resolve('webcamjs').replace(assetsPath, '');
  },
  included() {
    this.app.import('vendor/webcamjs/webcam.swf', {
      destDir: 'assets'
    });
  }
};
