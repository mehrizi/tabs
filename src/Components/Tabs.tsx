import React, { LegacyRef, ReactNode, RefObject, forwardRef, useContext, useEffect, useRef } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
export interface TabsProps {
  children: ReactNode;
  // onChange?: (index: number) => void;
  style?: React.CSSProperties
  ref?: any
  className?: string
}


export const Tabs = forwardRef<RefObject<any>, TabsProps>((props) => {
  const context = useContext(ScrollingTabsContext);
  const finalStyle: React.CSSProperties = {
    background: 'white',
    padding: 10,
    ...props.style, 
    // important to have following here
    position: "sticky",
    top: 0,
  }
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    ref.current && context.setTabsRef(ref.current)
  }, [])
  return (
    <div className={props.className} style={finalStyle} ref={ref}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement<TabProps>(child) && child.type === Tab) {

          // console.log(typeof onChange);

          return React.cloneElement<TabProps>(child, {
            active: index == context.activeTab,
            onSelect: () => {
              context.setActiveTabByClick(index);
              // props.onChange && props.onChange(index)

            }
          });
        }
        return child;
      })}
    </div>
  );
});

Tabs.displayName = "Tabs";