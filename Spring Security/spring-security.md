
---

# Spring Security Cheat Sheet

---

## 1. Request Flow in Spring MVC + Security

```
Client <-------------- Request -------------- [Controllers <- Front Controller (DispatcherServlet) <- Filter Chain (f1, f2, f3, ...)] --------------> Response
                                                  (Tomcat Server)
```

---

## 2. CSRF (Cross-Site Request Forgery)

* **Purpose:** Prevent unauthorized commands being transmitted from a user that the website trusts.
* **Important:** For HTTP methods like **PUT, POST, DELETE**, you *must* include a CSRF token.
* **Why?** Using only sessionId for authentication is risky because the same sessionId is reused, which can lead to session hijacking.
* **Spring Security** automatically manages CSRF tokens by default.

### How to use CSRF token (e.g., in Postman):

* Add a header:

  ```
  Key: X-CSRF-TOKEN
  Value: (token available in logout screen template or via code: request.getAttribute("_csrf"))
  ```

### Notes:

* When using default Spring Security, you *must* send the CSRF token with every modifying request.
* You can **disable CSRF protection** if you generate a new session ID for each request (stateless API).

---

## 3. Spring Security Configuration Basics

* `@Configuration` - Marks class as a configuration file.
* `@EnableWebSecurity` - Enables Spring Security’s web security support and provides the Spring MVC integration.

### Example Configuration Snippets:

```java
http.csrf(customizer -> customizer.disable());
```

* Disables CSRF protection. Use with caution!

```java
http.authorizeHttpRequests(req -> req.anyRequest().authenticated());
```

* Requires authentication for all requests but no login method specified.

```java
http.formLogin(Customizer.withDefaults());
```

* Enables form-based login with default settings.
* Note: Not suitable for API clients like Postman as it returns an HTML login form.

```java
http.httpBasic(Customizer.withDefaults());
```

* Enables HTTP Basic authentication.
* Suitable for API clients like Postman.

```java
http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
```

* Disables session creation, generating a unique sessionId per request.
* Ideal for stateless REST APIs (often used with JWT).

---

## 4. UserDetailsService & UserDetails

* Customize user authentication by defining a **UserDetailsService** bean:

```java
@Bean
public UserDetailsService userDetailsService() {
    UserDetails user1 = User.withDefaultPasswordEncoder()
                            .username("test1")
                            .password("test1")
                            .roles("USR")
                            .build();
    return new InMemoryUserDetailsManager(user1);
}
```

* `InMemoryUserDetailsManager` is a simple in-memory implementation, mostly for testing.

---

## 5. Authentication Flow

```
Unauthenticated Authentication Object
    ↓
Authentication Provider (e.g., DaoAuthenticationProvider)
    ↓
Authenticated Authentication Object
```

* To authenticate with a database:

  * Implement **UserDetailsService** interface.
  * Override `loadUserByUsername()` to load user details from DB.
  * Use **DaoAuthenticationProvider** with your custom UserDetailsService.

---

## 6. Password Handling: Encryption vs Hashing

| Aspect        | Encryption                                         | Hashing                     |
| ------------- | -------------------------------------------------- | --------------------------- |
| Process       | Plain text → Cipher text → Plain text (reversible) | Plain text → Hash (one-way) |
| Security Risk | If key compromised, data compromised               | Hash can’t be reversed      |
| Example       | AES, RSA                                           | SHA-256, BCrypt             |

### Best practice:

* Use **BCryptPasswordEncoder** to hash passwords before storing them.
* Configure AuthenticationProvider:

```java
provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
```

---

## 7. JWT (JSON Web Token) & SSO (Single Sign-On)

* **JWT format:** Compact and URL-safe JSON-based tokens replacing older bulky XML tokens.
* JWT Components:

  * **Header:** Algorithm & Token Type (e.g., HS256, RS256)
  * **Payload:** User data & claims
  * **Signature:** To verify token integrity

### Algorithms:

| Type       | Description                     |
| ---------- | ------------------------------- |
| HS (HMAC)  | Symmetric key algorithm         |
| RS (RSA)   | Asymmetric: public/private keys |
| ES (ECDSA) | Asymmetric, elliptic curve      |

---

## 8. Validating JWT Tokens in Spring Security

* JWT Filter should be positioned **before** the standard UserPasswordAuthenticationFilter (UPAF).
* JWT Filter intercepts requests, validates the token, and sets the Authentication in SecurityContext if valid.

---

## Additional Tips:

* For **stateless APIs** (e.g., REST), disable CSRF and session management; use JWT for authentication.
* For **web apps with forms**, enable CSRF and form login.
* Use **Postman** with:

  * Basic Auth (username/password)
  * JWT tokens in Authorization header: `Authorization: Bearer <token>`
  * CSRF tokens for modifying requests if CSRF is enabled.

---

