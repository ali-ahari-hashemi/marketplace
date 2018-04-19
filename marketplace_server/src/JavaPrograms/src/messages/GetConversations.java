package messages;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//input userid
//output json of conversations
public class GetConversations {

	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=a&useSSL=false");
			
			int user_id = Integer.parseInt(args[0]);
			//get all usernames of people user_id_1 is chatting with.
			
			//**********only get conversations when user_id_1 is equal to user_id!!!! because now there are two convos for each!
			//**********send back usernames and cardNames!
			
			psName = conn.prepareStatement("SELECT username FROM User WHERE userID = ?");
			ps.setInt(1, user_id);
			ps.setInt(2, user_id);

			//then get all the usernames of all these ids and store them in a json list of objects with ids and corresponding names
			//**********AND ITEMS??
			
			/*Select username from User where userID in (Select CASE
					WHEN user_id_1 = 1 THEN user_id_2
				    WHEN user_id_2 = 1 THEN user_id_1
				    ELSE 'null'
				    END
				From Conversations)*/ //this is fucking gold
			String jsontext = "";
			
			String jsontext += "[";
			
			String jsontext += "{";
			String jsontext += "\"user2ID\": " + 2,
			String jsontext += "\"username\": " + "name of other person",
			         cardID: 1,
			         cardName: "name of card"
			String jsontext += "}";
			
			String jsontext += "]";
			
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
				 if (rs != null)
					 rs.close();
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
