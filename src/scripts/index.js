import 'regenerator-runtime'; /* for async await transpile */

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../styles/main.css';

import './views/components/nav-bar';
import './views/components/error-element';

import App from './views/app';
import registerSw from './utils/register-sw';
import LoadingOverlay from './utils/loading-overlay';
import SkipNavigationLink from './utils/skip-navigation-link';

window.addEventListener('load', () => {
  const mainContent = document.querySelector('#main-content');

  LoadingOverlay.init({ mainContent });

  App.init({ mainContent });
  App.renderPage();

  SkipNavigationLink.setup({
    skipLink: document.querySelector('.skip-header-link'),
    mainContent,
  });

  registerSw();
});

window.addEventListener('hashchange', () => {
  App.renderPage();
});
