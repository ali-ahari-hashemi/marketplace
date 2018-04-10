import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.util.Scanner;

public class PretendApp extends Thread{
	private BufferedReader br;
	private PrintWriter pw;
	public PretendApp(Socket s)
	{
		try {
			this.br = new BufferedReader(new InputStreamReader(s.getInputStream()));
			this.pw = new PrintWriter(s.getOutputStream());
			Scanner in = new Scanner(System.in);
			this.start();
			while (true)
			{
				String line = in.nextLine();
				pw.println(line);
				pw.flush();
			}
		}
		catch (IOException e)
		{
			System.out.println("App error " + e.getMessage());
		}
	}
	public void run()
	{
		while (true)
		{
			try {
				if (br.ready())
				{
					String line = br.readLine();
					if(line.equals("exit"))
					{
						break;
					}
					else
					{
						System.out.println(line);
					}
				}
			}
			catch (IOException e)
			{
				System.out.println("Client while error: " + e.getLocalizedMessage());
			}
			catch (Exception e)
			{
				System.out.println("Client gen err: " + e.getLocalizedMessage());
			}
			
		}
		try
		{
			//in.close();
			br.close();
			pw.close();
		}
		catch (Exception e) 
		{
			System.out.println("Client closing error: " + e.getMessage());
		}
		
	}
	public static void main(String [] args)
	{
		Socket s = new Socket();
		try {
			s = new Socket("localhost", 6789);
			new PretendApp(s);
		}
		catch (SocketTimeoutException e)
		{
			System.out.println("Socket Timeout " + e.getMessage());
		}
		catch (IOException e)
		{
			System.out.println("Client connect: " + e.getMessage());
			if (e.getMessage().equals("Connection refused (Connection refused)"))
			{
				System.out.println("Invalid Port!");
			}
		}
	}
}
