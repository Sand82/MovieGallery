import { useState, useEffect } from "react";

export const useAsyncEffect = (asyncFn, deps = []) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);

      await asyncFn();
      if (active) setLoading(false);
    };

    setTimeout(() => run(), 500);

    return () => {
      active = false;
    };
  }, deps);

  return loading;
};
