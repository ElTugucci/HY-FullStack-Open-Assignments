CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Edsger W. Dijkstra', 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', 'Go To Statement Considered Harmful', 5 );
insert into blogs (author, url, title ) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 'First class tests');

select * from blogs;
