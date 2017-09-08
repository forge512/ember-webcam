/* jshint node: true */
'use strict';

const defaultOptions = {
  enableFlashFallback: true,
  flashFallbackDir: 'assets'
};

const map = require('broccoli-stew').map;
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
// https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
const findHostShim = function () {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
};

module.exports = {
  name: 'ember-webcam',

  options: {
    nodeAssets: {
      webcamjs() {
        const config = {
          vendor: ['webcam.js']
        };

        if (this.addonOptions.enableFlashFallback) {
          config.public = {
            destDir: this.addonOptions.flashFallbackDir,
            include: ['webcam.swf']
          };
        }

        return config;
      }
    }
  },

  treeForVendor(defaultTree) {
    var browserVendorLib = new Funnel('node_modules/webcamjs/');

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    return new mergeTrees([defaultTree, browserVendorLib]);
  },

  included() {
    const findHost = this._findHost || findHostShim;
    const app = findHost.call(this);

    const userOptions = app.options && app.options[this.name] || {};
    this.addonOptions = Object.assign({}, defaultOptions, userOptions);

    this._super.included.apply(this, arguments);

    app.import('vendor/webcam.js', {
      using: [{
        transformation: 'amd',
        as: 'webcamjs'
      }]
    });
  },

  config() {
    return { 'ember-webcam': this.addonOptions };
  }
};
