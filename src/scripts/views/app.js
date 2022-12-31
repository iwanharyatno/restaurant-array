import UrlParser from '../routes/url-parser';

import routes from '../routes/routes';

const App = {
  init({ mainContent }) {
    this._mainContent = mainContent;
  },

  renderPage() {
    const urlCombiner = UrlParser.parseActiveUrlWithCombiner();
    const targetPage = routes[urlCombiner];

    if (!targetPage) {
      this._mainContent.innerHTML = '<error-element status="404" message="Page Not Found"></error-element>';
      document.title = 'Error 404 - Page Not Found';
    }

    this._mainContent.innerHTML = targetPage.render();
    targetPage.postRender();
  },
};

export default App;
