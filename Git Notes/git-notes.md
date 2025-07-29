This document provides a comprehensive guide to Git and GitHub, covering everything from fundamental concepts to advanced operations.

-----

## Git Notes

-----

### What is Git?

**Git** is a **Version Control System** (VCS).

### What is a VCS?

A **Version Control System** (VCS) is software that tracks and manages changes to files, typically code or documents, over time.

### Git vs. GitHub: What's the Difference?

  * **Git** is a version control system that operates locally and doesn't require an internet connection.
  * **GitHub** is a web service that hosts Git repositories in the cloud, enabling collaboration and sharing.

-----

### Git Core Concepts

This section covers the foundational aspects of Git, essential for anyone starting with version control.

#### Git Installation and Basic Configuration

Before you begin using Git, you'll need to install it and configure your identity.

  * **Configure Git Username and Email:**
    These credentials are used to identify you in the commit history.

      * To set your username globally:
        ```bash
        git config --global user.name "Your Name"
        ```
      * To retrieve your configured username:
        ```bash
        git config user.name
        ```
      * To set your email globally:
        ```bash
        git config --global user.email "<email@example.com>"
        ```
      * To retrieve your configured email:
        ```bash
        git config user.email
        ```

#### Git Basics: Initializing and Managing Repositories

  * `git init`: Initializes a new Git repository in the current directory. This creates a hidden `.git` folder.

  * `ls -a`: Lists all contents of a directory, including hidden files like `.git`.

  * `rm -rf .git`: Deletes the `.git` folder, effectively removing Git's tracking from the current directory.

      * **Note:** Do not initialize a repository inside another existing repository.

  * `git status`: Displays the current state of your repository, showing changes that are staged, unstaged, or untracked.

#### Committing in Detail: The Git Workflow

The Git commit workflow involves three main areas:

1.  **Working Directory:** Your project files on your local machine.
2.  **Staging Area (Index):** A temporary area where you prepare changes to be committed.
3.  **Repository:** The database where Git stores your project's history in the form of commits.

The flow of changes is: **Working Directory** $\\rightarrow$ `git add` $\\rightarrow$ **Staging Area** $\\rightarrow$ `git commit` $\\rightarrow$ **Repository**

  * `git add <filename>`: Adds specific files from the working directory to the staging area.
  * `git add .`: Adds all changes (new, modified, deleted files) from the working directory to the staging area.
  * `git commit -m "Your commit message"`: Saves the staged changes to the repository as a new commit (a snapshot of your project at a point in time).
      * **Atomic Commits:** It's best practice to keep each commit focused on a single logical task or feature.

#### Editing and Configuring Your Git Commit Editor

When you run `git commit` without the `-m` flag, Git opens a text editor for you to write your commit message.

  * **Vim** is often the default editor.
  * To set **VS Code** as your default Git editor:
    ```bash
    git config --global core.editor "code --wait"
    ```

#### Viewing Commit Logs

  * `git log`: Displays a detailed history of all commits in the repository.
  * `git log --oneline`: Shows a condensed, single-line view of the commit history, including the commit hash and message.

#### Amending Commits

You can modify the most recent commit, for example, to add forgotten files or change the commit message.

  * Start with a commit:
    ```bash
    git commit -m "Initial commit"
    ```
  * If you forgot to add a file:
    ```bash
    git add forgotten_file.txt
    git commit --amend
    ```
    This will open your editor with the previous commit message, allowing you to modify it or simply save and exit to amend the commit with the new staged changes.

#### Ignoring Files with `.gitignore`

The `.gitignore` file specifies intentionally untracked files that Git should ignore.

1.  Create a file named `.gitignore` in the root of your repository.
2.  Add patterns for files or directories to ignore. Examples:
      * `.DS_Store`: Ignores macOS system files.
      * `folderName/`: Ignores an entire directory.
      * `*.log`: Ignores any file with the `.log` extension.

-----

### Branching

Branching is a core Git feature that allows developers to work on different features or bug fixes concurrently without affecting the main codebase.

  * Each commit has a unique `id` (hash), a `parent_id` (pointing to the previous commit, except for the initial commit), and a `message`.
  * **Contexts:** Large projects often involve working on multiple features or fixes simultaneously, which branches facilitate.
  * **Branches:** Represent alternative timelines or lines of development within a project.

#### Master vs. Main Branch

  * Historically, the default branch in Git was named `master`.
  * Since 2020, GitHub has changed its default branch name to `main` for new repositories, although Git itself still defaults to `master` locally.

