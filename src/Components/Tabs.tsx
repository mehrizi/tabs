import React, { ReactNode, RefObject, forwardRef, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";
import { Tab, TabProps } from "./Tab";
import XSlider from "./XSlider";
export interface TabsProps {
  children: ReactNode;
  style?: React.CSSProperties
  ref?: any
  className?: string
}


export const Tabs = forwardRef<RefObject<any>, TabsProps>((props) => {
  const context = useContext(ScrollingTabsContext);
  const [overFlowEnd, setOverFlowEnd] = useState(false)
  const [overFlowStart, setOverFlowStart] = useState(false)
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

  useEffect(() => {
    setTimeout(() => {
      const lastEl = ref.current?.querySelector('.a-last-element')
      const firstEl = ref.current?.querySelector('.react-draggable:first-child')
      if (!firstEl || !lastEl || !ref.current)
        return;
      if (firstEl.getBoundingClientRect().x < -10)
        setOverFlowStart(true)
      else
        setOverFlowStart(false)
      if (lastEl.getBoundingClientRect().x - (ref.current?.getBoundingClientRect().x + ref.current?.getBoundingClientRect().width) > 10)
        setOverFlowEnd(true)
      else
        setOverFlowEnd(false)

    }, 100)

  })
  const arrowsStyles: React.CSSProperties = {
    height: '100%', verticalAlign: 'middle', position: "absolute",
    left: 0,
    top: 10,
    zIndex: 1000,
    padding: 5,
    // paddingLeft:5,
    background: 'linear-gradient(to right, white, rgba(255, 255, 255, 0))',
    color: '#555',
    fontSize: 20
  }
  const finalChildren = recursiveMap(props.children)
  return (
    <div className={props.className} style={finalStyle} ref={ref}>
      {overFlowStart && <div style={arrowsStyles} className="overflow-left">&laquo;</div>}
      <XSlider>
        {finalChildren}
      </XSlider>
      {overFlowEnd && <div style={{ ...arrowsStyles, left: 'auto', right: 0, background: 'linear-gradient(to right, rgba(255, 255, 255, 0),white)' }}
        className="overflow-right">&raquo;</div>}
    </div>
  );
});

Tabs.displayName = "Tabs";