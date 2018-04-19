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
    messagesJson text,
    numberOfMessages int(11),
    time timestamp not null Default current_timestamp(),
    constraint user_id_1 foreign key (user_id_1) references User (userID),
    constraint user_id_2 foreign key (user_id_2) references User (userID) );

INSERT INTO User (username, password, userJson) values 
    ('Heermann', 'Andrew', '{
    "userID": "1",
    "username": "Heermann",
    "firstName": "Andrew",
    "lastName": "Heermann",
    "bio": "Hello World"
    }'), 
    ('Shah', 'Aditya', '{
    "userID": "2",
    "username": "Shah",
    "firstName": "Adi",
    "lastName": "Shah",
    "bio": "Hello World"
    }' ), 
    ('Chan', 'Allison', '{
    "userID": "3",
    "username": "Chan",
    "firstName": "Allison",
    "lastName": "Chan",
    "bio": "Hello World"
    }'), 
    ('Hashemi', 'Ali', '{
    "userID": "4",
    "username": "Hashemi",
    "firstName": "Ali",
    "lastName": "Hashemi",
    "bio": "Hello World"
    }');
    


    Insert into Cards (itemJson, userID) values 
    ('{
    "cardID": "1",
    "itemForSale": "Car",
    "userName": "Chan",
    "userID": "3",
    "distance": "3 miles",
    "price": "$5,000",
    "imageURL": "https://i.imgur.com/nudswXu.jpg"
  }', 3), ('{
	"cardID": "2",
    "itemForSale": "Unused Iphone X",
    "userName": "Heermann",
    "userID": "1",
    "distance": ".5 miles",
    "price": "$500",
    "imageURL": "https://i.imgur.com/zbh721x.jpg"
  }', 1), ('{
	"cardID": "3",
    "itemForSale": "PS4",
    "userName": "Shah",
    "userID": "2",
    "distance": "10 miles",
    "price": "$200",
    "imageURL": "https://i.imgur.com/ILlxG2j.jpg"
  }', 2),
  ('{
	"cardID": "4",
    "itemForSale": "Chair",
    "userName": "Hashemi",
    "userID": "4",
    "distance": "1 miles",
    "price": "$1",
    "imageURL": "https://i.imgur.com/aWkpX3W.png"
  }', 4),
  ('{
	"cardID": "5",
    "itemForSale": "Degree",
    "userName": "Chan",
    "userID": "3",
    "distance": "2 miles",
    "price": "$300,000",
    "imageURL": "http://www.fakediploma58.com/data/attachment/upload/Image/20160330073651102.jpg"
  }', 3),
  ('{
	"cardID": "6",
    "itemForSale": "Skateboard",
    "userName": "Heermann",
    "userID": "1",
    "distance": "3 miles",
    "price": "$50",
    "imageURL": "https://cdn.skatepro.com/product/440/enuff-pyro-ii-kids-skateboard-nl.jpg"
  }', 1),
  ('{
	"cardID": "7",
    "itemForSale": "20 dollars",
    "userName": "Shah",
    "userID": "2",
    "distance": "7 miles",
    "price": "$21",
    "imageURL": "https://www.leftovercurrency.com/wp-content/uploads/2016/11/20-american-dollars-banknote-obverse-1-768x322.jpg"
  }', 2),
  ('{
  "cardID": "8",
    "itemForSale": "Laptop",
    "userName": "Hashemi",
    "userID": "4",
    "distance": "3 miles",
    "price": "$200",
    "imageURL": "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05530001.png"
  }', 4),
  ('{
	"cardID": "9",
    "itemForSale": "Couch",
    "userName": "Chan",
    "userID": "3",
    "distance": "20 miles",
    "price": "$125",
    "imageURL": "https://cdn-images.article.com/products/SKU312E/2890x1500/image29451.jpg"
  }', 3),
  ('{
	"cardID": "10",
    "itemForSale": "House",
    "userName": "Shah",
    "userID": "2",
    "distance": "15 miles",
    "price": "$500,000",
    "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ranch_style_home_in_Salinas%2C_California.JPG/440px-Ranch_style_home_in_Salinas%2C_California.JPG"
  }', 2),
  ('{
	"cardID": "11",
    "itemForSale": "A in 201",
    "userName": "Heermann",
    "userID": "1",
    "distance": "0 miles",
    "price": "$1,000,000",
    "imageURL": "http://mediad.publicbroadcasting.net/p/wual/files/styles/medium/public/201301/MH900439513.JPG"
  }', 1),
  ('{
	"cardID": "12",
    "itemForSale": "Sweatshirt",
    "userName": "Hashemi",
    "userID": "4",
    "distance": "2 miles",
    "price": "$40",
    "imageURL": "http://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages/_3055000/ff_3055604_full.jpg"
  }', 4)
  
  ;
    
 
	

    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 3, 1, 'Car');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (3, 1, 1, 'Car');

<<<<<<< HEAD
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 3, 1, 'Car');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (3, 1, 1, 'Car');

=======
>>>>>>> master
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 2, 3, 'PS4');
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (2, 1, 3, 'PS4');
    
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (2, 1, 2, 'Unused Iphone X');
<<<<<<< HEAD
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 2, 2, 'Unused Iphone X');

=======
    INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (1, 2, 2, 'Unused Iphone X');
>>>>>>> master
