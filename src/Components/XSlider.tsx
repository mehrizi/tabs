import { MouseEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"
import { ScrollingTabsContext } from "./ScrollingTabs";

export default function XSlider({ children }: { children: ReactNode, isRTL?: boolean }) {
    const context = useContext(ScrollingTabsContext);
    const dragRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [overFlowLeft, setOverFlowLeft] = useState(false)
    const [overFlowRight, setOverFlowRight] = useState(false)

    const ltrArrowCheck = () => {
        const lastEl = containerRef.current?.querySelector('.react-draggable>:last-child')
        const firstEl = containerRef.current?.querySelector('.react-draggable>:first-child')

        if (!firstEl || !lastEl || !containerRef.current)
            return;

        console.log(lastEl.getBoundingClientRect().x ,containerRef.current.getBoundingClientRect().x + containerRef.current.getBoundingClientRect().width)
        if (lastEl.getBoundingClientRect().x - containerRef.current.getBoundingClientRect().x - containerRef.current.getBoundingClientRect().width >10)
            setOverFlowRight(true)
        else
            setOverFlowRight(false)
        if (containerRef.current?.getBoundingClientRect().x - firstEl.getBoundingClientRect().x < 20)
            setOverFlowLeft(false)
        else
            setOverFlowLeft(true)


    }
    const rtlArrowCheck = () => {
        const bounding = dragRef.current?.getBoundingClientRect()
        const boundingContainer = containerRef.current?.getBoundingClientRect()
        const lastEl = containerRef.current?.querySelector('.react-draggable>:last-child')
        const boundingLast = lastEl?.getBoundingClientRect();

        if (!bounding || !boundingContainer || !boundingLast)
            return;


        const endDeltaX = (bounding.x + bounding.width - (boundingContainer.x + boundingContainer.width))
        if (endDeltaX < 10) {
            setOverFlowRight(false)
        }
        else
            setOverFlowRight(true)

        if (boundingLast.x - boundingContainer.x > -10)
            setOverFlowLeft(false)

        else
            setOverFlowLeft(true)

    }
    useEffect(() => {
        setTimeout(() => {
            if (context.rtl)
                rtlArrowCheck()
            else
                ltrArrowCheck()
        }, 100)

    })
    const leftArrowStyles: React.CSSProperties = {
        direction: 'ltr',
        height: '100%', verticalAlign: 'middle', position: "absolute",
        maxHeight: '100%',
        left: 0,
        top: 0,
        zIndex: 1000,
        padding: 5,
        paddingTop: 10,
        background: 'linear-gradient(to right, white, rgba(255, 255, 255, .4))',
        color: '#555',
        fontSize: 20
    }

    const rightArrowStyle = {
        ...leftArrowStyles,
        left: 'auto',
        right: 0,
        background: 'linear-gradient(to right, rgba(255, 255, 255, .4),white)'
    }

    return <div style={{
        overflowX: 'hidden',
        whiteSpace: "nowrap"
    }} ref={containerRef}>
        <Draggable
            axis='x'
            onDrag={(e) => {
                // setTimeout(() => {
                if (context.rtl)
                    rtlArrowCheck()
                else
                    ltrArrowCheck()
                //   }, 100)

                const bounding = dragRef.current?.getBoundingClientRect()
                const boundingContainer = containerRef.current?.getBoundingClientRect()
                const lastEl = dragRef.current?.querySelector('.a-last-element')
                const boundingLast = lastEl?.getBoundingClientRect();

                if (!bounding || !boundingContainer || !boundingLast)
                    return;


                const me = e as MouseEvent;

                if (!context.rtl) {
                    if (boundingContainer.x < bounding.x && me.movementX > 0)
                        return false
                    if (boundingLast.x < boundingContainer.width && me.movementX < 0)
                        return false
                }
                if (context.rtl) {
                    const endDeltaX = (bounding.x + bounding.width - (boundingContainer.x + boundingContainer.width))
                    if (endDeltaX < 0 && me.movementX < 0) {
                        return false
                    }

                    if (boundingLast.x > boundingContainer.x && me.movementX > 0)
                        return false
                }
            }}
        >
            <div ref={dragRef} style={{
                position: 'relative'
            }}>
                {children}
                <div className="a-last-element" style={{
                    display: "inline-block"

                }}>&nbsp;</div>

            </div>
        </Draggable>
        {overFlowRight && <div style={rightArrowStyle}
            className="overflow-right">&raquo;</div>}
        {overFlowLeft && <div style={leftArrowStyles} className="overflow-left">&laquo;</div>}


    </div>
}