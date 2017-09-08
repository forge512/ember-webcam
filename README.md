# Ember Webcam
[![Build Status](https://travis-ci.org/forge512/ember-webcam.svg?branch=master)](https://travis-ci.org/forge512/ember-webcam)
[![Ember Observer Score](https://emberobserver.com/badges/ember-webcam.svg)](https://emberobserver.com/addons/ember-webcam)
[![Code Climate](https://codeclimate.com/github/forge512/ember-webcam/badges/gpa.svg)](https://codeclimate.com/github/forge512/ember-webcam)
[![Test Coverage](https://codeclimate.com/github/forge512/ember-webcam/badges/coverage.svg)](https://codeclimate.com/github/forge512/ember-webcam/coverage)

This Ember CLI addon is a simple wrapper for
[WebcamJS](https://pixlcore.com/read/WebcamJS) 1.x.

## Installation

```
ember install ember-webcam
```

## Usage

This Ember addon provides an `ember-webcam` component which renders a live
camera viewer. It also yields a camera controller (`camera`) to the block. This
controller can be used to trigger certain camera actions, such as taking a still
snapshot (`camera.snap`).

The component also takes two optional closure actions:

- `didSnap` will be fired after a snapshot is taken, with the data URI of the
snapshot. This URI can be passed around like any URL, or be submitted to your
server.

- `didError` will be fired when an error occurs.

```js
import Component from 'ember-component';

export default Component.extend({
  dataUri: null,
  actions: {
    didSnap(dataUri) {
      // Delivers a data URI when snapshot is taken.
      this.set('dataUri', dataUri);
    },
    didError(error) {
      // Fires when a WebcamError occurs.
      console.error(error);
    }
  }
});
```

```hbs
{{#ember-webcam
  didSnap=(action 'didSnap')
  didError=(action 'didError')
  as |camera|}}
  <button {{action camera.snap}}>
    Take Snapshot!
  </button>
{{/ember-webcam}}

<img src={{dataUri}}>
```

## Configurations

By default, this addon will import a `webcam.swf` file from WebcamJS and include
it in your build. This file is used as a fallback if your browser does not
support
[HTML5 `getUserMedia`](http://dev.w3.org/2011/webrtc/editor/getusermedia.html).
IE and Safari are two major browsers that do not yet have the support. For more
details, see
[WebcamJS Docs](https://github.com/jhuckaby/webcamjs/blob/master/DOCS.md#browser-support)
and [caniuse.com](http://caniuse.com/#search=getusermedia).

This Flash fallback can be turned off by specifying `enableFlashFallback: false`
inside the `ember-webcam` config property in your `ember-cli-build.js` file (or
your `index.js` if you are working on an addon):

```js
module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-webcam': {
      enableFlashFallback: false
    }
  });

  // ...
};
```

You may otherwise specify where you want `webcam.swf` to be located in your
build, using the `flashFallbackDir` option. The default value is `'assets'`,
meaning the file will be located at `<APP_ROOT>/assets/webcam.swf`.


## Contributors

Kind thanks to Lei Zhao (leizhao4) for initiating this project and of
course the authors of [WebcamJS](https://pixlcore.com/read/WebcamJS).

## License

This addon is [MIT Licensed](https://github.com/forge512/ember-webcam/blob/master/LICENSE.md).
