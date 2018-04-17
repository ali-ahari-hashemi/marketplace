import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AppHandler extends Thread{
	PrintWriter pw;
	BufferedReader br;
	PreparedStatement ps;
	Connection conn = null;
	ResultSet rs = null;
	public AppHandler(PrintWriter pw, BufferedReader br, Connection conn)
	{
		this.pw = pw;
		this.br = br;
		this.conn = conn;
		this.start();
	}
	public void removeItem(PrintWriter pw, int item)
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
			ps = conn.prepareStatement("DELETE FROM Cards where itemID = ?");
			ps.setInt(1, item);
			ps.execute();
		}
		catch (SQLException e)
		{
			System.out.println("SQL Error " + e.getMessage());
		}
	}
	public void getItems(int user, PrintWriter pw)
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
	public void run()
	{
		try
		{
			while (true)
			{
				pw.println("Do you want to add an item or get them?\n1) Add an item\n2) Remove an item\n3) Print Items");
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
				else if (c == 2)
				{
					pw.println("Which item are you removing");
					pw.flush();
					String name = br.readLine();
					int itemNum = -1;
					ps = conn.prepareStatement("Select itemID from Cards where name=?");
					ps.setString(1, name);
					rs = ps.executeQuery();
					if (rs.next())
					{
						itemNum = rs.getInt("itemID");
					}
					removeItem(pw, itemNum);
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
}
