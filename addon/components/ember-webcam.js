import Component from 'ember-component';
import computed from 'ember-computed';
import Webcam from 'npm:webcamjs';
import layout from '../templates/components/ember-webcam';

export default Component.extend({
  layout,
  classNames: ['ember-webcam'],
  cameraId: computed(() => 'cam-' + Math.random().toString(36).substr(2, 10)),
  didRender() {
    this._super(...arguments);
    Webcam.setSWFLocation('/assets/webcam.swf');
    Webcam.on('error', error => {
      if (!this.isDestroying && !this.isDestroyed) {
        this.get('didError')(error);
      }
    });
    Webcam.attach('#' + this.get('cameraId'));
  },
  willDestroy() {
    Webcam.reset();
    Webcam.off('error');
    this._super(...arguments);
  },
  didSnap() {},
  didError() {},
  camera: {
    snap() {
      Webcam.snap(dataUri => {
        if (!this.isDestroying && !this.isDestroyed) {
          this.get('didSnap')(dataUri);
        }
      });
    }
  }
});
