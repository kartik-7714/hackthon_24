import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.io.InputStream;
import java.io.IOException;

public class DatabaseConnection {
    private static final String CONFIG_FILE = "/database.properties";
    private static Properties props;

    static {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            loadProperties();
        } catch (ClassNotFoundException | IOException e) {
            throw new ExceptionInInitializerError(e);
        }
    }

    private static void loadProperties() throws IOException {
        props = new Properties();
        try (InputStream input = DatabaseConnection.class.getResourceAsStream(CONFIG_FILE)) {
            if (input == null) {
                throw new IOException("Unable to find " + CONFIG_FILE);
            }
            props.load(input);
        }
    }

    public static Connection getConnection() throws SQLException {
        String url = props.getProperty("db.url");
        String user = props.getProperty("db.user");
        String password = props.getProperty("db.password");
        return DriverManager.getConnection(url, user, password);
    }
}
