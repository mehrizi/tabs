import { ReactNode, forwardRef } from "react";
export interface TabContextProps {
  index?: number
  children: ReactNode,
  ref:any
}


export const TabContext =forwardRef ( (props:TabContextProps,ref) => {
  return (
    <div ref={ref} data-index={props.index}>
      {props.children}
    </div>
  );
});
// TabContext.displayName == "TabContext";
// export {TabContext};
