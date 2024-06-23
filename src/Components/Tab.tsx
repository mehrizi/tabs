import { ReactNode } from "react";
export interface TabProps {
  activeStyles?: React.CSSProperties;
  active?: boolean;
  children: ReactNode;
  onSelect?:()=>void;
}


export  function Tab ({activeStyles={},active=false,  children,onSelect}: TabProps): JSX.Element {
  const defaultStyles = {
    display: 'inline-block',
    paddingRight:15,
    paddingLeft:15
  }
  const defaultActiveStyles = {
    color:'red'
  }
  const finalActiveStyles = {
    ...defaultStyles,
    ...defaultActiveStyles,
    ...activeStyles
  }
  return (
    <div style={active?finalActiveStyles:defaultStyles} onClick={onSelect}>
      {children}
    </div>
  );
};

