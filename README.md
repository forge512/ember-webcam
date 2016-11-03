# Ember Webcam
[![Build Status](https://travis-ci.org/leizhao4/ember-webcam.svg?branch=master)](https://travis-ci.org/leizhao4/ember-webcam)
[![Code Climate](https://codeclimate.com/github/leizhao4/ember-webcam/badges/gpa.svg)](https://codeclimate.com/github/leizhao4/ember-webcam)
[![Test Coverage](https://codeclimate.com/github/leizhao4/ember-webcam/badges/coverage.svg)](https://codeclimate.com/github/leizhao4/ember-webcam/coverage)
[![Ember Observer Score](https://emberobserver.com/badges/ember-webcam.svg)](https://emberobserver.com/addons/ember-webcam)

This Ember CLI addon is a simple wrapper for [WebcamJS](https://pixlcore.com/read/WebcamJS) (v1.0.16). This addon uses Ember CLI v2.9.0.

## Installation

```
ember install ember-webcam
```

## Usage

```js
import Controller from 'ember-controller';

export default Controller.extend({
  dataUri: null,
  actions: {
    didSnap(dataUri) {
      // Returns a data URI when snapshot is taken.
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

## License

This addon is [MIT Licensed](https://github.com/leizhao4/ember-webcam/blob/master/LICENSE.md).
