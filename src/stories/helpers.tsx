import { ReactNode } from "react"
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

export const InlineCode = ({children,cmd=false}:{children:ReactNode,cmd?:boolean})=>{
    let styles = {
        backgroundColor:'#fff8e8',
        color:'#333',
        padding:'2px 4px',
        border:'1px solid #ffefc9',
        fontSize:13,
        borderRadius:4
      };

      if (cmd)
        styles = {...styles,
            color:'#222',
            backgroundColor:'#ddd',
            border:'1px solid #ccc',
            padding: '5px 10px',
            margin:'5px 0',
            display:'inline-block',
            fontSize: 14

        }
    
    return <span style={styles}>{children}</span>
  }
  