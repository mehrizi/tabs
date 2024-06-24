import { ReactNode, useContext } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";

export interface TabProps {
  activeStyles?: React.CSSProperties;
  active?: boolean;
  children: ReactNode;
  onSelect?: () => void;
}

export function Tab({ activeStyles = {}, active = false, children, onSelect }: TabProps): JSX.Element {
  const context = useContext(ScrollingTabsContext);

  const styles = {
    _default: {
      display: 'inline-block',
      paddingRight: 15,
      paddingLeft: 15,
      transition:'all .5s',
      cursor:'pointer'
  
    },
    none: {
      default: {
      },
      active: {
        color: context.tabColor
      }
    },
    underlined: {
      default: {
        paddingBottom:5,
        borderBottom: '2px solid rgba(0,0,0,0)'
      },
      active: {
        borderBottom:`2px solid ${context.tabColor}`
      }
    },
    contained: {
      default: {
        border:'1px solid #eee',
        borderRadius:5,
        padding:'5px 10px',
        marginLeft:10
      },
      active: {
        border:`1px solid ${context.tabColor}`,
        backgroundColor:context.tabColor,
        color:'white'
      
      }
    },
  }
  

  const finalStyles = {
    ...styles._default,
    ...styles[context.tabStyle].default
  }
  const finalActiveStyles = {
    ...finalStyles,
    ...styles[context.tabStyle].active,
    ...activeStyles
  }
  return (
    <div style={active ? finalActiveStyles : finalStyles} onClick={onSelect}>
      {children}
    </div>
  );
};

