package cards;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AddCard {
	public static void main(String args[])
	{
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("Insert into Cards (userID, itemJson) values " +
					"(?, ?)");
			ps.setString(1, args[0]);
			String json = "{\n" + 
					"    \"itemForSale\": \"PS4\",\n" + 
					"    \"userName\": \"jeff\",\n" + 
					"    \"userID\": \"2\",\n" + 
					"    \"distance\": \"10 miles\",\n" + 
					"    \"price\": \"$200\",\n" + 
					"    \"imageURL\": \"https://i.imgur.com/ILlxG2j.jpg\"\n" + 
					"  }";
			//ps.setString(2, args[2]);
			ps.setString(2, json);
			ps.executeUpdate();
			
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

