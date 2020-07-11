import React, { useState, useEffect } from "react";
import axios from 'axios';
import { processData } from './DataProcessor';

const REQUEST_INTERVAL = 3000;
const DEFAULT_STATE = {};
const CATEGORY_LABELS = {
    streaming: 'streaming',
    inVoice: 'chatting',
    online: 'online',
    offline: 'offline'
};
const NUMBER_STRINGS = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty one",
    "twenty two",
    "twenty three",
    "twenty four",
    "twenty five"
];
const styles = {
    offline: {
        color: "#aaa",
    },
    'offline-header': {
        color: "#aaa",
    }
};

const buildCategories = (categorizedData) => {
    const keysArray = Object.keys(categorizedData).filter((key) => categorizedData[key].length > 0);
    const categoryJSX = keysArray.map((category, i) => {
        let activitiesPerCategory = categorizedData[category].filter((user) => {
            return user.activities[0];
        }).map((user, j) => {
            return user.activities[0].toLowerCase();
        });
        activitiesPerCategory = [...new Set(activitiesPerCategory)];
        return (
            <div 
                key={i}
                style={styles[category] || {}}
            >
                <h3 style={styles[category + '-header'] || {}}>{ CATEGORY_LABELS[category] }</h3>
                { 
                    categorizedData[category].map((user, j) => {
                        return (
                            <span 
                                key={j}
                                style={styles[category + '-name'] || {}}
                            > 
                                { user.displayName }
                            </span>
                        );
                    }).reduce((prev, curr, i) => [prev, (<span className="deemphasized-text" > and </span>), curr])
                }
                <div className="deemphasized-text">
                    { activitiesPerCategory.length > 0 && 'playing ' + activitiesPerCategory.join(', ') }
                </div>
            </div>
        );
    });
    return (<>{ categoryJSX }</>);
}

const getData = async (setState, lastStartTime = 0) => {
    const startTime = Date.now();
    try {
        const res = await axios.get('http://207.153.21.155:1337/who_is_online');
        if(res && res.data){
            setState(processData(res.data));
        } else {
            setState(DEFAULT_STATE);
        }
    } catch(e) {
        console.log('Error getting who_is_online data', e);
        setState({
            ...DEFAULT_STATE,
            error: 'Failed to get data' 
        });
    }
    const now = Date.now();
    const elapsedTime = now - startTime;
    if(elapsedTime < REQUEST_INTERVAL){
        setTimeout(() => {
            getData(setState, startTime);
        }, REQUEST_INTERVAL - elapsedTime);
    } else {
        getData(setState, startTime);
    }
};

const App = () => {
    const [ state, setState ] = useState(DEFAULT_STATE);

    useEffect(() => {
        getData(setState);
    }, []);

    return (
        <div>
            <div className="background">
                { state.onlineUsers }
            </div>
            <div className="foreground">
                <h1 className="main-title">{ NUMBER_STRINGS[state.onlineUsers] || state.onlineUsers } gamers online</h1> 
                { state.categorizedMap && buildCategories(state.categorizedMap) }
            </div>
        </div>
    );
};

export default App;