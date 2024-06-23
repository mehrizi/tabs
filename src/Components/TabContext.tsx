import { ReactNode } from "react";
export interface TabContextProps {
  index?: number
  children: ReactNode
}


export  function TabContext ({index, children}: TabContextProps): JSX.Element {
  return (
    <div data-index={index}>
      {children}
    </div>
  );
};

