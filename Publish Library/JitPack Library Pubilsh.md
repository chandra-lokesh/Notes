This guide will walk you through creating a Java Gradle library project and publishing it to JitPack, making it easily consumable by other JVM projects.

-----

## Part 1: Creating a Java Gradle Library Project

### Prerequisites

Before you begin, ensure you have the following:

  * **Java Development Kit (JDK):** Version 8 or higher.
  * **Gradle:** You don't need a global installation; the Gradle Wrapper handles it.
  * **Text Editor or IDE:** IntelliJ IDEA, VS Code, Eclipse, etc.
  * **Git:** Essential for version control and publishing to JitPack.
  * **GitHub Account:** JitPack integrates directly with GitHub.

### Steps

#### 1\. Create a Project Directory

Open your terminal or command prompt and create a new directory for your library project:

```bash
mkdir my-java-library
cd my-java-library
```

#### 2\. Initialize the Gradle Project

Inside your project directory, run the Gradle `init` task to set up the basic project structure:

```bash
gradle init
```

You'll be prompted with a few questions. Choose the following options:

  * **Select type of build to generate:** `2: Library`
  * **Select implementation language:** `1: Java`
  * **Select build script DSL:** `2: Groovy` (or `1: Kotlin` if you prefer Kotlin DSL)

For other questions, you can generally press `Enter` to accept the default values.

This will create a project structure similar to this:

```
my-java-library/
├── .gradle/
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src/
    ├── main/
    │   └── java/
    │       └── my/package/name/
    │           └── Library.java
    └── test/
        └── java/
            └── my/package/name/
                └── LibraryTest.java
```

#### 3\. Review Project Files

  * **`settings.gradle`**: This file defines the name of your project.

    ```gradle
    rootProject.name = 'my-java-library'
    ```

  * **`build.gradle`**: This is the main build script for your library. It will typically contain:

    ```gradle
    plugins {
        id 'java-library' // Apply the Java Library plugin
    }

    group 'com.example.yourlibrary' // Your group ID (e.g., your domain in reverse)
    version '1.0.0' // Initial version of your library

    repositories {
        mavenCentral() // Where Gradle will look for dependencies
    }

    dependencies {
        // Dependencies required by your library
        // For example, if you need JUnit for testing:
        testImplementation 'org.junit.jupiter:junit-jupiter-api:5.10.0'
        testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.10.0'
    }

    // Optional: Configure Javadoc and Source JARs for publishing
    java {
        withJavadocJar()
        withSourcesJar()
    }
    ```

    **Important:**

      * **`group`**: This will be the `groupId` of your published library. It's recommended to use a reverse domain name (e.g., `com.github.yourusername`).
      * **`version`**: This is the initial version of your library. When you release a new version, you'll update this or use Git tags.
      * **`java-library` plugin**: This plugin is crucial for creating a Java library, providing features like API and implementation separation.
      * **`withJavadocJar()` and `withSourcesJar()`**: These are important for JitPack to generate Javadoc and source JARs, which are useful for consumers of your library.

#### 4\. Write Your Library Code

Open `src/main/java/my/package/name/Library.java` (or whatever path was generated) and start writing your library's classes and methods.

**Example `Library.java`:**

```java
package com.example.yourlibrary;

public class Library {
    public static String greeting() {
        return "Hello from My Java Library!";
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
```

#### 5\. Write Tests (Optional but Recommended)

Open `src/test/java/my/package/name/LibraryTest.java` and write tests for your library.

**Example `LibraryTest.java`:**

```java
package com.example.yourlibrary;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class LibraryTest {
    @Test
    void testGreeting() {
        assertEquals("Hello from My Java Library!", Library.greeting());
    }

    @Test
    void testAdd() {
        assertEquals(5, Library.add(2, 3));
    }
}
```

#### 6\. Build and Test Your Library Locally

Run the `build` task to compile your code, run tests, and assemble the JAR file:

```bash
./gradlew build
```

If everything is successful, you'll see `BUILD SUCCESSFUL` in the console. The compiled JAR file will be located in `build/libs/`.

-----

## Part 2: Publishing to JitPack

JitPack simplifies publishing JVM and Android libraries directly from Git repositories (like GitHub).

### Steps

