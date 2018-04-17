import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetCards {
	public static void main(String args[])
	{
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=wptfvTNc3s_*&useSSL=false");
			ps = conn.prepareStatement("SELECT itemJson FROM Cards where userID !=? ORDER BY RAND()");
			int user = Integer.parseInt(args[0]);
			ps.setInt(1, user);
			rs = ps.executeQuery();
			String jsonOut = "[";
			while (rs.next())
			{
				Object item = rs.getObject("itemJson");
				if (item == null)
				{
					//System.err.println("couldn't find json");
				}
				else
				{
					jsonOut += item;
					jsonOut += ",";
				}
			}
			jsonOut = jsonOut.substring(0, jsonOut.length() - 1);
			jsonOut += "]";
			System.out.println(jsonOut);

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
