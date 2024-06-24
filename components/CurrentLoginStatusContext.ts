import { createContext } from 'react';

export const CurrentLoginStatusContext = createContext({
  currentLoginStatus: false,
  setCurrentLoginStatus: (loginStatus: any) => {},
});
