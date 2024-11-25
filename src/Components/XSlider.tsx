import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { ScrollingTabsContext } from "./ScrollingTabs";

export default function XSlider({ children, noArrow = false }: { children: ReactNode, noArrow?: boolean }) {
    const context = useContext(ScrollingTabsContext);
    const dragRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragX, setDragX] = useState(0)
    const [overFlowLeft, setOverFlowLeft] = useState(false)
    const [overFlowRight, setOverFlowRight] = useState(false)

    const arrowCheck = () => {
        if (noArrow)
            return;

        if (context.rtl)
            rtlArrowCheck()
        else
            ltrArrowCheck()
    }
    const ltrArrowCheck = () => {
        const lastEl = containerRef.current?.querySelector('.react-draggable>:last-child')
        const firstEl = containerRef.current?.querySelector('.react-draggable>:first-child')

        if (!firstEl || !lastEl || !containerRef.current)
            return;

        console.log(lastEl.getBoundingClientRect().x, containerRef.current.getBoundingClientRect().x + containerRef.current.getBoundingClientRect().width)
        if (lastEl.getBoundingClientRect().x - containerRef.current.getBoundingClientRect().x - containerRef.current.getBoundingClientRect().width > 10)
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

    // Here we make sure that selected tab is visible
    useEffect(() => {
        const activeEl = containerRef?.current?.querySelector(".active");
        const parentEl = containerRef?.current;
        if (!parentEl || !activeEl)
            return;

        const activeX = activeEl?.getBoundingClientRect().x;
        const containerWidth = parentEl?.getBoundingClientRect().width;
        const containerX = parentEl?.getBoundingClientRect().x

        const containerRight = containerX + containerWidth
        const activeRight = activeX + activeEl?.getBoundingClientRect().width;

        // console.log(containerRight, activeRight);

        if (activeRight > containerRight) {
            setDragX(dragX - (activeRight - containerRight) - 20);
            setTimeout(() => {
                arrowCheck()
            }, 2)

            return;
        }
        if (activeX < containerX) {
            setDragX(dragX + (containerX - activeX) + 20);
            setTimeout(() => {
                arrowCheck()
            }, 2)

            return;
        }

    }, [context.activeTab])

    const slowDrag = (current: number, original: number, right: boolean = true) => {
        const delta = (right ? -1 : 1) * Math.floor(current / 2)

        if (delta == 0)
            return;
        setTimeout(() => {
            setDragX(x => x + delta)
            slowDrag(Math.abs(delta), original, right)
        }, 20)
    }

    useEffect(() => {
        setTimeout(() => {
            arrowCheck()
        }, 100)

    }, [])
    const leftArrowStyles: React.CSSProperties = {
        direction: 'ltr',
        verticalAlign: 'middle', position: "absolute",
        maxHeight: '100%',
        cursor: "pointer",
        left: 0,
        top: 0,
        bottom: 0,
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
        overflow: 'hidden',
        whiteSpace: "nowrap"
    }} ref={containerRef}>
        <Draggable
            nodeRef={dragRef}
            axis='x'
            position={{ y: 0, x: dragX }}
            onDrag={(_e, a) => {

                setTimeout(() => {
                    if (!noArrow) {
                        if (context.rtl)
                            rtlArrowCheck()
                        else
                            ltrArrowCheck()

                    }

                }, 100)

                const bounding = dragRef.current?.getBoundingClientRect()
                const boundingContainer = containerRef.current?.getBoundingClientRect()
                const lastEl = dragRef.current?.querySelector('.a-last-element')
                const boundingLast = lastEl?.getBoundingClientRect();

                if (!bounding || !boundingContainer || !boundingLast)
                    return false;


                if (!context.rtl) {
                    if (boundingContainer.x < bounding.x && a.deltaX > 0)
                        return false
                    if (boundingLast.x < (boundingContainer.x + boundingContainer.width) && a.deltaX < 0)
                        return false
                }
                if (context.rtl) {
                    const endDeltaX = (bounding.x + bounding.width - (boundingContainer.x + boundingContainer.width))
                    if (endDeltaX < 0 && a.deltaX < 0) {
                        return false
                    }

                    if (boundingLast.x > boundingContainer.x && a.deltaX > 0)
                        return false
                }
                setDragX(a.x)

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
        {(!noArrow && overFlowRight) && <div style={rightArrowStyle} onClick={() => {
            slowDrag(100, 100);
            setTimeout(() => arrowCheck(), 100)
        }}
            className="overflow-right">&raquo;</div>}
        {(!noArrow && overFlowLeft) && <div style={leftArrowStyles} onClick={() => {
            slowDrag(100, 100, false);
            setTimeout(() => arrowCheck(), 100)

        }} className="overflow-left">&laquo;</div>}


    </div>
}