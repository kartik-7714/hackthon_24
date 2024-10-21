import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/submitData")
public class SubmitDataServlet extends HttpServlet {
    
    private static final Logger logger = Logger.getLogger(SubmitDataServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Set response content type
        response.setContentType("text/html;charset=UTF-8");

        // Retrieve form data
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String comments = request.getParameter("comments");

        // Validate input
        if (name == null || name.trim().isEmpty() ||
                email == null || email.trim().isEmpty()) {
            response.getWriter().println("Error: Name and email are required fields.");
            return;
        }

        try (Connection conn = DatabaseConnection.getConnection()) {
            // Use prepared statement to prevent SQL injection
            String sql = "INSERT INTO user_data (name, email, comments) VALUES (?, ?, ?)";
            try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                pstmt.setString(1, name);
                pstmt.setString(2, email);
                pstmt.setString(3, comments);
                pstmt.executeUpdate();
            }
            
            // Send success response
            response.getWriter().println("Data received and inserted into database successfully!");
            response.getWriter().println("Name: " + name);
            response.getWriter().println("Email: " + email);
            response.getWriter().println("Comments: " + comments);
            
            // Add a link to view all data
            response.getWriter().println("<br><a href='viewData'>View All Data</a>");
        } catch (SQLException e) {
            // Log the error and send a generic error message
            logger.log(Level.SEVERE, "Database error", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing your request.");
        }
    }
}