#### HEAD Pointer

`HEAD` is a symbolic reference that always points to the most recent commit of the currently checked-out branch.

  * To view all local branches:
    ```bash
    git branch
    ```
    The current branch will be highlighted (e.g., with an asterisk).
  * To create a new branch:
    ```bash
    git branch <branchname>
    ```
  * To switch to an existing branch:
    ```bash
    git switch <branchname>
    ```
      * **Note:** `git switch` is a newer, more focused command for changing branches. The older `git checkout` command has broader functionality.
  * To create and switch to a new branch simultaneously:
    ```bash
    git switch -c <branchname>
    ```

#### Deleting Branches

  * You cannot delete a branch if you are currently on it. Switch to another branch first.
  * To safely delete a branch (only if it has been fully merged):
    ```bash
    git branch -d <branchname>
    ```
  * To force delete a branch (even if it hasn't been merged, use with caution):
    ```bash
    git branch -D <branchname>
    ```

-----

### Merging

Merging combines the changes from one branch into another.

  * You **merge branches**, not individual commits.

  * Always merge into your current `HEAD` branch.

  * **Example:** Merging a `bugfix` branch into `master`:

    ```bash
    git switch master
    git merge bugfix
    ```

#### Fast-Forward Merge

If the target branch (e.g., `master`) has not diverged from the branch being merged (e.g., `bugfix`), Git performs a fast-forward merge. This simply moves the `master` pointer forward to include the new commits from `bugfix`.

#### Merge Conflicts

Conflicts occur when Git cannot automatically reconcile differences between two branches being merged (e.g., if the same line of code was changed differently in both branches).

1.  Git will notify you of conflicts and mark them in the affected files.
2.  Open the conflicted files in your editor. Git uses **conflict markers**:
    ```
    <<<<<<< HEAD
    // Content from your current branch
    =======
    // Content from the branch you are merging
    >>>>>>> branch-name
    ```
3.  Manually edit the file to resolve the conflicts, choosing which content to keep or combining both.
4.  Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
5.  Stage the resolved file(s):
    ```bash
    git add <filename>
    ```
6.  Complete the merge by committing:
    ```bash
    git commit -m "Resolve merge conflict for feature/X"
    ```

-----

### Git Medium Difficulty Topics

This section delves into more intermediate Git functionalities.

#### Git Diff

`git diff` helps you see the differences between various states of your repository.

  * `git diff`: Shows unstaged changes (differences between your working directory and the staging area).

  * `git diff HEAD`: Shows both staged and unstaged changes (differences between your working directory and the latest commit).

  * `git diff --staged`: Shows staged changes (differences between the staging area and the latest commit).

  * To compare changes for a specific file:

    ```bash
    git diff HEAD <filename>
    git diff --staged <filename>
    ```

  * To compare changes across two branches:

    ```bash
    git diff branch1..branch2
    ```

  * To compare changes between two specific commits:

    ```bash
    git diff commit1..commit2
    ```

#### Git Stashing

Stashing temporarily saves your uncommitted changes, allowing you to switch branches or perform other operations, and then reapply them later.

  * **Why use stash?**

      * If you have uncommitted changes and try to switch branches, Git might prevent it if conflicts are detected.
      * If there are no conflicts, your changes will follow you to the new branch, which might not be desired.

  * **Stash Changes:**

    ```bash
    git stash
    ```

    This saves your current working directory and staging area changes onto a stack and cleans your working directory.

  * **Apply Stashed Changes:**

      * `git stash pop`: Re-applies the most recently stashed changes and removes them from the stash list.
      * `git stash apply`: Re-applies the most recently stashed changes but keeps them in the stash list. Useful if you want to apply the same stash to multiple branches.

  * **List Stashes:**

    ```bash
    git stash list
    ```

    Shows a list of all stashed changes.

  * **Drop a Specific Stash:**

    ```bash
    git stash drop stash@{2}
    ```

    Deletes a specific stash from the list (replace `stash@{2}` with the desired stash index).

  * **Clear All Stashes:**

    ```bash
    git stash clear
    ```

    Removes all stashed entries.

#### Undoing Changes & Time Traveling

Git provides several ways to undo changes or view previous states of your repository.

  * **Checkout to a Specific Commit:**

    ```bash
    git checkout <commit-hash>
    ```

    This allows you to view the repository's state at a particular commit (you only need the first 7 characters of the hash).

      * **Detached HEAD:** When you checkout a specific commit, you enter a "detached HEAD" state. This means `HEAD` is pointing directly to a commit, not to a branch. Any new commits made in this state won't be part of a branch unless you explicitly create one.
      * **Re-attach HEAD:** To return to a branch, simply switch back to it:
        ```bash
        git switch master
        ```

  * **Checkout to a Previous Commit Relative to HEAD:**

    ```bash
    git checkout HEAD~1  # One commit before HEAD
    git checkout HEAD~2  # Two commits before HEAD
    ```

  * **Discarding Changes in a File:**
    To revert a specific file in your working directory to its state in `HEAD` (the last commit on the current branch):

    ```bash
    git checkout HEAD <file>
    ```

    or the common shortcut:

    ```bash
    git checkout -- <file>
    ```

#### Git Restore

The `git restore` command is a newer, more intuitive way to undo changes in your working directory or staging area.

  * `git restore <filename>`: Discards changes in the working directory for `<filename>`, reverting it to the version in the staging area or `HEAD` if not staged.

  * `git restore --source HEAD~1 <filename>`: Restores a file to its state from a specific past commit (e.g., one commit before `HEAD`).

  * **Use case 1: Roll back changes in a file:** If you've made changes to a file but haven't committed them, and you want to discard those changes and revert to the last committed version.

  * **Use case 2: Unstage a file:** If you've added a file to the staging area (`git add`) but decide you don't want to include it in the next commit:

    ```bash
    git restore --staged <filename>
    ```

#### Git Reset

`git reset` is a powerful command used to undo changes by moving the branch pointer to a different commit.

  * `git reset <commit-hash>`: Moves the current branch's `HEAD` to the specified `commit-hash`. Changes from commits *after* the `commit-hash` will typically be moved to your staging area (`--soft` default) or working directory (`--mixed` default), but the commits themselves are removed from the branch history.
  * `git reset --hard <commit-hash>`: **DANGER\!** This moves the current branch's `HEAD` to the specified `commit-hash` and **discards all changes** in both the staging area and working directory that occurred after that commit. Use with extreme caution as it deletes uncommitted work.

#### Git Revert

`git revert` is a safer way to undo changes from a specific commit.

  * `git revert <commit-hash>`: Instead of deleting commits from history (like `git reset`), `git revert` creates a **new commit** that undoes the changes introduced by the specified commit. This preserves the project history and is suitable for shared repositories.

-----

### GitHub

GitHub is a widely used web-based platform for hosting Git repositories.

#### Why Use GitHub?

  * **Collaboration:** Facilitates teamwork on projects, allowing multiple developers to work on the same codebase.
  * **Open Source Projects:** A central hub for hosting and contributing to open-source software.
  * **Exposure:** Provides a portfolio for developers to showcase their work.
  * **Stay Up-to-Date:** Helps keep track of project changes and contributions.

#### Cloning a Repository

To get a copy of a remote GitHub repository onto your local machine:

```bash
git clone <url>
```

#### SSH Keys Configuration

SSH (Secure Shell) keys provide a secure way to authenticate with GitHub without repeatedly entering your username and password for every `push` operation.

  * To check for existing SSH keys:
    ```bash
    ls -al ~/.ssh
    ```
  * If you don't have keys, you'll need to generate and configure them with GitHub.

#### How to Get Your Code on GitHub

There are two primary scenarios for pushing your code to GitHub:

**Option 1: Existing Local Repository**

If you already have a Git repository on your local system:

1.  Create a new, empty repository on GitHub.
2.  Connect your local repository to the GitHub repository by adding a "remote":
    ```bash
    git remote add origin <url-of-github-repo>
    ```
3.  Push your local changes to GitHub:
    ```bash
    git push -u origin master # or main
    ```

**Option 2: Starting from Scratch**

If you're beginning a new project:

1.  Create a new repository on GitHub.
2.  Clone it down to your local machine:
    ```bash
    git clone <url-of-github-repo>
    ```
3.  Do some work locally (add files, make commits).
4.  Push your changes up to GitHub.

#### Git Remote

A "remote" is a reference to a repository hosted on another server, like GitHub.

  * `git remote`: Lists the shortnames of your configured remotes.

  * `git remote -v`: Shows the shortnames along with their URLs (verbose). You'll typically see `origin` listed for both `fetch` and `push` operations.

  * To add a new remote (e.g., to connect your local repo to a GitHub repo):

    ```bash
    git remote add <name> <url>
    ```

    The conventional name for the primary remote is `origin`.

  * `git remote rename <old-name> <new-name>`: Renames an existing remote.

  * `git remote remove <name>`: Deletes a remote.

#### Git Push

`git push` uploads your local commits to a remote repository.

  * Basic push:

    ```bash
    git push <remote-name> <local-branch-name>
    ```

    Example:

    ```bash
    git push origin master
    ```

  * **Push in Detail (`<local-branch>:<remote-branch>`):**
    You can specify different names for the local and remote branches during a push:

    ```bash
    git push <remote> <local-branch>:<remote-branch>
    ```

    Example: Push your local `pancake` branch to a remote branch named `waffle`:

    ```bash
    git push origin pancake:waffle
    ```

  * **The `-u` Option (Set Upstream):**
    The `-u` (or `--set-upstream`) option tells Git to remember the relationship between your local branch and the remote branch. Once set, you can use a shorthand for future pushes.

    ```bash
    git push -u origin master
    ```

    After this, you can simply use `git push` from your local `master` branch, and Git will know to push to `origin/master`.

#### Fetching & Pulling

These commands update your local repository with changes from a remote repository.

  * When working with a remote, Git keeps track of two pointers for a branch, e.g., `master` (your local branch) and `origin/master` (a "Remote Tracking Branch").

  * `origin/master` is a read-only bookmark that reflects the last known state of the `master` branch on the `origin` remote. You cannot directly change `origin/master`.

  * To view all remote tracking branches:

    ```bash
    git branch -r
    ```

  * `git fetch`: Downloads commits, files, and refs from a remote repository into your local repository, but **does not** automatically merge them into your current working branch. It only updates the remote-tracking branches (e.g., `origin/master`).

  * `git pull`: This is a combination of `git fetch` and `git merge`. It fetches changes from the remote and then automatically merges them into your current local branch.

-----

### Advanced Git Concepts

This section covers more complex Git operations often used for refining history or managing large projects.

#### Rebasing

Rebasing is a powerful way to rewrite commit history. It takes a series of commits and "replays" them onto a new base commit.

  * **Purpose:** To create a cleaner, linear project history by moving a feature branch to the tip of the main branch.
  * **How it works:** Git temporarily "saves" your commits, rewinds your branch to the point where the target branch starts, applies all the changes from the target branch, and then reapplies your saved commits on top.
  * **Caution:** Never rebase commits that have already been pushed to a shared remote repository, as it rewrites history and can cause major issues for collaborators.

#### Interactive Rebasing

Interactive rebase (`git rebase -i`) allows you to modify individual commits in a series during the rebase process. You can:

  * `pick`: Use the commit as is.
  * `reword`: Change the commit message.
  * `edit`: Stop to amend the commit (e.g., add more files, fix a bug).
  * `squash`: Combine commits into a single commit.
  * `fixup`: Like `squash`, but discards the commit's log message.
  * `drop`: Delete the commit.

#### Git Tags

Tags are pointers to specific points in Git history, typically used to mark release points (e.g., `v1.0`, `v2.0-beta`).

  * `git tag <tagname>`: Creates a lightweight tag on the current commit.
  * `git tag -a <tagname> -m "Message"`: Creates an annotated tag, which stores the tagger name, email, date, and a message. Annotated tags are recommended for releases.
  * `git tag`: Lists all tags.
  * `git show <tagname>`: Shows details about a specific tag.
  * To push tags to a remote: `git push origin --tags`

#### Git Behind the Scenes

Git's core is a content-addressable filesystem. It stores data as objects:

  * **Blob:** Stores file content.
  * **Tree:** Stores directory structure and pointers to blobs and other trees.
  * **Commit:** Stores metadata (author, committer, message), a pointer to a root tree, and pointers to parent commits.

#### Reflogs

The reflog (`git reflog`) is a local history of all the operations that modify `HEAD` or other references in your repository. It's a safety net for recovering lost commits or states.

  * `git reflog`: Shows a chronological list of where `HEAD` has been.
  * You can use `git reset HEAD@{n}` (where `n` is the reflog entry number) to revert to a previous state.

#### Custom Aliases

You can create shortcuts (aliases) for frequently used Git commands to save typing and improve workflow.

  * Example: Create an alias `st` for `git status`:
    ```bash
    git config --global alias.st status
    ```
    Now you can simply type `git st`.

-----