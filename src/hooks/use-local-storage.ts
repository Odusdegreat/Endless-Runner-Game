import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initial_value: T) {
  const [stored_value, set_stored_value] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initial_value;
    } catch {
      return initial_value;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored_value));
    } catch {
      // ignore storage failures
    }
  }, [key, stored_value]);

  return [stored_value, set_stored_value] as const;
}
