package authentication;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SignUp {

	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {//0-username, 1- password, 2-first name, 3-last name
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("Select count(userID) as count from User where 1=1");
			rs = ps.executeQuery();
			int newID = -1;

			if (rs.next())
			{
				newID = rs.getInt("count") + 1;
				//System.out.println(cardID);
			}
			
			ps = conn.prepareStatement("Select userID from User where" +
					" username=?");
			ps.setString(1, args[0]);
			String json = "{ \n \"userID\": \"" + newID + "\",";
			json += "\n \"username\": \"" + args[0] + "\",";
			json += "\n \"firstName\": \"" + args[2] + "\",";
			json += "\n \"lastName\": \"" + args[3] + "\",";
			json += "\n \"bio\": \"Add a bio!\"\n}";
			System.out.println(json);
			rs = ps.executeQuery();
			if (rs.next())
			{
				int userID = rs.getInt("userID");
				if (userID > 0)
				{
					System.out.println("-1");
				}
				else
				{
					ps = conn.prepareStatement("Insert into User (username, password, userJson) values (?, ?, ?)");
					ps.setString(1, args[0]);
					ps.setString(2, args[1]);
					ps.setObject(3,  json);
					ps.executeUpdate();
					/*ps = conn.prepareStatement("Select userID from User where" +
							" username=? and password=?");
					ps.setString(1, args[0]);
					ps.setString(2, args[1]);
					rs = ps.executeQuery();
					rs.next();
					userID = rs.getInt("userID");
					if (userID > 0)
					{
						System.out.println(userID);
					}
					else
					{
						System.err.println("register error");
					}*/
					System.out.println(newID);
				}
			}
			else
			{
				ps = conn.prepareStatement("Insert into User (username, password, userJson) values (?, ?, ?)");
				ps.setString(1, args[0]);
				ps.setString(2, args[1]);
				ps.setObject(3,  json);
				ps.executeUpdate();
				/*ps = conn.prepareStatement("Select userID from User where" +
						" username=? and password=?");
				ps.setString(1, args[0]);
				ps.setString(2, args[1]);
				rs = ps.executeQuery();
				rs.next();
				int userID = rs.getInt("userID");
				if (userID > 0)
				{
					System.out.println(userID);
				}
				else
				{
					System.err.println("register error");
				}		*/
				System.out.println(newID);
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
