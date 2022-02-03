import React, {DragEvent, useState} from "react";
import s from "../../App.module.css";
import {BoardType, CardType} from "../../App";

type PropsType = {
    boardId: string
    boards: BoardType[]
    items: CardType[]
    initial: { [key: string]: CardType[] }
    currentItem: CardType | null
    setCurrentItem: (item: CardType) => void
    setItems: (items: { [key: string]: CardType[] }) => void
}

export const Section = ({initial, items, boards, currentItem, setCurrentItem, boardId, setItems}: PropsType) => {
    const [newCardList, setNewCardList] = useState<CardType[]>([])
    const [currentBoard, setCurrentBoard] = useState(boardId)

    const onDragStartHandler = (e: DragEvent<HTMLDivElement>, item: CardType) => {
        console.log('start')
        setCurrentItem(item);
    }
    const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    }
    const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log(boardId)
    }
    const onDragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        console.log('end')
    }
    const onDropHandler = (e: DragEvent<HTMLDivElement>, card: CardType | null, currentBoardId: string) => {
        console.log('drop')
        e.preventDefault();
        let newItems = items.filter(item => card?.id !== item.id);
        console.log('AAAAA')
        setItems({...initial, [boardId]: newItems})
        // setNewCardList([...newCardList, {...currentItem, board: 'b2'}]);
    }

    const initialItems = items.map((c, i) => {
        return <div key={c.id + i}
                    draggable
                    onDragStart={(e) => onDragStartHandler(e, c)}
                    onDragLeave={onDragLeaveHandler}
                    onDragOver={onDragOverHandler}
                    onDragEnd={onDragEndHandler}
                    onDrop={(e) => onDropHandler(e, c, c.boardId)}
                    className={s[c.form]}/>
    })

    const resultItems = newCardList.map((c, i) => {
        return <div key={c.id + i}
                    draggable
                    onDragStart={(e) => onDragStartHandler(e, c)}
                    onDragLeave={onDragLeaveHandler}
                    onDragOver={onDragOverHandler}
                    onDragEnd={onDragEndHandler}
                    onDrop={(e) => onDropHandler(e, c, c.boardId)}
                    className={s[c.form]}/>
    });

    return (
        <div>
            <div onDragOver={onDragOverHandler}
                 onDrop={e => onDropHandler(e, currentItem, boardId)}
                 className={s.block}>
                {initialItems}
            </div>
            {/*<div onDragOver={e => e.preventDefault()}*/}
            {/*     onDrop={onDropHandler}*/}
            {/*     className={s.block}>*/}
            {/*    {resultItems}*/}
            {/*</div>*/}
        </div>
    );
}