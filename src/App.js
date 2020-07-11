import React, { useState, useEffect } from "react";
import axios from 'axios';
import q from 'q';

const REQUEST_INTERVAL = 3000;
const DEFAULT_STATE = { map: {}, list: [], error: null };

const getData = async (setState, lastStartTime = 0) => {
    const startTime = Date.now();
    try {
        const res = await axios.get('http://207.153.21.155:1337/who_is_online');
        if(res && res.data){
            let onlineUsers = 0;
            let list = Object.keys(res.data).map((displayName) => {
                let user = res.data[displayName];
                if(user.status === 'online'){
                    onlineUsers += 1;
                }
                return {
                    ...user,
                    activities: user.activities.filter((a) => a.indexOf('®') < 0 && a.indexOf('otify') < 0),
                    displayName
                };
            });
            list = list.sort((a, b) => {
                var nameA = a.displayName.toUpperCase();
                var nameB = b.displayName.toUpperCase();
                var activityA = a.activities[0];
                var activityB = b.activities[0];
                var onlineTest = ((b.status === 'online') - (a.status === 'online'));
                var numberOfActivities = b.activities.length - a.activities.length;
                if(onlineTest === 0){
                    if(numberOfActivities !== 0){
                        return numberOfActivities;                    
                    }
                    if(numberOfActivities !== 0){
                        return numberOfActivities;                    
                    }
                    if (activityA < activityB) {
                        return -1;
                    }
                    if (activityA > activityB) {
                        return 1;
                    }
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;       
                } else {
                    return onlineTest;
                }
            });
            setState({                
                map: res.data,
                list,
                onlineUsers 
            });
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
            <div style={{ color: 'blue'}}>
                { state.onlineUsers } gamers gaming
            </div>
            { 
                state.list.map((user, i) => {
                    return (
                        <div key={i} style={{ color: user.status === 'online' ? 'green' : 'inherit'}}>
                            { user.displayName }
                            { user.activities.length > 0 && 
                                <>
                                    <span>
                                        { " is playing " }
                                    </span>
                                    <span style={{ color: 'blue'}}>
                                        { user.activities.join(', ') }
                                    </span>
                                </>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default App;