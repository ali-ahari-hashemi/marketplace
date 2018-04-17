CREATE Database if not exists MarketPlace;
Use MarketPlace;

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
    time timestamp not null,
    userID int(11) not null,
    primary key (cardID),
    constraint userID foreign key (userID) references User (userID) );
Create Table SwipedCards (
	usersID int(11) not null,
    cardID int(11) not null,
    constraint usersID foreign key (usersID) references User (userID),
    constraint cardID foreign key (cardID) references Cards (cardID) );

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
