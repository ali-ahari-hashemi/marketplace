package user;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UpdatePass {

	public static void main(String args[])
	{
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("Update User set password = ? FROM User where userID =?");
			int user = Integer.parseInt(args[0]);
			ps.setInt(2, user);
			ps.setInt(1, Integer.parseInt(args[1]));
			rs = ps.executeQuery();
			
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
