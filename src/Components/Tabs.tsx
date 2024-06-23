import { ReactNode, useContext } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import {Tab, TabProps } from "./Tab";
import React from "react";
export interface TabsProps {
  children: ReactNode;
  onChange?:(index:number)=>void;
}


export function Tabs({ children ,onChange}: TabsProps): JSX.Element {
  const context = useContext(ScrollingTabsContext);
  return (
    <div style={{display:"sticky",top:0}}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {
          return React.cloneElement<TabProps>(child, { active: index == context.activeTab, onSelect:()=>onChange(index) });
        }
      })}
    </div>
  );
};

