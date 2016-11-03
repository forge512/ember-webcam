module.exports = {
  normalizeEntityName() {},
  afterInstall() {
    return this.addAddonToProject('ember-browserify');
  }
};
