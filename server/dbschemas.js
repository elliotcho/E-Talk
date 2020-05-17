const users={
    id: "int, auto increment, not null, primary key",  
    email: "varchar(50), not null, unique",
    password: "varchar(50), not null",
    firstName: "varchar(50), not null",
    lastName:  "varchar(50), not null",
}

const posts={
    id="int, auto increment, not null, primary key",
    email: "varchar(50), not null, unique",
    firstName: "varchar(50), not null",
    lastName:  "varchar(50), not null",
    date: "datetime, not null",
    content: "text(60 000) not null"
}

const likes={
    likeId:"int, auto increment, not null, primary key",
    postId:"int, not null, foreign key",
    email: "varchar(50), not null",
    firstName: "varchar(50) not null",
    lastName: "varchar(50) not null"
}//cascade delete