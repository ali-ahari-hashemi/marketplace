CREATE Database if not exists MarketPlace;
Use MarketPlace;

Drop Table if Exists Cards;
Drop Table if Exists User;

    Create Table User (
	userID int(11) not null AUTO_INCREMENT,
    username varchar(50) not null,
    primary key (userID) );

Create Table Cards (
	itemID int(11) not null AUTO_INCREMENT,
    name varchar(50) not null,
    imageLoc varchar(50) not null,
    potentialJson json,
    time timestamp not null,
    description text,
    price int(11),
    userID int(11) not null,
    primary key (itemID),
    constraint userID foreign key (userID) references User (userID) );
    
	INSERT INTO User (username) values ('Heermann'), ('Shah'), ('Chan'), ('Hashemi');
    
    Insert into Cards (name, imageLoc, time, description, price, userID) values 
    ('coffee table', '/imageStorer', current_timestamp(), 'A coffee table', 8, 2) ;