package org.example.povi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PoviApplication {

	public static void main(String[] args) {
		SpringApplication.run(PoviApplication.class, args);
	}

}
