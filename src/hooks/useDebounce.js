import { useEffect, useState } from 'react';

export function useDebounce(valor, milisegundos) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timeout = setTimeout(() => setValorDebounced(valor), milisegundos);
    return () => clearTimeout(timeout);
  }, [valor, milisegundos]);

  return valorDebounced;
}