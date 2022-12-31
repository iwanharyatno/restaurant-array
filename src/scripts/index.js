import 'regenerator-runtime'; /* for async await transpile */

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../styles/main.css';

import './views/components/nav-bar';
import './views/components/error-element';

import App from './views/app';
import displayTemplateElements from './utils/display-template-elements';
import registerSw from './utils/register-sw';
import SkipNavigationLink from './utils/skip-navigation-link';

window.addEventListener('load', () => {
  const mainContent = document.querySelector('#main-content');
  const skipLink = document.querySelector('.skip-header-link');

  // display all previously hidden element after all styles loaded
  displayTemplateElements([
    skipLink,
    document.querySelector('footer'),
  ]);

  App.init({ mainContent });
  App.renderPage();

  SkipNavigationLink.setup({ skipLink, mainContent });

  registerSw();
});

window.addEventListener('hashchange', () => {
  App.renderPage();
});
