import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class InsertData {
    public static void insertUserData(Connection conn, String name, String email, String comments) throws SQLException {
        String sql = "INSERT INTO UserInput (Name, Email, Comments) VALUES (?, ?, ?)";
        
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setString(3, comments);
            pstmt.executeUpdate();
            
            System.out.println("Data inserted successfully.");
        }
    }
}
