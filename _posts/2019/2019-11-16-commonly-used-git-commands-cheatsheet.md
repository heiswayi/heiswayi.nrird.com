---
layout: post
title: Commonly used git commands cheatsheet
description: This is a simple collection of git commands that I have been using for most of the time.
keywords: git commands, git cheatsheet, commonly used
tags: [Git, Cheatsheet, Software Engineering]
comments: true
---

Git is the most popular distributed version-control system for tracking changes in source code during software development, and this is a simple collection of git commands that I have been using for most of the time.

### Checking the basic configurations

I have been working on multiple git servers, so I have to ensure my `user.name` and `user.email` that I used are correct.

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
# Initialize a local git repository at the current directory
git init

# Create a local copy of a remote repository in the current directory
git clone <GIT_REPO_URL>
```

### The most common workflows - commit the changes

```bash
# Check for changes between local and remote
# and also show which branch I'm working on
git status

# Get everything ready to commit
git add . #add all new and changed files to staging
git add <FILENAME> #or add specific file to staging

# Commit the changes
git commit #used for writing long commit messages
git commit -m "<COMMIT_MESSAGE>" #or using a simple commit message
git commit -am "<COMMIT_MESSAGE>" #add all changed files and commit, except the new files

# Push the changes into the remote repository
git push
```

### Branching

```bash
# Show branches
git branch #list local branches
git branch -a #or list all branches (local + remote)

# Switch working branch
git checkout <BRANCH_NAME>
# or create new branch and checkout the branch
git checkout -b <NEW_BRANCH_NAME> <BASE_BRANCH_NAME>

# Create new branch from base branch
git branch <NEW_BRANCH_NAME>

# Rename/move a branch
git branch -m <OLD_BRANCH_NAME> <NEW_BRANCH_NAME>
# update the branch on the remote repository
git push origin :<OLD_BRANCH_NAME> <NEW_BRANCH_NAME>

# Push local branch to remote repository
git push -u origin <NEW_BRANCH_NAME>

# Delete local branch
git branch -d <BRANCH_NAME>
git branch -D <BRANCH_NAME> #or with force deletion without checking merged status

# Delete remote branch
git push -d origin <BRANCH_NAME>

# Compare branches
git diff <FIRST_BRANCH_NAME>..<SECOND_BRANCH_NAME>
```

### Merging

Before merging, switch to the target branch first: `git checkout <TARGET_BRANCH_NAME>`

```bash
# Merge into <TARGET_BRANCH_NAME>
git merge --no-ff <SOURCE_BRANCH_NAME> #always generate a merge commit

# Merge only from a specific commit
git cherry-pick <COMMIT_ID>

# Stop merging (in case of conflicts)
git merge --abort
```

### Stashing your work

```bash
# Review the changes
git status

# Saving changes
git stash #only tracked files
git stash -u #include the untracked files
git stash -a #all including ignored files
# good practice to annotate the stashes
git stash save "<STASH_DESCRIPTION>"

# Get the saved changes, remove them from the stash and re-apply
git stash pop
# getting specific stash based on last argument (default stash@{0})
git stash pop stash@{2} #e.g. stash@{2}

# List the stashes
git stash list

# Delete the stashes
git stash drop stash@{1} #specific stash
git stash clear #delete all
```

### Tagging

```bash
# Create a new release tag
git tag -a <VERSION_TAG> -m "<DESCRIPTION>"
# or create a tag at specific commit
git tag -a <VERSION_TAG> <COMMIT_ID>

# List all tags
git tag

# Pushing a tag to remote
git push origin <VERSION_TAG>

# Checkout a specific tag
git checkout <VERSION_TAG>

# Delete a specific tag
git tag -d <VERSION_TAG>
```

### Reset

```bash
# Revert the existing commit
git revert <COMMIT_ID>

# Undo commit with both staging and working directory changed to match the repo
git reset --hard <COMMIT_ID> #on specific commit
git reset --hard HEAD~ #or on the latest commit

# Delete untracked files and directories (not staging)
git clean -fd

# Change most recent commit message
git commit --amend #using text editor to write commit message
git commit --amend -m "<NEW_MESSAGE>" #or with simple message

# Remove file/directory
git rm -rf <FILENAME|DIRECTORY> #apply to local and git
git rm -rf --cached <FILENAME|DIRECTORY> #or only apply to git
```

### Getting the latest changes

#### Case 1: Don't care about local changes

```bash
# Get latest code and reset the code
git fetch origin
git reset --hard origin/<TARGET_BRANCH_NAME>

# Delete the git folder and clone again
git rm -rf <PROJECT_FOLDER>
git clone <GIT_REPO_URL>
```

#### Case 2: Care about local changes

Recommended to use the command with a clean working copy. If you have any uncommitted local changes you want to retain, before using the command, you should stash (`git stash`) your works first.

```bash
# Get latest code and integrate
git pull
```

### Inspection and comparison

```bash
# View changes
git log --pretty=oneline
git log --graph --oneline --decorate #with graph
git log --pretty=format:"%cn committed %h on %cd" #formatted
# example output: Heiswayi Nrird committed f063fe9 on Sat Nov 16 13:40:35 2019 +0800

# Comparing 2 different commit IDs
git diff <COMMIT_ID_1> <COMMIT_ID_2>

# Comparing 2 branches
git diff <BRANCH_NAME_1>..<BRANCH_NAME_2>
```

[Click here](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-log.html#_pretty_formats) for more details on `--pretty=format:"<STRING>"`.

### Git references and other cheatsheets

- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [GitHub Git Learning Resources](http://try.github.io/) // [PDF](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- [Git Branching](https://gist.github.com/digitaljhelms/4287848)
- [git_examples.sh](https://gist.github.com/heiswayi/ee92a4d1d12cd88dd1cf28dd4c7499c0)
- [Interactive Git Cheatsheet by NDP Software](https://ndpsoftware.com/git-cheatsheet.html)