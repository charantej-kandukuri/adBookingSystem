const AdBookingSystem = require('./adBooking');

const adSystem = new AdBookingSystem();
adSystem.streamTypes = [ 'stream1', 'stream2' ];
adSystem.thresholdPercentage = 5;
adSystem.initializeBudgetAllocation(100000);

adSystem.runCampaign();
