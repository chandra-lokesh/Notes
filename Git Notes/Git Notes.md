### **Git Notes**

---

#### **Important Parts:**

1. **Git Core**

   * Introduction
   * Installation
   * Git Basics
   * Committing in Detail
   * Branching
   * Merging

2. **Git Medium Difficulty Topics**

   * Diffing
   * Stashing
   * Undoing Changes

3. **GitHub**

   * Introduction
   * Fetching & Pulling
   * GitHub Oddities
   * Collaborative Workflows

4. **Advanced Git Concepts**

   * Rebasing
   * Interactive Rebasing
   * Git Tags
   * Git Behind the Scenes
   * Reflogs
   * Custom Aliases

---

### **What is Git?**

Git is a **Version Control System** (VCS).

### **What is VCS?**

A **Version Control System** (VCS) is software that tracks and manages changes to files, usually code or documents.

### **Git vs GitHub: What's the Difference?**

* **Git** is a version control system (VCS); it doesn't require an internet connection. You can download and use it locally.
* **GitHub** is a web service that hosts Git repositories in the cloud and allows for collaboration.

---

### **Configure Git Username and Email:**

* To set username:

  ```bash
  git config --global user.name "Your Name"
  ```

* To get username:

  ```bash
  git config user.name
  ```

* To set email:

  ```bash
  git config --global user.email "<email@example.com>"
  ```

* To get email:

  ```bash
  git config user.email
  ```

---

### **Git Commands:**

* `git status`: Displays current status of your repository.
* `git init`: Initializes a new repository.
* `ls -a`: Lists all directories, including hidden ones.
* `rm -rf .git`: Deletes the `.git` folder.

> **Note:** Do not initialize a repository inside another repository.

#### **Git Commit Workflow:**

1. **Working Directory** → `git add` → **Staging Area** → `git commit` → **Repository**

* `git add`: Adds files to the staging area.

* `git add .`: Adds all files to the staging area.

* `git commit`: Saves changes to the repository (checkpoint).

* `git log`: View all commits in the repository.

> **Atomic Commits:** Keep each commit focused on a single task or feature.

---

### **Editing and Configuring Your Git Commit Editor:**

* **Vim** is the default editor when you run `git commit` without the `-m` flag.
* To set **VS Code** as your default editor, use:

  ```bash
  git config --global core.editor "code --wait"
  ```

---

### **Viewing Commit Logs:**

* `git log --oneline`: Displays commit history in a single line format.

---

### **Amending Commits:**

* `git commit -m "Some commit message"`
* If you forgot to add a file:

  ```bash
  git add forgotten_file
  git commit --amend
  ```

---

### **Ignoring Files with `.gitignore`:**

1. Create a `.gitignore` file in the root of your repository.
2. Examples:

   * `.DS_Store`: Ignores `.DS_Store` files.
   * `folderName/`: Ignores an entire directory.
   * `*.log`: Ignores any file with the `.log` extension.

---

### **Branching:**

* Each commit has three parts: `id`, `parent_id`, and `message`. A parent commit doesn't have a `parent_id` or `parent hash`.

* **Contexts:** Large projects often work in multiple contexts.

* **Branches:** Represent alternative timelines of the project.

> **Master vs Main:**

* Before 2020, the default branch was named `master`.
* In 2020, GitHub changed the default branch name to `main`, but Git still uses `master` by default.

---

### **HEAD:**

`HEAD` is a pointer that always refers to the most recent commit made on the current branch (typically `master` or `main`).

* To view all branches:

  ```bash
  git branch
  ```

* To create a new branch:

  ```bash
  git branch <branchname>
  ```

* To switch to a different branch:

  ```bash
  git switch <branchname>
  ```

> **Note:** `git switch` is a newer command. `git checkout` is an older command that can do more things than `git switch`.

* To create and switch to a new branch at the same time:

  ```bash
  git switch -c <branchname>
  ```

---

