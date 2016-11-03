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
      didError(error) {
        // Should fail because camera is not available in test environment.
        expect(error.name).to.equal('WebcamError');
        if (!isDone) {
          done();
          isDone = true;
        }
      }
    });
    page.render(hbs`
      {{#ember-webcam didError=(action didError) as |camera|}}
        <button {{action camera.snap}}>
          Take Snapshot!
        </button>
      {{/ember-webcam}}
    `);
    page.button.click();
  });
});
