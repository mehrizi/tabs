import { ReactNode, createContext, useEffect, useId, useRef, useState } from "react";
import { Tabs, TabsProps } from "./Tabs";
import React from "react";
import { TabContext, TabContextProps } from "./TabContext";

function countTabContext(children: ReactNode) {
  let count = 0;
  React.Children.map(children, (child) => count = isTabContext(child) ? count + 1 : count)
  return count;
}

function isTabContext(elm: ReactNode) {
  // as TabContext is a forwardRef element the following toString() trick is 
  // so far the only way I can check the component type
  return React.isValidElement<TabContextProps>(elm) && elm.type.toString() === TabContext.toString()
}
function isTabs(elm: ReactNode) {
  return React.isValidElement<TabsProps>(elm) && elm.type.name == 'Tabs'
}

export interface ScrollingTabsProps {
  children: ReactNode;
}
export const ScrollingTabsContext = createContext({ activeTab: 0 });


export function ScrollingTabs({
  children,
}: ScrollingTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const contextCount = countTabContext(children);
  const scrollInProgress = useRef(false)

  // Refs for TabContext component
  let refs: any = [];
  for (let i = 0; i < contextCount; i++)
    refs[i] = useRef<HTMLDivElement>(null);

  useEffect(() => {

    window.addEventListener("scroll", (e) => {
      // check that no scrolling by clicking Tab is in progress
      if (scrollInProgress.current)
        return;
      for (let i = contextCount-1; i >= 0; i--) {
        
        if (refs[i].current.getBoundingClientRect().top < 0) {
          setActiveTab(i);
          break;
        }

      }
    });

  }, [])


  const setActiveTabByClick = (index) => {
    scrollInProgress.current = true;
    setActiveTab(index);
    refs[index].current.scrollIntoView({
      behavior: 'smooth'
    })

    // Below we ensure to set scrollInProgress to true at start
    // When the scroll is finished it is set to false again
    // This way we can prevent conflicting
    var lastPos:number=0;
    var same=0;

    requestAnimationFrame( check );
    
    function check() {
      if( window.scrollY === lastPos ) { // same as previous
        if(same ++ > 2) { 
          scrollInProgress.current = false;
          return;
        }
      }
      lastPos = window.scrollY
      requestAnimationFrame( check );

    }
  }

  // Iterate children and passing needed props to work
  var tabContextCount = 0;
  const modifiedChildren = React.Children.map(children, (child) => {

    if (isTabs(child))
      return React.cloneElement<TabsProps>(child, { onChange: setActiveTabByClick });

    if (isTabContext(child)) {
      tabContextCount++;

      return React.cloneElement<TabContextProps>(child, { ref: refs[tabContextCount - 1], index: tabContextCount - 1 });
    }

    return child;
  });

  return (
    <ScrollingTabsContext.Provider value={{ activeTab }} >
        {modifiedChildren}
    </ScrollingTabsContext.Provider>
  );
}

