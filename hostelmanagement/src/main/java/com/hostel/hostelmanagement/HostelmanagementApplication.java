package com.hostel.hostelmanagement;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class HostelmanagementApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        System.setProperty("MONGO_URI", dotenv.get("MONGO_URI"));
        System.setProperty("MONGO_DATABASE", dotenv.get("MONGO_DATABASE"));

		SpringApplication.run(HostelmanagementApplication.class, args);
	}


}
