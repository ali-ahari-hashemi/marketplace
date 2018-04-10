	import java.io.BufferedReader;
	import java.io.FileOutputStream;
	import java.io.IOException;
	import java.io.InputStream;
	import java.io.InputStreamReader;
	import java.io.OutputStream;
	import java.io.PrintWriter;
	import java.net.ServerSocket;
	import java.net.Socket;
	import java.net.URL;
	import java.sql.Connection;
	import java.sql.DriverManager;
	import java.sql.PreparedStatement;
	import java.sql.ResultSet;
	import java.sql.SQLException;
	import java.util.Scanner;

	public class PretendServer {
		private static Connection conn = null;
		private static PreparedStatement ps = null;
		private static ResultSet rs = null;
		private static ServerSocket ss;
		
		
		
		public static void connect(ServerSocket ss)
		{
				while (true)
				{
					try {
						System.out.println("before");
						Socket s = ss.accept();
						System.out.println("after");
						BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
						PrintWriter pw = new PrintWriter(s.getOutputStream());
						AppHandler ah = new AppHandler(pw, br, conn);
					}
					catch (IOException e)
					{
						System.out.println("connect error " + e.getMessage());
					}
					catch (Exception e)
					{
						System.out.println("Server error " + e.getMessage());
					}
					
			}
			
		}
		public static void main(String [] args)
		{
			try
			{
				ss = new ServerSocket(6789);
				Class.forName("com.mysql.jdbc.Driver");
				conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
					//never actually imported, just pretending its there at compile time
					//needs to be there at runtime
				connect(ss);
			}
			catch (SQLException e)
			{
				System.out.println("SQL Error " + e.getMessage());
			}
			catch (ClassNotFoundException e)
			{
				System.out.println("Class Error " + e.getMessage());
			}
			catch (IOException e)
			{
				System.out.println("Server error " + e.getMessage());
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
					System.out.println("Closing Error " + e.getMessage());
				}
			}
		}

}
