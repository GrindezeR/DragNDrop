import React, {useState} from 'react';
import s from './App.module.scss';
import {v1} from "uuid";
import {Sections} from "./components/Sections/Sections";

export type ItemType = {
    id: string
    form: 'circle' | 'square' | 'triangle' | 'segment' | 'pacman'
}

function App() {
    const [items, setItems] = useState<ItemType[]>(
        [
            {id: v1(), form: 'circle'},
            {id: v1(), form: 'square'},
            {id: v1(), form: 'segment'},
            {id: v1(), form: 'pacman'},
            {id: v1(), form: 'triangle'},
        ]
    )

    return (
        <div className={s.app}>
            <Sections items={items}/>
        </div>
    );
}

export default App;
