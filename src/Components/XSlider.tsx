import { MouseEvent, ReactNode, useRef } from "react";
import Draggable from "react-draggable"

export default function XSlider({children}:{children:ReactNode}){
    const dragRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return <div style={{
        overflowX: 'hidden',
        whiteSpace:"nowrap"
    }} ref={containerRef}>
    <Draggable
        axis='x'
        onDrag={(e)=>{
            const bounding = dragRef.current?.getBoundingClientRect()
            const boundingContainer = containerRef.current?.getBoundingClientRect()
            const lastEl =dragRef.current?.querySelector('.a-last-element')
            const boundingLast = lastEl?.getBoundingClientRect();

            if (!bounding || !boundingContainer ||!boundingLast)
                return;
           
            
            const me = e as MouseEvent;
            console.log(boundingLast)
            if (boundingContainer.x < bounding.x &&me.movementX>0)
                return false
            if (boundingLast.x<boundingContainer.width && me.movementX<0)
                return false            
            
        }}
    >
        <div ref={dragRef} style={{
            position:'relative'
        }}>
        {children}
        <div className="a-last-element" style={{
                display:"inline-block"

            }}>&nbsp;</div>

        </div>
    </Draggable>
</div>
}