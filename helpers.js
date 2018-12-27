

const helpers = {

	getEarliestDate: function (dates) {
                var earliestDate = new Date();
		dates.forEach(date => {
			if (date < earliestDate) {
				earliestDate = date
			}
		})

		return earliestDate;
        },

	isUndefined: function(object) {
        	return (typeof object === "undefined");
	}

}

module.exports = helpers;
