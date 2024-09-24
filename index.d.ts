import { default as default_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';

export declare function ScrollingTabs({ children, tabStyle, tabColor, className, }: ScrollingTabsProps): JSX.Element;

export declare interface ScrollingTabsProps {
    children: ReactNode;
    tabStyle?: TabStyle;
    tabColor?: string;
    className?: string;
}

export declare function Tab({ style, ind, activeStyle, children, className, activeClassName }: TabProps): JSX.Element;

export declare const TabContext: ForwardRefExoticComponent<TabContextRefProps & RefAttributes<RefObject<any>>>;

export declare interface TabContextProps {
    index?: number;
    children: ReactNode;
    ref: any;
    className?: string;
}

declare interface TabContextRefProps {
    index?: number;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export declare interface TabProps {
    activeStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    children: ReactNode;
    className?: string;
    activeClassName?: string;
}

export declare const Tabs: {
    (props: TabsProps): JSX_2.Element;
    displayName: string;
};

export declare interface TabsProps {
    children: ReactNode;
    noArrow?: boolean;
    style?: default_2.CSSProperties;
    className?: string;
}

declare type TabStyle = 'none' | 'underlined' | 'contained';

export { }
