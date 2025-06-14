import { useState, useEffect } from "react";

export const useAsyncEffect = (asyncFunction, deps = []) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);

      await asyncFunction();
      if (active) setLoading(false);
    };

    setTimeout(() => run(), 500);

    return () => {
      active = false;
    };
  }, deps);

  return loading;
};
