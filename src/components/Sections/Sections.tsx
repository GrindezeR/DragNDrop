import React, {DragEvent, useState} from "react";
import s from "./Sections.module.scss";
import {ItemType} from "../../App";

type PropsType = {
    items: ItemType[]
}

export const Sections = ({items}: PropsType) => {
    const [newCardList, setNewCardList] = useState<ItemType[]>([])
    const [currentItem, setCurrentItem] = useState<ItemType | null>(null);

    const dragStart = (e: DragEvent<HTMLDivElement>, item: ItemType) => {
        setCurrentItem(item);
    }
    const dragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.backgroundColor = 'white';
    }
    const dragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = '#feffb3';
    }
    const dragDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = 'white';
        currentItem && setNewCardList([...newCardList, currentItem]);
        setCurrentItem(null);
    }

    const initialItems = items.map((c, i) => {
        const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => dragStart(e, c);
        return <div key={c.id + i} className={s[c.form]} draggable onDragStart={onDragStartHandler}/>
    })

    const resultItems = newCardList.map((c, i) => <div key={c.id + i} className={s[c.form]}/>);

    return (
        <div className={s.wrapper}>
            <div className={s.initialBlock}>
                <span className={s.title}>Grab item</span>
                <div className={s.initialShapesWrapper}>
                    {initialItems}
                </div>
            </div>
            <div className={s.resultBlock}
                 onDragOver={dragOver}
                 onDrop={dragDrop}
                 onDragLeave={dragLeave}>
                <span className={s.title}>Drop here</span>
                <div className={s.resultShapesWrapper}>
                    {resultItems}
                </div>
            </div>
        </div>
    );
}