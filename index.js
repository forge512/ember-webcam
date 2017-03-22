/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-webcam',
  options: {
    nodeAssets: {
      webcamjs: {
        vendor: ['webcam.js'],
        public: {
          distDir: 'assets',
          include: ['webcam.swf']
        }
      }
    }
  },
  included(parent) {
    this._super.included.apply(this, arguments);
    this.import('vendor/webcamjs/webcam.js', {
      using: [{
        transformation: 'amd',
        as: 'webcamjs'
      }]
    });
  }
};
