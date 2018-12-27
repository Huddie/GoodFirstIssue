const helpers = require("./helpers"); 

const repository = {
	make: function(repo) {
		return {
			id: repo.id, 
			name: repo.name, 
			stars: repo.stargazers.totalCount, 
			url: repo.url, 
			issues: [], 
			issuesDictList: {}
		}
	}
}

module.exports = repository; 

class UniqueIssues {
	constructor() {
		this.issues = {}
	}

	addNew(issue) {
		if (helpers.isUndefined(this.issues[issue])) {
			this.issues[issue] = issue 
		} 
	}

}


