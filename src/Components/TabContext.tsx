import { LegacyRef, ReactNode, RefObject, forwardRef } from "react";
export interface TabContextProps {
  index?: number
  children: ReactNode,
  ref:any//RefObject<HTMLDivElement>
  className?:string
}

export interface TabContextRefProps {
  index?: number
  children: ReactNode
  className?:string
}


const TabContext =forwardRef<RefObject<any>,TabContextRefProps> ( (props,ref) => {
  return (
    <div className={props.className} ref={ref as LegacyRef<any>} data-index={props.index}>
      {props.children}
    </div>
  );
});
TabContext.displayName = "TabContext";
export { TabContext };

