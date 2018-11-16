# Description:

The github-api-parser is a CLI tool that get statistics for all commenters for a given Github repository.

Github has [neat statistics](https://github.com/facebook/react/graphs/contributors) for contributors, it shows number of commits and nice charts. But people contribute to Github projects not only via commits. Actually, a lot of contributions happens in issue or pull request comments. Github doesn't have statistics to show "top commenters".

3 types of comments are accessed using the following API endpoints:

- [Get Commit Comments](https://developer.github.com/v3/repos/comments/#list-commit-comments-for-a-repository)
- [Get Issues Comments](https://developer.github.com/v3/issues/comments/#list-comments-in-a-repository)
- [Get Pull Requests Comments](https://developer.github.com/v3/pulls/comments/#list-comments-in-a-repository)

The total number of commits is obteined through the next endpoint:

- [Get Statistics Per Collaborator](https://developer.github.com/v3/repos/statistics/#get-contributors-list-with-additions-deletions-and-commit-counts)

# Requirements:

Node.js v.8.9 or higher

# Installation:

1. Clone or download the repository.
2. Get into the root directory: $cd github-api-parser.
3. Run npm install

# Usage:

In order to use this tool you will need to have the personal access token to Github API. You can get one passing to the link:

[Create personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), make a file fith the name \_do-not-commit-me_.js with the next line: module.exports = 'YOUR-GITHUB-TOKEN'. Place the file in the directory with the following path: src/config/token/

Now you can use the tool to access API to get 5000 requests/hour.

Please provide `--repo` and `--period` parameters. The `--repo` parameter is required, the `--period` parameter is optional and if not provided the data is going to be fetched for all period the repo exists.

# Run:

$node index.js --repo <some repo (e.g. nodejs/node)> --period 20d
