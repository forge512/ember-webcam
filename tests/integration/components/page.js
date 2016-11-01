import { create } from 'ember-cli-page-object';

export default create({
  viewer: {
    scope: '.ember-webcam-viewer'
  },
  button: {
    scope: 'button'
  }
});
