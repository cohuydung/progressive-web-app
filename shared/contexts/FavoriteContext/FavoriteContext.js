import { createContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { LAUCHES_PAST_QUERY } from "../../graphql/queries";

export const FavoriteContext = createContext();

const FavoriteContextProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  return (
    <FavoriteContext.Provider value={{ favoriteList, setFavoriteList }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
