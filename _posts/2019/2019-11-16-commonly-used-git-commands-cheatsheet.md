---
layout: post
title: Commonly used git commands cheatsheet
description: This is a simple collection of git commands that I have been using most of the time.
keywords: git commands, git cheatsheet, commonly used
tags: [Git, Cheatsheet, Software Engineering]
comments: true
---

Git is the most popular distributed version-control system for tracking changes in source code during software development. I have been using git for almost everyday in my work life. I am not a fan of using GUI tools for git, so it's very unlikely I do git with the GUI tools. Most of the time, I have been typing git commands on my terminal window. I have few git cheatsheets somewhere since not all the git commands I can remember. This is the one of the git cheatsheets that I think I have been using all the time.

### Basic configurations

I have to ensure my configurations are correct since I have been working on multiple git servers.

```bash
# Check user.name & user.email
git config --global --list #global
git config --list #local

# Update user.name & user.email
git config --global user.name "Heiswayi Nrird"
git config --global user.email "heiswayi@nrird.com"
#or on the current repository settings
git config user.name "Heiswayi Nrird"
git config user.email "heiswayi@nrird.com"
```

### Creating and getting projects

```bash
# Initialize a local Git repository at current directory
git init

# Create a local copy of a remote repository in the current directory
git clone <GIT_REPO_URL>
```

### Basic snapshotting

```bash
# Check status for any change
git status

# Get everything ready to commit
git add . #add all new and changed files to staging, or
git add <FILENAME> #add specific file to staging

# Commit changes
git commit #write commit message in text editor & save, or
git commit -m "<COMMIT_MESSAGE>" #or
git commit -am "<COMMIT_MESSAGE>" #add everything and commit
```

### Reset

```bash
# Go back to commit
git revert <COMMIT_ID>

# Undo commit, but staging and working directory not changed
git reset --soft <COMMIT_ID> #at particular commit or
git reset --soft HEAD~ #at latest commit

# Undo commit, but only change staging directory to match with the repo
git reset --mixed <COMMIT_ID> #or
git reset --mixed HEAD~

# Undo commit with both staging and working directory changed to match the repo
git reset --hard <COMMIT_ID> #or
git reset --hard HEAD~

# Delete untracked files (not staging)
git clean -f

# Unstage (undo adds)
git reset HEAD <FILENAME>

# Change most recent commit message
git commit --amend #using text editor to write commit message or
git commit --amend -m "<NEW_MESSAGE>"

# Undo changes/modifications
git checkout -- <FILENAME> #restore files from latest commited version, or
git checkout <COMMIT_ID> -- <FILENAME> #restore file from a custom commit

# Remove file/directory
git rm -r <FILENAME|DIRECTORY> #apply to local and git, or
git rm -r --cached <FILENAME|DIRECTORY> #only apply to git
```

### Branching

```bash
# Show branches
git branch #list local branches, or
git branch -a #list all branches (local & remote)

# Create new local branch
git branch <BRANCH_NAME> #or
git branch -b <BRANCH_NAME> #create & switch to it, or
git branch -b <BRANCH_NAME> origin/<BRANCH_NAME> #clone remote branch and switch to it

# Switch working branch
git checkout <BRANCH_NAME> #or
git checkout - #switch to last checked out branch

# Rename local branch
git branch -m <OLD_BRANCH_NAME> <NEW_BRANCH_NAME> #or
git branch --move <OLD_BRANCH_NAME> <NEW_BRANCH_NAME>

# Delete local branch
git branch -d <BRANCH_NAME> #delete merged branch, or
git branch --delete <BRANCH_NAME> #or
git branch -D <BRANCH_NAME> #delete not-merged branch
```

### Merging

Before merging, switch to the branch first: `git checkout <TARGET_BRANCH_NAME>`

```bash
# Merge into <TARGET_BRANCH_NAME>
git merge <SOURCE_BRANCH_NAME> #true merge (fast forward), or
git merge --no-ff <SOURCE_BRANCH_NAME> #force a new commit

# Stop merge (in case of conflicts)
git merge --abort #or
git reset --merge

# Merge only one specific commit
git cherry-pick <COMMIT_ID>

# Store current work with untracked files
git stash -u

# Bring stashed work back to the working directory
git stash pop

# Remove all stashed entries
git stash clear
```

### Sharing and updating projects

```bash
# Push local branch to server (remote) repository
git push origin <BRANCH_NAME>

# Push changes to remote repository
git push -u origin <BRANCH_NAME> #remember the branch, or
git push #on remembered branch

# Delete remote branch
git push origin --delete <BRANCH_NAME> #or
git push origin :<BRANCH_NAME>

# Update local repository to the newest commit
git pull #or
git pull origin <BRANCH_NAME> #on specific branch

# Fetch custom branch
git fetch origin <REMOTE_BRANCH_NAME>:<LOCAL_BRANCH_NAME>

# Add a remote repository
git remote add origin <GIT_REPO_URL>
```

### Inspection and comparison

```bash
# View changes
git log #or
git log --summary #detailed, or
git log --oneline #briefly

# Preview changes before merging
git diff <SOURCE_BRANCH_NAME> <TARGET_BRANCH_NAME>
```

For [more specific comparisons](https://gitguys.com/topics/git-diff-command-explained/) on `git diff` happened to be so occasionally used, similarly to [releases and versions tagging](https://gitguys.com/topics/git-object-tag-git-tag/).