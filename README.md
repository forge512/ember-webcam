# Ember Webcam
[![Build Status](https://travis-ci.org/leizhao4/ember-webcam.svg?branch=master)](https://travis-ci.org/leizhao4/ember-webcam)
[![Code Climate](https://codeclimate.com/github/leizhao4/ember-webcam/badges/gpa.svg)](https://codeclimate.com/github/leizhao4/ember-webcam)
[![Test Coverage](https://codeclimate.com/github/leizhao4/ember-webcam/badges/coverage.svg)](https://codeclimate.com/github/leizhao4/ember-webcam/coverage)
[![Ember Observer Score](https://emberobserver.com/badges/ember-webcam.svg)](https://emberobserver.com/addons/ember-webcam)

This Ember CLI addon is a simple wrapper for [WebcamJS](https://pixlcore.com/read/WebcamJS).

## Installation

```
ember install ember-webcam
```

## Usage

This addon provides an `ember-webcam` component which renders a live camera viewer. It also yields a camera controller (`camera`) to the block. This controller can be used to trigger certain camera actions, such as taking a still snapshot (`camera.snap`).

The component also takes two optional closure actions:

- `didSnap` will be fired after a snapshot is taken, with the data URI of the snapshot. This URI can be passed around like any URL, or be submitted to your server.
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

## License

This addon is [MIT Licensed](https://github.com/leizhao4/ember-webcam/blob/master/LICENSE.md).
