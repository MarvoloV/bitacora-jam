const getCurrentLocalStorage = (item) => {
  try {
    const localItem = JSON.parse(localStorage.getItem(`${item}`)) ?? '';
    return localItem;
  } catch {
    return null;
  }
};

export default getCurrentLocalStorage;
