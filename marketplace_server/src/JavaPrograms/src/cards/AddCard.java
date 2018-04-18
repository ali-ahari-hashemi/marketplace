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
		try {//insert, query, update
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("Select count(cardID) as count from Cards where 1=1");
			rs = ps.executeQuery();
			int cardID = -1;

			if (rs.next())
			{
				cardID = rs.getInt("count") + 1;
				//System.out.println(cardID);
			}
			ps = conn.prepareStatement("Insert into Cards (userID, itemJson) values " +
					"(?, ?)");

			ps.setString(1, args[0]);
			
			//0-userID
			String json = "{ \n \"cardID\": \"" + cardID + "\",";
			json += "\n \"itemForSale\": \"" + args[1] + "\",";
			json += "\n \"firstName\": \"" + args[2] + "\",";
			json += "\n \"lastname\": \"" + args[3] + "\",";
			json += "\n \"Bio\": \"";
			for (int i = 4; i < args.length; i++)
			{
				//System.out.println(args[i]);
				json += args[i] + " ";
			}
			json += "\"\n}";
			//System.out.println(json);
			ps.setObject(2, json);
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

