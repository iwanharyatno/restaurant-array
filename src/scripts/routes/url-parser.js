const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1);
    const splittedUrl = this._splitUrl(url);
    return this._getCombiner(splittedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1);
    return this._splitUrl(url);
  },

  _splitUrl(url) {
    const splittedUrl = url.split('/');

    return {
      resource: splittedUrl[1] || null,
      id: splittedUrl[2] || null,
      verb: splittedUrl[3] || null,
    };
  },

  _getCombiner(splittedUrl) {
    return (splittedUrl.resource ? `/${splittedUrl.resource}` : '/')
      + (splittedUrl.id ? '/:id' : '')
      + (splittedUrl.verb ? `/${splittedUrl.verb}` : '');
  },
};

export default UrlParser;
