// import React from "react";
// import useGlobalState from "./useGlobalState";
// import Context from "./context";
// interface GlobalStateProviderProps {
//   children: React.ReactNode,
// }
// const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
//   return (
//     <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
//   );
// };
// export default GlobalStateProvider;
import React from "react";
import useGlobalState from "./useGlobalState";
import Context from "./context";
interface GlobalStateProviderProps {
  children: React.ReactNode,
}
const GlobalStateProvider = ({ children }: any) => {
  return (
    <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
  );
};
export default GlobalStateProvider;
