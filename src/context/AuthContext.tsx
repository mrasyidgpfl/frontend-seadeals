import React, {
  createContext, FC, useMemo, useState,
} from 'react';

interface Props {
  children: JSX.Element;
}

const AuthContext = createContext({});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState({});

  const providerAuth = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={providerAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
