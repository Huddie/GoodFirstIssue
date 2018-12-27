const helpers = require('./helpers');

/*

*/



/*
	get the issues from the fetch request + paging info
*/
const handleResponse = {

	organizeResponse: function(data) {
		var issues = data.data.search.edges.map(edge=>{ return edge.node  });
    var endCursor = data.data.search.pageInfo.endCursor
		var hasNextPage = data.data.search.pageInfo.hasNextPage;

		var dates = issues.map(issue => {
			return new Date(issue.createdAt)
		});

		var earliestDate = helpers.getEarliestDate(dates);

		return {
        	issues: issues,
        	endCursor: endCursor,
					hasNextPage: hasNextPage,
        	earliestDate: earliestDate
    }
	},

	/*
		Take the incoming issues and a list of repositories and
		sort them into their corresponding repositories
	*/

	sortIssuesIntoRepositories: function(issues, issueLabel, repositories, repositoriesDictList) {
		issues.forEach(issue=>{
			const repo = issue.repository

			if (helpers.isUndefined(repositoriesDictList[repo.id])) {
				// If it's a new repository -->

				const repository = {
					id: repo.id,
					name: repo.name,
					owner: repo.owner.login,
					updatedAt: repo.updatedAt,
					stars: repo.stargazers.totalCount,
					issueContainers: { issueLabel : [issue] }
				};

				repositories = repositories.concat(repository)
				repositoriesDictList[repo.id] = repository;

			} else {
				// if it's a pre-existing repository

				const issueContainers = repositoriesDictList[repo.id].issueContainers

				// if issue label exists in repo, add it to corresponding container, else
				// add a new issue container

				if (helpers.isUndefined(issueContainers[issueLabel])) {
					repositoriesDictList[repo.id].issueContainers[issueLabel] = [issue];

				} else {
					repositoriesDictList[repo.id].issueContainers[issueLabel].push(issue)
					// repositoriesDictList[repo.id].issueContainers[issueLabel] = n
				}

			}
		})

		return { repos: repositories, dict: repositoriesDictList }
	}

}

module.exports = handleResponse;
