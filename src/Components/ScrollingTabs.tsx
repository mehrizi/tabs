import React, { ReactElement, ReactNode, createContext, useEffect, useRef, useState } from "react";
import { TabContextProps } from "./TabContext";

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
  rtl?: boolean
}
export type ScrollingContextType = {
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
  const contextCount = countTabContext(children);
  var refs: any = [];
  for (let i = 0; i < contextCount; i++)
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

      for (let i = contextCount - 1; i >= 0; i--) {
        if (refs[i] && refs[i].current && refs[i].current.getBoundingClientRect().top < top + 100) {
          setActiveTab(i);
          break;
        }

      }
    });

  }, [])


  const setActiveTabByClick = (index: number) => {
    scrollInProgress.current = true;
    setActiveTab(index);
    const top = window.scrollY + refs[index].current.getBoundingClientRect().top;
    const topOffset = tabsRef.current ? tabsRef.current.getBoundingClientRect().height : 70
    // console.log(topOffset)

    setTimeout(()=>{
      window.scrollTo({ top: top - topOffset, behavior: 'smooth' });
      requestAnimationFrame(check);

    },50)


    // Below we ensure to set scrollInProgress to true at start
    // When the scroll is finished it is set to false again
    // This way we can prevent conflicting
    var lastPos: number = 0;
    var same = 0;

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

      if (isTabContext(child)) {
        tabContextCount++;
        return React.cloneElement<TabContextProps>(child as ReactElement, { ref: refs[tabContextCount - 1], index: tabContextCount - 1 });
      }

      return child;

    })
  }

  // Here we make sure that selected tab is visible
  useEffect(() => {
    const activeEl = tabsRef.current?.querySelector(".active");
    // const parentEl = activeEl?.parentElement;//.parentElement;
    const activeX = activeEl?.getBoundingClientRect().x;
    const containerWidth = tabsRef.current?.getBoundingClientRect().width;
    // console.log(parentEl);
    if (!activeX || !containerWidth)
      return;

    if (activeX - containerWidth > -50 || activeX < 0) {

      setTimeout(() => {activeEl?.scrollIntoView(); }, 1);
      // activeEl?.scrollIntoView();
      // parentEl?.scrollTo({ left: -200  });

    }

  })

  // Detecting the direction
  useEffect(() => {
    if (direction === null && container.current) {
      // @ts-ignore
      const dir = getComputedStyle(container.current.parentElement)?.direction
      if (!dir) {
        console.log("ScrollingTab: Could not determine direction! setting to LTR")
        setDirection('ltr')
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

