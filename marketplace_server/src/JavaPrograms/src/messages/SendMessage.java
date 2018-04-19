package messages;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SendMessage {

	public static void main(String[] args) {
		Connection conn = null;
		PreparedStatement ps = null;
		PreparedStatement psName = null;
		PreparedStatement psNumberIncrement = null;
		PreparedStatement psGetNumber = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/MarketPlace?user=root&password=root&useSSL=false");
			
			int new_message_id = 0;
			String name = "";
			
			//gets all the information from command line
			int senderID = Integer.parseInt(args[0]);
			int receiverID = Integer.parseInt(args[1]);
			int cardID = Integer.parseInt(args[2]);
			String timestamp = args[3];
			
			String message = "";
			
			//get message
			message += args[4];
			for (int i = 5; i < args.length; i++){
				message += " " + args[i];
			}
			
			//increment message number by 1 in both conversations
			psNumberIncrement = conn.prepareStatement("UPDATE Conversations " + 
					"SET numberOfMessages = numberOfMessages + 1 " + 
					"WHERE user_id_1 = ? and cardID = ?;");
			
			psNumberIncrement.setInt(1, senderID);
			psNumberIncrement.setInt(2, cardID);
			psNumberIncrement.executeUpdate();
			
			psNumberIncrement.setInt(1, receiverID);
			psNumberIncrement.executeUpdate();
			
			//get new message number
			psGetNumber = conn.prepareStatement("SELECT numberOfMessages FROM Conversations WHERE user_id_1 = ? AND cardID = ?;");
			psGetNumber.setInt(1, senderID);
			psGetNumber.setInt(2, cardID);
			ResultSet rsNum = psGetNumber.executeQuery();
			if(rsNum.next()){
				new_message_id = rsNum.getInt(1);
			}
			
			//get username of sender
			psName = conn.prepareStatement("SELECT username FROM User WHERE userID = ?;");
			psName.setInt(1, senderID);
			ResultSet rsName = psName.executeQuery();
			if (rsName.next()) {
				name = rsName.getString(1);	
			}
			
			
			//make 2 json texts, one with switchingID = 1 one with switchingID = 2
			String jsontext1 = "";
			//make json of message WITHOUT ANY SQUARE BRACKET. ONLY INSERT SQUARE BRACKET ON GET MESSAGES
			//ON GET MESSAGES, ALSO DELETE TRAILING COMMA! replace character with a closing square bracket!
			jsontext1 += "{";
			jsontext1 += "\"_id\": " + new_message_id + ",";
			jsontext1 += "\"text\": \"" + message + "\",";
			jsontext1 += "\"createdAt\": \""+timestamp+"\",";
			jsontext1 += "\"user\": {";
			jsontext1 +=      "\"_id\": " + 1 + ",";
			jsontext1 +=     "\"name\": \"" + name + "\"";
			jsontext1 +=    "}";
			jsontext1 +=  "},";
			
			String jsontext2 = "";
			jsontext2 += "{";
			jsontext2 += "\"_id\": " + new_message_id + ",";
			jsontext2 += "\"text\": \"" + message + "\",";
			jsontext2 += "\"createdAt\": \""+timestamp+"\",";
			jsontext2 += "\"user\": {";
			jsontext2 +=      "\"_id\": " + 2 + ",";
			jsontext2 +=     "\"name\": \"" + name + "\"";
			jsontext2 +=    "}";
			jsontext2 +=  "},";
			
			
			//add comma and jsontext1 to messagesjson of conversation where user_id_1 = senderID
			 ps = conn.prepareStatement("UPDATE Conversations" + 
			 		"	SET messagesJson =  CONCAT(?, COALESCE(messagesJson,''))" + 
			 		"	WHERE user_id_1 = ? AND cardID = ?;");
			 ps.setString(1, jsontext1);
			 ps.setInt(2, senderID);
			 ps.setInt(3, cardID);
			 ps.executeUpdate();
			
			//add comma and jsontext2 to messagesjson of conversation where user_id_1 = receiverID
			 ps.setString(1, jsontext2);
			 ps.setInt(2, receiverID);
			 ps.setInt(3, cardID);
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
