import { ReactNode, useContext } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
import React from "react";
export interface TabsProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  style?: React.CSSProperties
}


export function Tabs({ children, onChange, style }: TabsProps): JSX.Element {
  const context = useContext(ScrollingTabsContext);
  const finalStyle:React.CSSProperties = {
    background: 'white',
    ...style,
    padding:10,
    // important to have following here
    position: "sticky",
     top: 0,
  }
  return (
    <div style={finalStyle}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {
          
          return React.cloneElement<TabProps>(child, {
            active: index == context.activeTab, 
            onSelect: () => onChange(index)
          });
        }
        return child;
      })}
    </div>
  );
};