### **Deleting Branches:**

* You cannot delete a branch if you are currently in that branch.
* To delete a branch:

  ```bash
  git branch -d <branchname>  # Safe delete
  git branch -D <branchname>  # Force delete
  ```

---

### **Merging:**

* We **merge branches**, not specific commits.

* Always merge into the current `HEAD` branch.

* Example:

  ```bash
  git switch master
  git merge bugfix
  ```

> **Fast-Forward Merge:** In this case, `master` simply catches up on the commits from `bugfix`.

* To merge and resolve conflicts:

  1. Git will notify you about conflicts.
  2. Open the conflicted file and resolve it manually.
  3. Remove conflict markers (`<<<<<`, `=====`, `>>>>>`).
  4. Stage the resolved file (`git add <filename>`) and commit.

---

### **Merge Conflicts:**

* **Conflict markers:**
  Git places the conflicting content between `<<<<<`, `====`, and `>>>>>`.

* **Resolving Conflicts:**

  1. Open the file with the conflict.
  2. Decide which content to keep or merge both versions.
  3. Remove the conflict markers.
  4. Add and commit your changes.

---

### **Git Diff:**

* `git diff`: Shows changes between your working directory and the staging area (unstaged changes).

* `git diff HEAD`: Shows both staged and unstaged changes.

* `git diff --staged`: Shows differences between the staged area and the latest commit.

* To compare changes between specific files:

  ```bash
  git diff HEAD <filename>
  git diff --staged <filename>
  ```

* Comparing changes across branches:

  ```bash
  git diff branch1..branch2
  ```

* Comparing changes between specific commits:

  ```bash
  git diff commit1..commit2
  ```

---

### **Git Stashing:**

* When you switch branches without committing changes:

  1. Changes will follow to the new branch if there are no conflicts.
  2. Git prevents switching if it detects potential conflicts.

* **Stash Changes:**

  ```bash
  git stash
  ```

* **Apply Stashed Changes:**

  ```bash
  git stash pop  # Re-applies the changes and removes them from stash.
  git stash apply  # Re-applies the changes but keeps them in stash.
  ```

* **List Stashes:**

  ```bash
  git stash list
  ```

* **Drop a Stash:**

  ```bash
  git stash drop stash@{2}
  ```

* **Clear All Stashes:**

  ```bash
  git stash clear
  ```

---

### **Undoing Changes & Time Traveling:**

* **Checkout to a Specific Commit:**

  ```bash
  git checkout <commit-hash>
  ```

  This command lets you view a previous commit (you only need the first 7 characters of the hash).

* **Detached HEAD:**
  This means you're not on any branch, but just viewing a commit. You can create a new branch at this commit.

* **Re-attach HEAD:**

  ```bash
  git switch master
  ```

* **Checkout to a Previous Commit Relative to HEAD:**

  ```bash
  git checkout HEAD~1  # One commit before HEAD
  git checkout HEAD~2  # Two commits before HEAD
  ```

---

### **Discarding Changes:**

* **Discard changes in a file:**

  ```bash
  git checkout HEAD <file>
  ```

  or use the shortcut:

  ```bash
  git checkout -- <file>
  ```

---

### **Git Restore:**

* `git restore <filename>`: Restores a file to the version in `HEAD`.
* `git restore --source HEAD~1 <filename>`: Restores a file to a previous commit (e.g., `HEAD~1`).

> **Use case 1:** Roll back changes in a file.
> **Use case 2:** Unstage a file:

```bash
git restore --staged <filename>
```

---

### **Git Reset:**

* `git reset <commit-hash>`: Resets the repository to a specific commit. The commits after the reset will be deleted.

* `git reset --hard <commit-hash>`: Resets the repository and also discards changes in the working directory.

---

### **Git Revert:**

* `git revert <commit-hash>`: Similar to reset, but instead of deleting commits, it creates a


new commit that undoes the changes from the specified commit.

---

