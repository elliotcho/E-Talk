const users={
    id: "int, auto increment, not null, primary key",  
    email: "varchar(50), not null, unique",
    password: "varchar(50), not null",
    firstName: "varchar(50), not null",
    lastName:  "varchar(50), not null",
}

//foreign key (email) references users(email) on delete cascade
const posts={
    id="int, auto increment, not null, primary key",
    email: "varchar(50), not null, unique",
    firstName: "varchar(50), not null",
    lastName:  "varchar(50), not null",
    date: "datetime, not null",
    content: "text(60 000) not null"
}

//foreign key(postId) references posts(id) on delete cascade
const likes={
    likeId:"int, auto increment, not null, primary key",
    postId:"int, not null",
    email: "varchar(50), not null",
    firstName: "varchar(50) not null",
    lastName: "varchar(50) not null"
}

//foreign key(postId) references posts(id) on delete cascade
const comments={
    commentId:"int, auto increment, not null, primary key",
    postId:"int, not null",
    email: "varchar(50), not null",
    firstName: "varchar(50) not null",
    lastName: "varchar(50) not null"
}