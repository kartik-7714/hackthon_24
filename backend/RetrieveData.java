import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RetrieveData {
    public static void getUserData() {
        String sql = "SELECT * FROM UserInput";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("Name: " + rs.getString("name"));
                System.out.println("Email: " + rs.getString("email"));
                System.out.println("Comments: " + rs.getString("comments"));
                System.out.println("-----");
            }
        } catch (SQLException e) {
            System.out.println("Error retrieving user data: " + e.getMessage());
        }
    }
}
