import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/viewData")
public class ViewDataServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        
        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM UserInput")) {
            
            response.getWriter().println("<h1>User Input Data</h1>");
            response.getWriter().println("<table border='1'>");
            response.getWriter().println("<tr><th>ID</th><th>Name</th><th>Email</th><th>Comments</th></tr>");
            
            while (rs.next()) {
                response.getWriter().println("<tr>");
                response.getWriter().println("<td>" + rs.getInt("Id") + "</td>");
                response.getWriter().println("<td>" + rs.getString("Name") + "</td>");
                response.getWriter().println("<td>" + rs.getString("Email") + "</td>");
                response.getWriter().println("<td>" + rs.getString("Comments") + "</td>");
                response.getWriter().println("</tr>");
            }
            
            response.getWriter().println("</table>");
            response.getWriter().println("<br><a href='insert.jsp'>Back to Form</a>");
        } catch (Exception e) {
            response.getWriter().println("Error: Failed to retrieve data from database.");
            e.printStackTrace();
        }
    }
}
