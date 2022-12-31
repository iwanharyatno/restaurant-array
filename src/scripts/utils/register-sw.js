import { Workbox } from 'workbox-window';

const registerSw = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('This browser does not support serviceWorker');
    return;
  }

  const sw = new Workbox('./service-worker.js');

  try {
    await sw.register();
    console.log('Service worker registered');
  } catch (error) {
    console.log('Cannot register service worker:', error);
  }
};

export default registerSw;
