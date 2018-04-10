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
		public static void removeItem(PrintWriter pw, int item)
		{
			try {
				ps = conn.prepareStatement("Select name FROM Cards where itemID =?");
				//random is slow, supposedly a different way, with extra work
				ps.setInt(1, item);
				rs = ps.executeQuery();
				while (rs.next())
				{
					String itemName = rs.getString("name");
					pw.println(itemName + " was removed");
					pw.flush();
				}
				rs.close();
				ps = conn.prepareStatement("REMOVE * FROM Cards where itemID = ?");
				ps.setInt(1, item);
				ps.execute();
			}
			catch (SQLException e)
			{
				System.out.println("SQL Error " + e.getMessage());
			}
		}
		public static void getItems(int user, PrintWriter pw)
		{//actually prints items
			try {
				ps = conn.prepareStatement("SELECT name, description, price FROM Cards where userID !=? ORDER BY RAND()");
				//random is slow, supposedly a different way, with extra work
				ps.setInt(1, user);
				rs = ps.executeQuery();
				while (rs.next())
				{
					String item = rs.getString("name");
					String description = rs.getString("description");
					int price = rs.getInt("price");
					pw.println(item + " with description " + description + " is $" + price);
					pw.flush();
				}
				
			}
			catch (SQLException e)
			{
				System.out.println("SQL Error " + e.getMessage());
			}
		}
		public static void loop(PrintWriter pw, BufferedReader br)
		{
			try
			{
				while (true)
				{
					pw.println("Do you want to add an item or get them?\n1) Add an item\n2) Print Items");
					pw.flush();
					String choice = br.readLine();
					int c = Integer.parseInt(choice);
					if (c == 1)
					{
						pw.println("What is it called");
						pw.flush();
						String name = br.readLine();
						pw.println("Who is the user");
						pw.flush();
						String username = br.readLine();
						ps = conn.prepareStatement("Select userID from User where username = ?");
						ps.setString(1,  username);
						int userID = -1;
						rs = ps.executeQuery();
						if (rs.next()) {
							userID = rs.getInt("userID");
						}
						rs.close();
						pw.println("Give a description");
						pw.flush();
						String descript = "";
						descript = br.readLine();
						pw.println("How much does it cost?");
						pw.flush();
						String cost = br.readLine();
						int price = Integer.parseInt(cost);
						String loc = username + "_" + name;
						ps = conn.prepareStatement("Insert into Cards (name, imageLoc, description, price, userID) values " +
									"(?, ?, ?, ?, ?)");
						ps.setString(1, name);
						ps.setString(2, loc);
						ps.setString(3, descript);
						ps.setInt(4, price);
						ps.setInt(5,  userID);
						ps.executeUpdate();
						pw.println("What is the url?");
						pw.flush();
						String imageURL = br.readLine();
						try
						{
						URL url = new URL(imageURL);
					    InputStream is = url.openStream();
					    OutputStream os = new FileOutputStream(loc);
		
					    byte[] b = new byte[2048];
					    int length;
		
					    while ((length = is.read(b)) != -1) {
					        os.write(b, 0, length);
					    }
					    
					    is.close();
					    os.close();
						}
						catch (IOException e)
						{
							System.out.println("image error " + e.getLocalizedMessage());
						}
					}
					else
					{
						pw.println("Who is the user");
						pw.flush();
						String username = br.readLine();
						ps = conn.prepareStatement("Select userID from User where username = ?");
						ps.setString(1,  username);
						int userID = -1;
						rs = ps.executeQuery();
						if (rs.next()) {
							userID = rs.getInt("userID");
						}
						rs.close();
						getItems(userID, pw);
					}
				}
			}
				catch (SQLException e)
				{
					System.out.println("SQL Error " + e.getMessage());
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
		public static void connect(ServerSocket ss)
		{
				while (true)
				{
					try {
						Socket s = ss.accept();
						BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
						PrintWriter pw = new PrintWriter(s.getOutputStream());
						loop(pw, br);
					}
					catch (IOException e)
					{
						System.out.println("connect error " + e.getMessage());
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
