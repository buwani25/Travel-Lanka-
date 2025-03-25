const mongoose = require('mongoose');

const tourPlanSchema = new mongoose.Schema({
  tourId: { type: Number, required: true, ref: 'Customer' },
  firstDestination: { type: String, required: true },
  firstFromDate: { type: Date, required: true },
  firstToDate: { type: Date, required: true},
  secondDestination: { type: String, required: true },
  secondFromDate: { type: Date, required: true },
  secondToDate: { type: Date, required: true },
  tourGuide: { type:String,  required: true },
  guideLanguage: { 
    type: String, 
    enum: ['Sinhala', 'English', 'Tamil'], 
    required: function () { return this.tourGuide === true; } // Required only if tourGuide is "Yes"
  }
});

const TourPlan = mongoose.model('TourPlan', tourPlanSchema);

module.exports = TourPlan;
