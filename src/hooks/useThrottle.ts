import { useCallback, useRef } from 'react';

function useThrottle(interval = 500) {
  const lastCalledRef = useRef<number>();
  const throttleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  /** Limit the amount of times a function is called with a certain time period */
  const throttle = useCallback(
    (func: () => void) => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      if (
        !lastCalledRef.current ||
        lastCalledRef.current + interval < Date.now()
      ) {
        func();
        lastCalledRef.current = Date.now();
      } else {
        // Make sure it's eventually called
        throttleTimeoutRef.current = setTimeout(func, interval);
      }
    },
    [interval]
  );

  return { throttle };
}

export default useThrottle;
