[![Code Climate](https://codeclimate.com/github/leizhao4/ember-webcam/badges/gpa.svg)](https://codeclimate.com/github/leizhao4/ember-webcam)
[![Issue Count](https://codeclimate.com/github/leizhao4/ember-webcam/badges/issue_count.svg)](https://codeclimate.com/github/leizhao4/ember-webcam)
[![Test Coverage](https://codeclimate.com/github/leizhao4/ember-webcam/badges/coverage.svg)](https://codeclimate.com/github/leizhao4/ember-webcam/coverage)

# ember-webcam

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
    takeSnapshot(snap) {
      snap();
    },
    didSnap(dataUri) {
      this.set('dataUri', dataUri);
    },
    didError(error) {
      console.error(error);
    }
  }
});
```

```hbs
{{#ember-webcam didSnap=(action 'didSnap') didError=(action 'didError') as |snap|}}
  <button {{action 'takeSnapshot' snap}}>
    Take a snapshot!
  </button>
{{/ember-webcam}}

<img src={{dataUri}}>
```

## License

This addon is [MIT Licensed](https://github.com/leizhao4/ember-webcam/blob/master/LICENSE.md).
