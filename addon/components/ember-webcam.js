import config from 'ember-get-config';
import Component from 'ember-component';
import computed from 'ember-computed';
import Webcam from 'webcamjs';
import layout from '../templates/components/ember-webcam';

const _enableFlashFallback = config['ember-webcam'] && config['ember-webcam'].enableFlashFallback || false;
const _flashFallbackDir = config['ember-webcam'] && config['ember-webcam'].flashFallbackDir;

export default Component.extend({
  layout,
  classNames: ['ember-webcam'],
  cameraId: computed(() => 'cam-' + Math.random().toString(36).substr(2, 10)),
  swfLocation: `/${_flashFallbackDir}/webcam.swf`,
  init() {
    this._super(...arguments);
    this.set('camera', {
      snap: this.snap.bind(this)
    });
  },
  didInsertElement() {
    this._super(...arguments);
    Webcam.set('enable_flash', _enableFlashFallback);
    Webcam.set('swfURL', this.get('swfLocation'));
    Webcam.on('error', error => {
      if (!this.isDestroying && !this.isDestroyed) {
        this.get('didError')(error);
      }
    });
    Webcam.attach('#' + this.get('cameraId'));
  },
  willDestroyElement() {
    this._super(...arguments);
    Webcam.reset();
    Webcam.off('error');
  },
  snap() {
    Webcam.snap(dataUri => {
      if (!this.isDestroying && !this.isDestroyed) {
        this.get('didSnap')(dataUri);
      }
    });
  },
  didSnap() {},
  didError() {}
});
