import { describeComponent, it } from 'ember-mocha';
import { beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';
import page from './page';

describeComponent('ember-webcam', 'Integration: EmberWebcamComponent', {
  integration: true
}, () => {

  beforeEach(function () {
    page.setContext(this);
  });
  afterEach(() => {
    page.removeContext();
  });

  it('renders', () => {
    page.render(hbs`{{ember-webcam}}`);
    expect(page.viewer.isVisible).to.be.true;
  });

  it('takes a snapshot', done => {
    let isDone = false;
    page.context.setProperties({
      takeSnapshot(snap) {
        snap();
      },
      didError(errorMessage) {
        expect(errorMessage).to.be.ok;
        if (!isDone) {
          done();
          isDone = true;
        }
      }
    });
    page.render(hbs`
      {{#ember-webcam didError=(action didError) as |snap|}}
        <button {{action takeSnapshot snap}}>
          Take a snapshot!
        </button>
      {{/ember-webcam}}
    `);
    page.button.click();
  });

});
