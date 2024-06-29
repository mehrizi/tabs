import React, { ReactElement, ReactNode, createContext, useEffect, useRef, useState } from "react";
import { TabContextProps } from "./TabContext";
import { TabsProps } from "./Tabs";

function countTabContext(children: ReactNode) {
  let count = 0;
  React.Children.map(children, (child) => {
    count = isTabContext(child) ? count + 1 : count
  })
  return count;
}
function getComponentDisplayName(element: React.ReactElement<any>) {
  const node = element as React.ReactElement<React.ComponentType<any>>;
  const type = (node as unknown as React.ReactElement<React.FunctionComponent>)
    .type;
    
  const displayName =
    typeof type === 'function'
      ? (type as React.FunctionComponent).displayName ||
        (type as React.FunctionComponent).name ||
        'Unknown'
      : (
        typeof type === 'object'?(type as React.FunctionComponent).displayName:type
      );
  return displayName;
}
function isTabContext(elm: ReactNode) {

  return React.isValidElement<TabContextProps>(elm) && getComponentDisplayName(elm) == "TabContext"
}
function isTabs(elm: ReactNode) {
  return React.isValidElement<TabsProps>(elm) && getComponentDisplayName(elm) == 'Tabs'
}
export type TabStyle = 'none'|'underlined'|'contained'
export interface ScrollingTabsProps {
  children: ReactNode;
  tabStyle?:TabStyle;
  tabColor?: string
}
export type ScrollingContextType = {
  activeTab:number
  tabStyle:TabStyle
  tabColor:string
}
export const ScrollingTabsContext = createContext<ScrollingContextType>({ activeTab: 0 ,tabStyle:'none',tabColor:'red'});

export function ScrollingTabs({
  children,
  tabStyle='underlined',
  tabColor='red'
}: ScrollingTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const scrollInProgress = useRef(false)

  // Refs for TabContext component
  const contextCount = countTabContext(children);
  var refs: any = [];
  for (let i = 0; i < contextCount; i++)
    refs[i] = useRef<HTMLDivElement>(null);

  useEffect(() => {

    window.addEventListener("scroll", () => {
      // check that no scrolling by clicking Tab is in progress
      if (scrollInProgress.current)
        return;
      for (let i = contextCount - 1; i >= 0; i--) {

        if (refs[i].current.getBoundingClientRect().top < 0) {
          setActiveTab(i);
          break;
        }

      }
    });

  }, [])


  const setActiveTabByClick = (index:number) => {
    scrollInProgress.current = true;
    setActiveTab(index);
    refs[index].current.scrollIntoView({
      behavior: 'smooth'
    })

    // Below we ensure to set scrollInProgress to true at start
    // When the scroll is finished it is set to false again
    // This way we can prevent conflicting
    var lastPos: number = 0;
    var same = 0;

    requestAnimationFrame(check);

    function check() {
      if (window.scrollY === lastPos) { // same as previous
        if (same++ > 2) {
          scrollInProgress.current = false;
          return;
        }
      }
      lastPos = window.scrollY
      requestAnimationFrame(check);

    }
  }

  // Iterate children and passing needed props to work
  var tabContextCount = 0;
  function childrenProping(children: ReactNode) {
    return React.Children.map(children, (child) => {

      // console.log(child);
      
      if (isTabs(child)) {
        return React.cloneElement<TabsProps>(child as ReactElement, { onChange: setActiveTabByClick });
      }


      if (isTabContext(child)) {
        tabContextCount++;
        return React.cloneElement<TabContextProps>(child as ReactElement, { ref: refs[tabContextCount - 1], index: tabContextCount - 1 });
      }

      return child;

    })
  }

  const modifiedChildren = childrenProping(children);

  return (
    <ScrollingTabsContext.Provider value={{ activeTab,tabColor,tabStyle }} >
      <div style={{}}>
        {modifiedChildren}
      </div>

    </ScrollingTabsContext.Provider>
  );
}

