https://docs.google.com/document/d/1l4wHiT6toAxyOprStzPGpdJZlDIqghM20EJbX1NtkAU/edit

Overview
A full-stack website for a minecraft server that provides a homepage with an overview/description of the server, a forum page to create, view and comment on forum posts, a page to view server statistics and status and promote my social media channels, a rules and moderation page to view server rules and policies and a help and support page with a FAQ and contact us. 

Resources
Project Syllabus
API list

Notes for dungeon masters
I did more than 3 iterations but this is just for me so I can have little checkpoint objectives. Project should be completely finished around iteration 4

Component Hierarchy
Root
>server
>>server.js
>src
>>components
>>>Home.jsx
>>>Rules.jsx
>>>Server.jsx
>>>Forum.jsx
>>>Help.jsx
>>>Login.jsx
>>>Logout.jsx
>>>forum
>>>>CreateForumPostButton.jsx
>>>>CommentForumPostButton.jsx
>>App.jsx
>>main.jsx
>utils
index.html

Iteration 1
Features
Raw(no css) barren(little to no content) pages with a homepage that links to(forum, rules & moderation, server, help & support). All these pages will link back to each via navbar
To-do
Create root folder
Complete README.md and create docs folder
Complete docs/data-mockup.js and docs/component-hierarchy.md
Complete docs/roadmap.md
Create index.html, Main.jsx and App.jsx
Create src folder and component hierarchy
Use vite to build package.json and package-lock.json
Install dependencies
Setup index.html, App.jsx, Main.jsx
Create server folder
Setup server.js
Initialize github repository and commit initial
Setup pages(home, forum, rules & moderation, server, help and support) and components
Establish links/setup routes
Commit iteration 1

Iteration 2
Features
Database implemented containing user table(id, username), forum table(id, author), post table(id, parent)
Login/logout pages implemented(minecraft username only)
Restrict forum to authorized accounts(logged in)
Welcome user 
To-do
Setup SQL Database
Complete login and logout pages
Complete login and logout routes
Update forum route
Commit iteration 2

Iteration 3
Features
Pages filled with internal content and styled with Tailwind CSS
To-do
Setup and install Tailwind
Add internal content(text, images) to pages
Style pages according to UI Mockup
Commit iteration 3

Iteration 4
Features
Forum working and implemented. You can create a new forum post or comment on an existing one
To-do
A lot

Iteration 5
Features
External content added to server -> stats displaying minecraft server’s status, current players, 30 day average players, total players -> link or miniature version of latest youtube video -> link or miniature version of current twitch stream
Add a site admin user system so admin users can delete forum posts
Setup domain/website and make it live
To-do
API calls???
