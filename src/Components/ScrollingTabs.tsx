import { ReactNode, createContext, useId, useState } from "react";
import { Tabs, TabsProps } from "./Tabs";
import React from "react";
import { TabContext, TabContextProps } from "./TabContext";


export interface ScrollingTabsProps {
  children: ReactNode;
}
export const ScrollingTabsContext = createContext({ activeTab: 0 });


export function ScrollingTabs({
  children,
}: ScrollingTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const ID = useId();
  const setActiveTabByClick = (index) => {
    setActiveTab(index);
    const element = document.querySelectorAll(`[data-index="${index}"]`);
    console.log(element);
    // element[0].scrollIntoView()


  }

  const modifiedChildren = React.Children.map(children, (child, index) => {
    console.log(child.type);
    
    if (React.isValidElement<TabsProps>(child) && typeof child.type === typeof Tabs) {
      console.log(11);
      return React.cloneElement<TabsProps>(child, { onChange: setActiveTabByClick });
    }
    if (React.isValidElement<TabContextProps>(child) && typeof child.type == typeof TabContext) {
      console.log(12);
      return React.cloneElement<TabContextProps>(child, { index });
    }

    return child;
  });

  return (
    <ScrollingTabsContext.Provider value={{ activeTab }} >
      <div id={ID}>
        {modifiedChildren}

      </div>

    </ScrollingTabsContext.Provider>
  );
}

