import { useRef, useMemo, useCallback } from 'react';

function useHistory(value) {
  const historyRef = useRef(0);
  const history = useMemo(() => value, [historyRef.current]);
  const change = useCallback(() => {
    historyRef.current += 1;
  }, [historyRef]);
  return [history, change];
}
export default useHistory;
