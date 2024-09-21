import { useEffect, useState } from "react";

function useLocalStorage(name, def) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? storedValue : def;
  });

  useEffect(() => {
    localStorage.setItem(name, value);
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;