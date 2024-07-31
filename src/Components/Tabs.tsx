import React, { LegacyRef, ReactNode, RefObject, forwardRef, useContext } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
export interface TabsProps {
  children: ReactNode;
  onChange?: (index: number) => void;
  style?: React.CSSProperties
  ref?:any
  className?:string
}


export const Tabs = forwardRef<RefObject<any>, TabsProps>((props, ref) => {
  const context = useContext(ScrollingTabsContext);
  const finalStyle: React.CSSProperties = {
    background: 'white',
    ...props.style,
    padding: 10,
    // important to have following here
    position: "sticky",
    top: 0,
  }
  return (
    <div className={props.className} style={finalStyle} ref={ref as LegacyRef<any>}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {

          // console.log(typeof onChange);

          return React.cloneElement<TabProps>(child, {
            active: index == context.activeTab,
            onSelect: () => {
              props.onChange && props.onChange(index)

            }
          });
        }
        return child;
      })}
    </div>
  );
});

Tabs.displayName = "Tabs";