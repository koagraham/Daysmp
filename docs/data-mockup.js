/**
user table
id: primary serial key
name: string 
password: varchar
*/
[
    {id: 1, name: "daybreaker", password: '*******'},
    {id: 2, name: "not_important", password: '****'}
]

/**
post table
id: primary serial key
title: string
category: [General, PvP, Help, Announcement(admin users only), Off Topic]
content: text
author: string FROM user table
likes: integer
comments: integer
*/
[
    {id: 1, title: "Why the Daybreaker SMP is awesome", category: "General",
    content: "The Daybreaker SMP is awesome! From it's active community to reliable server uptime",
    author: "daybreaker",
    likes: 11, comments: 14
    },
    {id: 2, title: "Looking to start a war", category: "PvP",
    content: "Title. Me and my friends have full netherite and want to do battle", 
    author: "not_important", 
    likes: 3, comments: 15
    },
    {id: 3, title: "Staff Applications", category: "Announcement",
    content: "Now accepting moderator applications! Will be open until July 10th", 
    author: "daybreaker",
    likes: 10, comments: 2
    }
]

/**
comment table
id: primary serial key
parent: string FROM post table
content: text
author: string FROM user table
likes: integer
*/

[
    {id: 1, parent: "Why the Daybreaker SMP is awesome",
    content: "No duh its the greatest thing since sliced bread",
    author: "not_important", likes: 5
    },
    {id: 4, parent: "Looking to start a war",
    content: "We would win by a landslide FYI",
    author: "not_important", likes: 2
    }
]