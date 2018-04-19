package messages;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetMessages {

	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			int userid1 = Integer.parseInt(args[0]);
			int userid2 = Integer.parseInt(args[1]);
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			
			ps = conn.prepareStatement("Select messagesJson from Conversations where user_id_1 = ? AND user_id_2 = ?;");
			ps.setInt(1, userid1);
			ps.setInt(2, userid2);
			rs = ps.executeQuery();
			String jsontext = "";
			if (rs.next()) {
				jsontext = rs.getString("messagesJson");
			}
			if (jsontext == null) {
				jsontext = "";
			}
			 jsontext = "[" + jsontext + "]";
			
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
