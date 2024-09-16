import React, { ReactElement, ReactNode, createContext, useEffect, useRef, useState } from "react";
import { TabContextProps } from "./TabContext";

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
        typeof type === 'object' ? (type as React.FunctionComponent).displayName : type
      );
  return displayName;
}
function isTabContext(elm: ReactNode) {

  return React.isValidElement<TabContextProps>(elm) && getComponentDisplayName(elm) == "TabContext"
}
export type TabStyle = 'none' | 'underlined' | 'contained'
export interface ScrollingTabsProps {
  children: ReactNode;
  tabStyle?: TabStyle;
  tabColor?: string,
  className?: string
}
export type ScrollingContextType

  = {
    activeTab: number
    tabStyle: TabStyle
    tabColor: string
    rtl: boolean
    setTabsRef: (ref: HTMLDivElement) => void
    setActiveTabByClick: (tabIndex: number) => void
  }
export const ScrollingTabsContext = createContext<ScrollingContextType>({ rtl: false, setActiveTabByClick: () => { }, setTabsRef: () => { }, activeTab: 0, tabStyle: 'none', tabColor: 'red' });

export function ScrollingTabs({
  children,
  tabStyle = 'underlined',
  tabColor = 'red',
  className = '',
}: ScrollingTabsProps): JSX.Element {
  const [direction, setDirection] = useState<'rtl' | 'ltr' | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const scrollInProgress = useRef(false)
  const container = useRef(null)

  // Refs for TabContext component
  var refs: any = [];
  for (let i = 0; i < 50; i++) // important to have constant number of hooks!
    refs[i] = useRef<HTMLDivElement>(null);

  const tabsRef = useRef<HTMLDivElement>()

  const setTabsRef = (ref: HTMLDivElement) => {
    tabsRef.current = ref;

  }


  useEffect(() => {

    window.addEventListener("scroll", () => {
      // check that no scrolling by clicking Tab is in progress
      if (scrollInProgress.current)
        return;

      const top = tabsRef.current ? tabsRef.current.getBoundingClientRect().height : 0

      for (let i = 49; i >= 0; i--) {

        if (refs[i] && refs[i].current && refs[i].current.getBoundingClientRect().top < top + 100) {
          setActiveTab(i);
          break;
        }

      }
    });

  }, [])


  const setActiveTabByClick = (index: number) => {
    scrollInProgress.current = true;
    const top = window.scrollY + refs[index].current.getBoundingClientRect().top;
    const topOffset = tabsRef.current ? tabsRef.current.getBoundingClientRect().height : 70
    console.log(top - topOffset)
    setActiveTab(index);

    setTimeout(() => {
      window.scrollTo({ top: top - topOffset, behavior: 'smooth' });
      requestAnimationFrame(check);

    }, 1)


    // Below we ensure to set scrollInProgress to true at start
    // When the scroll is finished it is set to false again
    // This way we can prevent conflicting
    var lastPos: number = 0;
    var same = 0;

    function check() {
      if (window.scrollY === lastPos) { // same as previous
        if (same++ > 3) {
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

      if (isTabContext(child)) {
        tabContextCount++;
        return React.cloneElement<TabContextProps>(child as ReactElement, { ref: refs[tabContextCount - 1], index: tabContextCount - 1 });
      }

      return child;

    })
  }


  // Detecting the direction
  useEffect(() => {
    if (direction === null && container.current) {
      // @ts-ignore
      const dir = getComputedStyle(container.current.parentElement)?.direction
      if (!dir) {
        console.log("ScrollingTab: Could not determine direction! setting to LTR")
        return setDirection('ltr')
      }

      setDirection(dir as 'rtl' | 'ltr')

    }

  }, [])
  const modifiedChildren = childrenProping(children);

  return (
    <ScrollingTabsContext.Provider value={{ rtl: direction === 'rtl', setTabsRef, setActiveTabByClick, activeTab, tabColor, tabStyle }} >
      <div className={className} style={{}} ref={container}>
        {direction && modifiedChildren}
      </div>

    </ScrollingTabsContext.Provider>
  );
}

