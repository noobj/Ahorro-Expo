import {
  Cookie,
  CookieManagerStatic,
  Cookies,
} from '@react-native-cookies/cookies';
import { Platform } from 'react-native';

const webCookieManager = {
  clearAll: async (useWebKit?: boolean) => {
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    return true;
  },
  set: async (url: string, cookie: Cookie, useWebKit?: boolean) => false,
  setFromResponse: async (url: string, cookie: string) => false,

  get: async (url: string, useWebKit?: boolean) =>
    [{ name: 'fake', value: 'fake' } as Cookie] as unknown as Cookies,
  getFromResponse: async (url: string) =>
    [{ name: 'fake', value: 'fake' } as Cookie] as unknown as Cookies,
  flush: async () => {},
  removeSessionCookies: async () => false,
  // iOS only
  getAll: async (useWebKit?: boolean) =>
    [{ name: 'fake', value: 'fake' } as Cookie] as unknown as Cookies,
  clearByName: async (url: string, name: string, useWebKit?: boolean) => false,
};

let cookieManager: CookieManagerStatic;
if (Platform.OS !== 'web') {
  cookieManager = require('@react-native-cookies/cookies');
} else {
  cookieManager = webCookieManager;
}

export default cookieManager;
