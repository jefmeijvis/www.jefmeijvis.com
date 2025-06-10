---
author: Jef Meijvis
id : 32
image : /post/032/logo.png
title: Copying issues between Github repositories
date: 20250610
description : Copy issues from a Github repository or template to another one!
category : Github, Development
published : true
---
# Github Issues

Github issues are used to track features, bugs, enhancements and other work related to a repository.

When creating a new repository from a template repository however, they aren't copied over. 

We can copy them over ourselves by makes use of the [Github CLI](https://cli.github.com/), and the following script in Powershell:

```powershell

# Define the source repository and the target repository
$sourcerepo = "OWASP/cornucopia"
$targetrepo = "jefmeijvis/cornucopia-mvp"

# Download the issues to a json file and store on disk
gh issue list -R $sourcerepo --limit 100 --json title,body > issues.json

# Load the JSON file
$issues = Get-Content "issues.json" | ConvertFrom-Json

# Loop through each issue and create it in your new repo
foreach ($issue in $issues) {
    $title = $issue.title
    $body = $issue.body
    gh issue create -R $targetrepo --title "$title" --body "$body"
}
 
```

This will loop over every issue in the source repository, and copy it over to the target repository.

Make sure you have access to create issues in the target repo, and to have the Github CLI installed!

## Read More

- [cli.github.com](https://cli.github.com/)
