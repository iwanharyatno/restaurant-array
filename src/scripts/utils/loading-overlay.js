import Events from '../config/events';
import LoadingIndicator from '../views/components/loading-indicator';

const LoadingOverlay = {
  init({ mainContent }) {
    this._mainContent = mainContent;
    this._loadingIndicator = new LoadingIndicator();
    this._loadingIndicator.fullwidth = true;

    this._setupListener();
  },

  _setupListener() {
    window.addEventListener(Events.FETCH_START, () => this._showLoading());
    window.addEventListener(Events.FETCH_SUCCESS, () => this._hideLoading());
    window.addEventListener(Events.FETCH_ERROR, (event) => this._errorLoading(event));
    window.addEventListener(Events.FETCH_FAILED, (event) => this._failedLoading(event));
  },

  _showLoading() {
    this._mainContent.appendChild(this._loadingIndicator);
  },

  _hideLoading() {
    this._loadingIndicator.remove();
  },

  async _errorLoading(event) {
    this._mainContent.innerHTML = `<error-element status="${event.detail.status}" message="${event.detail.message}"></error-element>`;
    document.title = `Error ${event.detail.status} - ${event.detail.message}`;
  },

  _failedLoading(event) {
    this._countDown(5, event.detail.failedCallback);
  },

  _countDown(seconds, callback) {
    this._countDownSeconds = seconds;

    const countDown = () => {
      this._hideLoading();

      if (this._countDownSeconds === 0) {
        callback();
        this._showLoading();
        return;
      }

      this._countDownSeconds -= 1;
      setTimeout(countDown, 1000);
    };

    countDown();
  },
};

export default LoadingOverlay;
