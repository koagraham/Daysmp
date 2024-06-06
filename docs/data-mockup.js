/**
user table
id: primary serial key
name: string 
email: string
password: hashed varchar
*/
[
    {id: 1, name: "daybreaker", email: "daybreaker@gmail.com", password: '*******'},
    {id: 2, name: "not_important", email: "notimportant177@gmail.com", password: '****'}
]

/**
post table
id: primary serial key
title: string
category: [General, PvP, Help, Announcement(admin users only), Off Topic]
body: text
userID: id FROM user table
*/
[
    {id: 1, title: "Why the Daybreaker SMP is awesome", category: "General",
    body: "The Daybreaker SMP is awesome! From it's active community to reliable server uptime",
    userID: 1
    },
    {id: 2, title: "Looking to start a war", category: "PvP",
    body: "Title. Me and my friends have full netherite and want to do battle", 
    userID: 2, 
    likes: 3, comments: 15
    },
    {id: 3, title: "Staff Applications", category: "Announcement",
    body: "Now accepting moderator applications! Will be open until July 10th", 
    userID: "daybreaker"
    }
]

/**
post like table
id: primary serial key
postID: id FROM post table
userID: id FROM user table
*/
[
    {id: 1, postID: 1, userID: 2},
    {id: 2, postID: 2, userID: 3}
]


/**
comment table
id: primary serial key
postID: id FROM post table
body: text
userID: id FROM user table

switch author and title to userID and postID
*/

[
    {id: 1, postID: 1,
    body: "No duh its the greatest thing since sliced bread",
    userID: 2
    },
    {id: 4, postID: 2,
    body: "We would win by a landslide FYI",
    userID: 2
    }
]

/**
comment like table
id: primary serial key
commentID: id FROM post table
userID: id FROM user table
*/
[
    {id: 1, commentID: 1, userID: 2},
    {id: 2, commentID: 2, userID: 3}
]