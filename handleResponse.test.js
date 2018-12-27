const handleResponse = require('./handleResponse');
const testData = require('./testData.js');

test('', () => {
	const data = handleResponse.organizeResponse(testData.sixRepos);
	const issues = data.issues;
	const endCursor = data.endCursor;
	const hasNextPage = data.hasNextPage;
	const earliestDate = data.earliestDate;

	expect(issues.length).toBe(6);
	expect(endCursor).toBe('Y3Vyc29yOjg=');
	expect(hasNextPage).toBe(true);
	expect(earliestDate.getTime()).toBe(new Date('2018-09-20T07:17:01Z').getTime());

});

test('', () => {
	const data = testData.Repos_threeUnique_TwoDuplicate;
	const issues = handleResponse.organizeResponse(data).issues;
	var retValue = handleResponse.sortIssuesIntoRepositories(issues, "issueLabel", [], {})
	var repos = retValue.repos
	var reposDic = retValue.dict

	expect(repos.length).toBe(3)

	var repo = repos[0]
	expect(repo.name).toBe('IOS-Pods-DFU-Library');
	expect(repo.owner).toBe('NordicSemiconductor');
	expect(repo.stars).toBe(5);

	const issueCount_Expected = [2, 2, 1]

	const issueCount_Returned = repos.map(repo=>{
		return repo.issueContainers["issueLabel"].length
	})

	expect(issueCount_Expected).toEqual(issueCount_Returned)
	expect(repo.issueContainers["issueLabel"].length).toBe(2)

	/*
	add more issues -> same issues so repo coundshould be the same
	add new issues to same issue label -> no current handler for duplicate issues
	*/

	retValue = handleResponse.sortIssuesIntoRepositories(issues, "issueLabel", repos, reposDic)
	expect(retValue.repos.length).toBe(3)
	repo = retValue.repos[0];
	expect(repo.issueContainers["issueLabel"].length).toBe(4)


	/*
	add a new label
	*/

	retValue = handleResponse.sortIssuesIntoRepositories(issues, "newLabel", repos, reposDic)
	repo = retValue.repos[0];
	expect(repo.issueContainers["newLabel"].length).toBe(2)

});
