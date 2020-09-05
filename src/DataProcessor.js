const filterUserActivities = (user) => {
    if(user && user.activities){
        return user.activities.filter((a) => {
            return a.indexOf('®') < 0 && a.indexOf('potify') < 0;
        });
    } else {
        return [];
    }
};

const filterActivities = (data) => {
    let newObj = {};
    Object.keys(data).forEach((displayName) => {
        let user = data[displayName];
        newObj[displayName] = {
            ...user,
            activities: filterUserActivities(user)
        };
    });
    return newObj;
};

const getOnlineUsers = (data) => {
    return Object.keys(data).filter((displayName) => {
        return data[displayName].status === 'online';
    }).length;
};

const getSortedList = (data) => {
    let list = Object.keys(data).map((displayName) => {
        let user = data[displayName];
        return {
            ...user,
            displayName
        };
    });
    list = list.sort((a, b) => {
        var nameA = a.displayName.toUpperCase();
        var nameB = b.displayName.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;       
           
    });
    return list;
};

const getCategorizedMap = (data, twitchStatuses) => {
    let categoriesObj = {
        streaming: [],
        inVoice: [],
        playing: [],
        online: [],
        offline: []
    };
    
    Object.keys(twitchStatuses).forEach((twitchUsername) => {
        if(twitchStatuses[twitchUsername].streaming){
            categoriesObj.streaming.push({ displayName: twitchUsername });
        }
    });

    Object.keys(data).forEach((displayName) => {
        let user = {
            ...data[displayName],
            displayName
        };
        if(user.status === 'online'){
            if(user.inVoice){
                if(user.streaming){
                    categoriesObj.streaming.push(user);
                } else {
                    categoriesObj.inVoice.push(user);
                }
            } else {
                categoriesObj.online.push(user);
            }
        } else {
            categoriesObj.offline.push(user);
        }
    });
    Object.keys(categoriesObj).forEach((key) => {
        categoriesObj[key] = categoriesObj[key].sort((a, b) => {
            var nameA = a.displayName.toUpperCase();
            var nameB = b.displayName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;       
        });
    });
    return categoriesObj;
};

export const processData = (discordUsers, twitchStatuses) => {
    const filteredData = filterActivities(discordUsers);
    const sortedList = getSortedList(filteredData);
    const onlineUsers = getOnlineUsers(filteredData);
    const categorizedMap = getCategorizedMap(filteredData, twitchStatuses);

    return {
        map: filteredData,
        categorizedMap: categorizedMap,
        list: sortedList,
        onlineUsers: onlineUsers,
    };
};

// const getSortedList = (data) => {
//     let list = Object.keys(data).map((displayName) => {
//         let user = data[displayName];
//         return {
//             ...user,
//             activities: filterUserActivities(user),
//             displayName
//         };
//     });
//     list = list.sort((a, b) => {
//         var nameA = a.displayName.toUpperCase();
//         var nameB = b.displayName.toUpperCase();
//         var activityA = a.activities[0];
//         var activityB = b.activities[0];
//         var inVoiceTest = b.inVoice = a.inVoice;
//         var onlineTest = ((b.status === 'online') - (a.status === 'online'));
//         var numberOfActivities = b.activities.length - a.activities.length;
//         if(inVoiceTest === 0){
//             if(onlineTest === 0){
//                 if(numberOfActivities !== 0){
//                     return numberOfActivities;                    
//                 }
//                 if(numberOfActivities !== 0){
//                     return numberOfActivities;                    
//                 }
//                 if (activityA < activityB) {
//                     return -1;
//                 }
//                 if (activityA > activityB) {
//                     return 1;
//                 }
//                 if (nameA < nameB) {
//                     return -1;
//                 }
//                 if (nameA > nameB) {
//                     return 1;
//                 }
//                 return 0;       
//             } else {
//                 return onlineTest;
//             }
//         } else {
//             return inVoiceTest;
//         }
//     });
//     return list;
// };