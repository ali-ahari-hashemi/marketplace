package cards;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

//input userID, cardID, and swipe (0 for left or 1 for right)
//update user1 swiped on card ID
//if right swipe, create a conversation between current user (buyerID) and seller (sellerID)
public class Swipe {

	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		PreparedStatement ps2 = null;
		try {
			int user_id = Integer.parseInt(args[0]); //swiper
			int user2_id = Integer.parseInt(args[1]);//card owner
			int card_id = Integer.parseInt(args[2]);
			int swipe = Integer.parseInt(args[3]);
			String cardName = args[4];
			//add card/user_id to swipedcards database
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("Insert into SwipedCards (userID, cardID) values " +
					"(?, ?)");
			ps.setInt(1, user_id);
			ps.setInt(2, card_id);
			ps.executeUpdate();
			if (swipe == 1) { //if right swipe
				try {
					//create two inverse conversations about item with item ID and item name
					ps2 = conn.prepareStatement(" INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (?, ?, ?, ?);"
							+ " INSERT INTO Conversations (user_id_1, user_id_2, cardID, cardName) values (?, ?, ?, ?)");
					ps2.setInt(1, user_id);
					ps2.setInt(2, user2_id);
					ps2.setInt(3, card_id);
					ps2.setString(4, cardName);
					
					ps2.setInt(5, user_id);
					ps2.setInt(6, user2_id);
					ps2.setInt(7, card_id);
					ps2.setString(8, cardName);
					
					ps2.executeUpdate();
				}catch (SQLException e)
				{
					System.err.println("SQL Error " + e.getMessage());
				}
				finally {
					try 
					{
						 if (ps2 != null)
							 ps2.close();		
					}
					catch (SQLException e)
					{
						System.err.println("Closing Error " + e.getMessage());
					}
				}
				
			}
		}
		catch (SQLException e)
		{
			System.err.println("SQL Error " + e.getMessage());
		}
		catch (ClassNotFoundException e)
		{
			System.err.println("Class Not found " + e.getMessage());
		}
		finally {
			try 
			{
				 if (ps != null)
					 ps.close();
				 if (conn != null)
					 conn.close();			
			}
			catch (SQLException e)
			{
				System.err.println("Closing Error " + e.getMessage());
			}
		}

	}

}
