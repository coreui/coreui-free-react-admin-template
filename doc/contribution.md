# Follow Fork & Pull model

## Step1 Fork(first time)

Fork repo : [EndOfWeb](https://github.com/NTUEE-PLUS/EndOfWeb.git)

## Step 2 Clone to local

```
#USERNAME~your GitHub account

git clone https://github.com/${USERNAME}/EndOfWeb.git

cd EndOfWeb
#setting
git remote add upstream https://github.com/NTUEE-PLUS/EndOfWeb.git
git remote set-url --push upstream no_push
git remote -v //check
```

![image](https://github.com/featherchen/EndOfWeb/blob/NTUEEPLUS-5/screenshot/remote-v.png)

## Step 3 Go to [Jira](https://ntueeplus.atlassian.net/jira/software/c/projects/NTUEEPLUS/issues/) to find/create an issue

## Step 4 Create a local branch for contribution

for each issue you got, create a branch with its jira number.

```
cd EndOfWeb

# Make local main up-to-date
git checkout main
git fetch upstream
git rebase upstream/main

#Create a new branch
git checkout -b NTUEEPLUS-${jira_number}

#Ex:git checkout -b NTUEEPLUS-5
```

## Step 5 Develop and commits

Coding on branch NTUEEPLUS-${jira_number}.

```
git add ${edited files}
git commit -m {commit message}
#please be clear and  use git rebase -i to squash commit if too many commits.(like more than 10).
```

## Step 6 Push

After you finished tour work, push this branch to origin.
Please do not use git pull, since it may create redundant commits.

```
#On branch NTUEEPLUS-${jira_number}

#Syncing
git fetch upstream
git rebase upstream/main

#Push
git push origin NTUEEPLUS-${jira_number}
```

## Step 7 Create a pull request (PR) GitHub UI.

### PR

![image](https://github.com/featherchen/EndOfWeb/blob/NTUEEPLUS-5/screenshot/PR.png)

### Fill the PR template

![image](https://github.com/featherchen/EndOfWeb/blob/NTUEEPLUS-5/screenshot/PR%20template.png)

## Step 8 The review process

Ask reviewer to review the PR.(Ping them)

## Step 9 Address review comment

Once you push your new commits to your local branch, PR will update automatically.

## Step 10 Merge to main
