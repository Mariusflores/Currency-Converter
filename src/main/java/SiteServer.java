import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.MalformedURLException;
import java.net.URL;


public class SiteServer {

    private final Server server;
    private static final Logger logger =
            LoggerFactory.getLogger(SiteServer.class);

    public SiteServer(int port) {

        this.server = new Server(port);
        server.setHandler(new WebAppContext(Resource.newClassPathResource("/webapp"), "/"));
    }


    public void start() throws Exception {
        server.start();
        logger.info("Server started at: " + getURL());
    }

    public URL getURL() throws MalformedURLException {
        return new URL(server.getURI().toURL(), "/");
    }

    public static void main(String[] args) throws Exception {
        new SiteServer(8080).start();
    }
}
