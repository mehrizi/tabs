import { ReactNode, useContext } from "react";
import { ScrollingTabsContext } from "./ScrollingTabs";

export interface TabProps {
  activeStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  active?: boolean;
  children: ReactNode;
  onSelect?: () => void;
}

export function Tab({ style = {}, activeStyle = {}, active = false, children, onSelect }: TabProps): JSX.Element {
  const context = useContext(ScrollingTabsContext);

  // console.log(active);

  const styles = {
    _default: {
      display: 'inline-block',
      paddingRight: 15,
      paddingLeft: 15,
      marginRight: 5,
      marginLeft: 5,
      transition: 'all .5s',
      cursor: 'pointer'

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
        paddingBottom: 5,
        borderBottom: '2px solid rgba(0,0,0,0)'
      },
      active: {
        borderBottom: `2px solid ${context.tabColor}`
      }
    },
    contained: {
      default: {
        border: '1px solid #eee',
        borderRadius: 5,
        padding: '5px 10px',
        marginLeft: 10
      },
      active: {
        border: `1px solid ${context.tabColor}`,
        backgroundColor: context.tabColor,
        color: 'white'

      }
    },
  }


  const finalStyles = {
    ...styles._default,
    ...styles[context.tabStyle].default,
    ...style
  }
  const finalActiveStyles = {
    ...finalStyles,
    ...styles[context.tabStyle].active,
    ...activeStyle
  }
  return (
    <div style={active ? finalActiveStyles : finalStyles} onClick={onSelect}>
      {children}
    </div>
  );
};

