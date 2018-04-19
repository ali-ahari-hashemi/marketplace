package messages;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//input userid
//output json of conversations
public class GetConversations {

	public static void main(String [] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			int user_id = Integer.parseInt(args[0]);
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			
			ps = conn.prepareStatement("Select u.username, con.user_id_2, c.itemJson" + 
					"From Conversations con, Cards c, User u " + 
					"WHERE user_id_1 = ? AND c.cardID = con.cardID AND u.userID = con.user_id_2;");
			ps.setInt(1, user_id);
			rs = ps.executeQuery();

			String jsontext = "[";
			while (rs.next())
			{
				String username = rs.getString("username");
				int id = rs.getInt("user_id_2");
				Object itemJson = rs.getObject("itemJson");
				jsontext += "{\"user2ID\":" + id;
				jsontext += "\"username\":" + username;
				jsontext += "\"card\":";
				jsontext += itemJson;
				jsontext += "},";
				
			}
			jsontext = jsontext.substring(0,jsontext.length() - 1);
			jsontext += "]";
			
			System.out.println(jsontext);
			
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
