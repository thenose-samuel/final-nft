"use client";

const { createContext, useReducer } = require("react");

export const AuthStateContext = createContext(null);
export const AuthDispatchContext = createContext(null);
export const WalletContext = createContext(null);
export const ContractContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, null);
  return (
    <>
      <AuthStateContext.Provider value={state?.user}>
        <AuthDispatchContext.Provider value={dispatch}>
          <WalletContext.Provider value={state?.wallet}>
            <ContractContext.Provider value={state?.contract}>
              {children}
            </ContractContext.Provider>
          </WalletContext.Provider>
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    </>
  );
}

function AuthReducer(state, action) {
  return action;
}
