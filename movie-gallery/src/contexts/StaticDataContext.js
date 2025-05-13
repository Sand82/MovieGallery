import { createContext, useState, useEffect } from "react";

import * as detailService from "../services/DetailsService.js";

export const StaticDataContext = createContext();

export const StaticDataProvider = ({ children }) => {
  const [staticData, setStaticData] = useState({});
  const [serverErrors, setServerErrors] = useState(null);

  useEffect(() => {
    const getStaticData = async () => {
      setServerErrors(null);
      try {
        const responce = await detailService.getStaticData();
        setStaticData(responce);
      } catch (error) {
        setServerErrors(error);
      }
    };
    getStaticData();
  }, []);

  return (
    <StaticDataContext.Provider value={{ staticData, serverErrors }}>
      {children}
    </StaticDataContext.Provider>
  );
};
