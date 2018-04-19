CREATE Database if not exists MarketPlace;
Use MarketPlace;

Drop Table if exists Conversations;
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
    buyerID int(11) not null,
    sellerID int(11) not null,
    cardID int(11) not null,
    messagesJson json,
    time timestamp not null default current_timestamp,
    constraint buyerID foreign key (buyerID) references User (userID),
    constraint sellerID foreign key (sellerID) references User (userID)
);
 
	INSERT INTO User (username, password, userJson) values 
    ('Heermann', 'Andrew', '{
    "userID": "1",
    "username":"Heermann",
    "firstName":"Andrew",
    "lastName":"Heermann",
    "bio":"Hello World"
    }'), 
    ('Shah', 'Aditya', '{
    "userID": "2",
    "username":"Shah",
    "firstName":"Adi",
    "lastName":"Shah",
    "bio":"Hello World"
    }' ), 
    ('Chan', 'Allison', '{
    "userID": "3",
    "username":"Chan",
    "firstName":"Allison",
    "lastName":"Chan",
    "bio":"Hello World"
    }'), 
    ('Hashemi', 'Ali', '{
    "userID": "4",
    "username":"Hashemi",
    "firstName":"Ali",
    "lastName":"Hashemi",
    "bio":"Hello World"
    }');
    
    Insert into Cards (itemJson, userID) values 
    ('{
    "itemForSale": "Car",
    "userName": "jessica",
    "userID": "3",
    "distance": "3 Miles",
    "price": "$5,000",
    "imageURL": "https://i.imgur.com/nudswXu.jpg"
  }', 3), ('{
    "itemForSale": "Unused Iphone X",
    "userName": "bob",
    "userID": "1",
    "distance": ".5 Miles",
    "price": "$500",
    "imageURL": "https://i.imgur.com/zbh721x.jpg"
  }', 1), ('{
    "itemForSale": "PS4",
    "userName": "jeff",
    "userID": "2",
    "distance": "10 miles",
    "price": "$200",
    "imageURL": "https://i.imgur.com/ILlxG2j.jpg"
  }', 2) ;
    
    INSERT INTO SwipedCards (usersID, cardID) values (1, 1);
    INSERT INTO Conversations (buyerID, sellerID, cardID) values (1, 2, 1);