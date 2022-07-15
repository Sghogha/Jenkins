export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromStorage = key => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
