import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;

public class SiteSiteServerTest {


    private SiteServer server;

    @BeforeEach
    void setUp() throws Exception {
        server = new SiteServer(0);
        server.start();

    }

    @Test
    void shouldServeHomePage() throws Exception {
        var connection = openConnection("/");
        assertThat(connection.getResponseCode()).isEqualTo(200);
    }

    /*@Test
    void shouldReturn10USD() throws IOException {
        var connection = openConnection("/api/convert");
        assertThat(connection.getResponseCode()).isEqualTo(200);
        assertThat(connection.getInputStream()).asString(StandardCharsets.UTF_8)
                .contains("10USD");
    }

     */

    private HttpURLConnection openConnection(String path) throws IOException {
        return (HttpURLConnection)
                new URL(server.getURL(), path).openConnection();
    }


}
