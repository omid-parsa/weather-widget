// import { useReducer } from "react";
// import storage from "local-storage-fallback";
// import { Store, ActionTypes, SetLocationAction } from "core/types";



// const reducer = (state: Store, action: SetLocationAction) => {
//   switch (action.type) {
//     case ActionTypes.set_location:
//       storage.setItem("myLocation", JSON.stringify(action.payload));
//       return {
//         ...state,
//         location: action.payload
//       };
//     // case "SAVE_DATA":
//     //   return {
//     //     ...state,
//     //     savedData: action.payload
//     //   };
//     default:
//       return state;
//   }
// };
// const useGlobalState = () => {
//   const [state, dispatch] = useReducer(reducer, {
//     location: null
//   });
//   return { state, dispatch };
// };
// export default useGlobalState;
import { useReducer } from "react";
import storage from "local-storage-fallback";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      // storage.setItem("isDarkMode", !state.isDarkMode);
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    case "SAVE_DATA":
      return {
        ...state,
        savedData: action.payload
      };
    default:
      return state;
  }
};
const useGlobalState = () => {
  const [state, dispatch] = useReducer(reducer, {
  });
  return { state, dispatch };
};
export default useGlobalState;
