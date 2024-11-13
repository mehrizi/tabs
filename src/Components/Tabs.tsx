import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
import XSlider from "./XSlider";
export interface TabsProps {
  children: ReactNode;
  noArrow?: boolean;
  style?: React.CSSProperties
  className?: string
}


export const Tabs = (props: TabsProps) => {
  const context = useContext(ScrollingTabsContext);
  const [sticky, setSticky] = useState<boolean>(false)
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
      if (!child)
        return child
      if (React.isValidElement<TabProps>(child) && child.type === Tab) {
        countObj.count++;
        return React.cloneElement(child, {
          // @ts-ignore
          ind: countObj.count,
        })
      }

      //@ts-ignore
      if (child.props && child.props.children) {
        //@ts-ignore
        return React.cloneElement(child, {
          //@ts-ignore
          children: recursiveMap(child.props.children, countObj)
        });
      }
      return child
    })

  }

  useEffect(() => {

    window.addEventListener("scroll", () => {
      // check that no scrolling by clicking Tab is in progress
      const clientRect = ref.current?.getBoundingClientRect()
      if (!clientRect)
        return
      if (clientRect.top <= 0)
        setSticky(true)
      else
        setSticky(false)
    });

  }, [])



  const finalChildren = recursiveMap(props.children)
  return (
    <div className={props.className?props.className:''+ (sticky?" sticked":"")} style={finalStyle} ref={ref}>
      <XSlider noArrow={props.noArrow}>
        {finalChildren}
      </XSlider>
    </div>
  );
};

Tabs.displayName = "Tabs";