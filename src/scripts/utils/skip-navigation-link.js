const SkipNavigationLink = {
  setup({ skipLink, mainContent }) {
    this._skipLink = skipLink;
    this._mainContent = mainContent;

    this._setupListener();
  },

  _setupListener() {
    this._skipLink.addEventListener('click', (event) => this._skipToMain(event));
  },

  _skipToMain(event) {
    event.preventDefault();
    this._mainContent.focus();
  },
};

export default SkipNavigationLink;
