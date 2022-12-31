import Events from '../config/events';

const fetchWithEvent = async (url, options = {}) => {
  try {
    window.dispatchEvent(new Event(Events.FETCH_START));

    const response = await fetch(url, options);
    const result = await response.json();

    if (response.status !== 200) {
      window.dispatchEvent(new CustomEvent(Events.FETCH_ERROR, {
        detail: {
          status: response.status,
          message: result.message,
        },
      }));
      return {};
    }

    window.dispatchEvent(new Event(Events.FETCH_SUCCESS));

    return result;
  } catch (error) {
    window.dispatchEvent(new CustomEvent(Events.FETCH_FAILED, {
      detail: {
        failedCallback: options.failedCallback,
      },
    }));
    return {};
  }
};

export default fetchWithEvent;
