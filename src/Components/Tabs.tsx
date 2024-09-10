import React, { ReactNode, RefObject, forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
import XSlider from "./XSlider";
import XSliderRTL from "./XSliderRTL";
export interface TabsProps {
  children: ReactNode;
  style?: React.CSSProperties
  className?: string
}


export const Tabs = (props: TabsProps) => {
  const context = useContext(ScrollingTabsContext);
  const finalStyle: React.CSSProperties = {
    background: 'white',
    padding: 10,
    ...props.style,
    // important to have following here
    position: "sticky",
    top: 0,
  }

  // Referencing the tabs container for boundingBox calc
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current && context.setTabsRef(ref.current)
  }, [])

  // We make sure to capture all tabs in any decendant hierarchy
  const recursiveMap = (children: ReactNode, countObj = { count: -1 }): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<TabProps>(child) && child.type === Tab) {
        countObj.count++;
        return React.cloneElement(child, {
          // @ts-ignore
          ind: countObj.count,
        })
      }

      //@ts-ignore
      if (child.props.children) {
        //@ts-ignore
        return React.cloneElement(child, {
          //@ts-ignore
          children: recursiveMap(child.props.children, countObj)
        });
      }
      return child
    })

  }

 
  const finalChildren = recursiveMap(props.children)
  return (
    <div className={props.className} style={finalStyle} ref={ref}>
      <XSlider isRTL={context.rtl}>
        {finalChildren}
      </XSlider>
    </div>
  );
};

Tabs.displayName = "Tabs";