import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

public class Teste {

	public static void main(String[] args) throws IOException {
		
		Random random = new Random();
		
		FileWriter arq = new FileWriter("arquivo.txt");
		PrintWriter gravar = new PrintWriter(arq);
		final int SIZE = 100;
		
		int  matriz [][] = new int[SIZE][SIZE];
		
		// Preenchendo a matriz com valores aleatorios
		for (int i = 0; i < SIZE; i++) {
			for (int j = 0; j < SIZE; j++) {
				 matriz[i][j] = random.nextInt(9);
			}
			
		}
		
		
		// Gravando a matriz no arquivo
		gravar.print("\n");
		for (int i = 0; i < SIZE; i++) 
		{
			gravar.print((i+1));
			for (int j = 0; j < SIZE; j++) {				
				gravar.printf( " %d "  , matriz[i][j]);
			}
			gravar.print("|");
			gravar.print("\n");
		}
				
		
		
		
		
		
	    
		gravar.close();		
	}
	
}
