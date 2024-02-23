const storeInSession = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

const lookInSession = (key: string) => {
  return localStorage.getItem(key);
};

const removeFromSession = (key: string) => {
  return localStorage.removeItem(key);
};

export {storeInSession, lookInSession, removeFromSession};
