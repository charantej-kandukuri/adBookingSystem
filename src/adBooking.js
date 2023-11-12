class AdBookingSystem {
	constructor() {
		this.ad;
		this.streamTypes;
		this.budgetAllocation = {};
		this.budgetThreshold;
		this.thresholdPercentage;
	}

	initializeBudgetAllocation(adBudget) {
		this.streamTypes.forEach((s) => {
			this.budgetAllocation[s] = adBudget / this.streamTypes.length;
		});
		console.log('Initial Budget Allocation:', this.budgetAllocation);
		this.resetThereshold();
	}

	rebalanceBudget() {
		const remainingBudget = Object.values(this.budgetAllocation).reduce((acc, item) => acc + item, 0);
		this.streamTypes.forEach((s) => {
			this.budgetAllocation[s] = remainingBudget / this.streamTypes.length;
		});
		this.resetThereshold();
	}

	percentageCalulator(amt, percentage) {
		return amt * percentage / 100;
	}

	resetThereshold() {
		this.budgetThreshold = this.percentageCalulator(
			this.budgetAllocation[this.streamTypes[0]],
			this.thresholdPercentage
		);
	}

	consumeRandomly() {
		this.streamTypes.forEach((streamType) => {
			const randomUtilization = Math.random() * (5000 - 2000) + 2000; // Randomly consume between 2K and 5K
			if (this.budgetAllocation[streamType] > randomUtilization) {
				this.budgetAllocation[streamType] -= randomUtilization;
			} else {
				this.budgetAllocation[streamType] = 0;
			}
		});
	}

	runCampaign() {
		while (true) {
			// console.log('budgetAllocation ::::::::', this.budgetAllocation);
			// cond 1. If both have balance of zero or less, exit program.
			let balanceRemaining = Object.values(this.budgetAllocation).reduce((acc, item) => acc + item, 0);
			if (balanceRemaining <= 0) {
				console.log('Both streams exhausted. Exiting program.');
				break;
			}

			// cond 2. Check if alteast one of them have balance of less than 5%, rebalance both streams to have equal balance
			let liveStreams = Object.values(this.budgetAllocation).filter((item) => item < this.budgetThreshold).length;

			if (liveStreams > 0 && liveStreams < this.streamTypes.length) {
				console.log('Rebalance when atleast one stream balance is less than 5%');
				this.rebalanceBudget();
			}

			this.consumeRandomly();
		}

		console.log('Final Budget Allocation:', this.budgetAllocation);
	}
}

module.exports = AdBookingSystem;