#### 1\. Initialize Git Repository

If you haven't already, initialize a Git repository in your project directory:

```bash
git init
git add .
git commit -m "Initial commit of Java library"
```

#### 2\. Create a GitHub Repository

Go to GitHub and create a new **public** repository. **Do not initialize it with a README, .gitignore, or license,** as you already have your files.

#### 3\. Link Local Repository to GitHub

Add the remote origin and push your code to GitHub:

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

Replace `your-username` and `your-repo-name` with your actual GitHub username and repository name.

#### 4\. Create a Git Release or Tag

JitPack builds from Git releases or tags. This is how you define a specific version of your library for consumers.

**Using a Git Tag (Recommended for simple releases):**

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

The tag name (`v1.0.0`) should match the `version` defined in your `build.gradle` file.

**Creating a GitHub Release:**

Go to your GitHub repository, click on "**Releases**" (usually on the right sidebar or under the "Code" tab), and then "**Create a new release**."

  * Choose a tag (e.g., `v1.0.0`).
  * Provide a release title and description.
  * Click "**Publish release**."

#### 5\. Go to JitPack.io and Look Up Your Repository

1.  Visit [https://jitpack.io/](https://jitpack.io/).
2.  Sign in with your GitHub account (if you haven't already).
3.  In the "**Look up**" field, enter your GitHub repository URL (e.g., `https://github.com/your-username/your-repo-name`).
4.  Click the "**Look up**" button.

#### 6\. Build Your Library on JitPack

JitPack will now attempt to build your library. It looks for a `build.gradle` file in the root of your repository (or in a subfolder). If it finds a tag or release, it will try to build that specific version.

You'll see the build status. It might take a few moments for the build to start and complete.

  * If the build is successful, you'll see a green "**Get it**" button or "**Build successful**" message.
  * If the build fails, you can click on the "**Logs**" to see the output and debug any issues. Common issues include incorrect Gradle configuration, missing plugins, or compilation errors.

### Using Your Published Library

Once JitPack successfully builds your library, you'll see instructions on how to use it in other Gradle projects.

For consumers of your library (in their `build.gradle` or `settings.gradle`):

#### Add JitPack repository:

In your consuming project's `settings.gradle` (recommended for modern Gradle):

```gradle
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' } // Add this line
    }
}
```

#### Add the dependency:

In the `build.gradle` file of the module that needs your library:

```gradle
dependencies {
    implementation 'com.github.your-username:your-repo-name:v1.0.0' // Replace with your details and version
}
```

  * `com.github.your-username`: This is your `groupId` derived from your GitHub username.
  * `your-repo-name`: This is your `artifactId` derived from your GitHub repository name.
  * `v1.0.0`: This is the Git tag or release version you created.

#### Using the library in Java code:

```java
import com.example.yourlibrary.Library; // Your library's package and class

public class Main {
    public static void main(String[] args) {
        System.out.println(Library.greeting());
        System.out.println("Sum: " + Library.add(10, 20));
    }
}
```

-----

### Tips for Success

  * **Version Control:** Always use Git and create proper tags/releases for your library versions. This is how JitPack identifies what to build.
  * **Build File Clarity:** Keep your `build.gradle` file clean and well-configured. Ensure the `java-library` plugin is applied and `group` and `version` are correctly set.
  * **Javadoc and Sources:** Including `withJavadocJar()` and `withSourcesJar()` in your `build.gradle` makes your library more user-friendly by providing documentation and source code when developers use it.
  * **JitPack `jitpack.yml` (Advanced):** For more complex builds or specific Java versions, you can create a `jitpack.yml` file in the root of your repository to customize the build process on JitPack. Refer to the [JitPack documentation](https://jitpack.io/docs/) for more details.
  * **Troubleshooting:** If a build fails on JitPack, always check the build logs provided on the JitPack website. They usually contain detailed error messages that can help you pinpoint the problem.
  * **Private Repositories:** If you need to publish from a private GitHub repository, you'll need to configure an authentication token on JitPack.io. Refer to [JitPack's documentation on private repositories](https://jitpack.io/docs/PRIVATE/) for this.

By following these detailed steps, you can successfully create a Java Gradle library project and publish it to JitPack for others to use.
