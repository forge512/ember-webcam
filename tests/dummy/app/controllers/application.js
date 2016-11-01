import Controller from 'ember-controller';

export default Controller.extend({
  dataUri: null,
  didSnap(dataUri) {
    this.set('dataUri', dataUri);
  },
  actions: {
    takeSnapshot(snap) {
      snap();
    }
  }
});
