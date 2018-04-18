package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UpdateBio {

	public static void main(String args[])
	{
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			//0 - userID 1 - User name 2- first name 3 - last name 4+ - bio
			ps = conn.prepareStatement("Update User set userJson = ? where userID =?");
			String json = "";
			for (int i = 1; i < args.length; i++)
			{
				json += args[i];
			}
			/*String json = "{ \n \"userID\": \"" + args[0] + "\",";
			json += "\n \"username\": \"" + args[1] + "\",";
			json += "\n \"firstName\": \"" + args[2] + "\",";
			json += "\n \"lastname\": \"" + args[3] + "\",";
			json += "\n \"Bio\": \"";
			for (int i = 4; i < args.length; i++)
			{
				json += args[i] + " ";
			}
			json += "\"\n}";*/
			System.out.println(json);
			ps.setObject(1, json);
			int user = Integer.parseInt(args[0]);
			ps.setInt(2, user);
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
