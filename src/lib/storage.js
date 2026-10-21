import { useEffect, useState } from "react";
export function useSavedState(key, initial, valid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw === null ? initial : JSON.parse(raw);
      return valid(parsed) ? parsed : initial;
    } catch {
      return initial;
    }
  });
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setError("");
    } catch {
      setError(
        "Não foi possível salvar neste navegador. Suas alterações valem apenas nesta sessão.",
      );
    }
  }, [key, value]);
  return [value, setValue, error];
}
