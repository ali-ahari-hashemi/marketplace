CREATE Database if not exists MarketPlace;
Use MarketPlace;


Drop Table if Exists Conversations;
Drop Table if Exists SwipedCards;
Drop Table if Exists Cards;
Drop Table if Exists User;


Create Table User (
    userID int(11) not null AUTO_INCREMENT,
    username varchar(50) not null,
    password varchar(50) not null,
    userJson json,
    primary key (userID) );

Create Table Cards (
    cardID int(11) not null AUTO_INCREMENT,
    itemJson json,
    time timestamp not null Default current_timestamp(),
    userID int(11) not null,
    primary key (cardID),
    constraint userID foreign key (userID) references User (userID) );

Create Table SwipedCards (
    usersID int(11) not null,
    cardID int(11) not null,
    constraint usersID foreign key (usersID) references User (userID),
    constraint cardID foreign key (cardID) references Cards (cardID) );

Create Table Conversations (
    user_id_1 int(11) not null,
    user_id_2 int(11) not null,
    cardID int(11) not null,
    cardName varchar(50) not null,
    messagesJson text,
    numberOfMessages int(11),
    time timestamp not null Default current_timestamp(),
    constraint user_id_1 foreign key (user_id_1) references User (userID),
    constraint user_id_2 foreign key (user_id_2) references User (userID) );


    INSERT INTO User (username, password) values ('Heermann', 'Andrew'), ('Shah', 'Aditya' ), ('Chan', 'Allison'), ('Hashemi', 'Ali');

    Insert into Cards (itemJson, time, userID) values
    ('{
    "itemForSale": "Car",
    "userName": "jessica",
    "userID": "3",
    "distance": "3 Miles",
    "price": "$5,000",
    "imageURL": "https://i.imgur.com/nudswXu.jpg"
  }', current_timestamp(), 2), ('{
    "itemForSale": "Unused Iphone X",
    "userName": "bob",
    "userID": "1",
    "distance": ".5 Miles",
    "price": "$500",
    "imageURL": "https://i.imgur.com/zbh721x.jpg"
  }',current_timestamp(), 3), ('{
    "itemForSale": "PS4",
    "userName": "jeff",
    "userID": "2",
    "distance": "10 miles",
    "price": "$200",
    "imageURL": "https://i.imgur.com/ILlxG2j.jpg"
  }', current_timestamp(), 1) ;

    INSERT INTO SwipedCards (usersID, cardID) values (1, 1);

    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 3, 1, 'Car');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (3, 1, 1, 'Car');

    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 2, 3, 'PS4');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (2, 1, 3, 'PS4');
    
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (2, 1, 2, 'Unused Iphone X');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 2, 2, 'Unused Iphone X');

