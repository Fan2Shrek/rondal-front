import React, { useState } from 'react';

export const ListContext = React.createContext({
  query: null,
  setQuery: (query: any) => {},
});

type Props = {
  children: React.ReactNode,
}

export const ListContextProvider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState<any>();

  return <ListContext.Provider value={{ query, setQuery }}>
    {children}
  </ListContext.Provider>
};
