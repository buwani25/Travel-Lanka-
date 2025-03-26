const { text } = require('express');
const mongoose = require('mongoose');

const tourPlanSchema = new mongoose.Schema({
  tourId: { type: Number, required: true, ref: 'Customer' },
  firstDestination: { type: String, required: true },
  firstFromDate: { type: Date, required: true },
  firstToDate: { type: Date, required: true},
  secondDestination: { type: String, required: false },
  secondFromDate: { type: Date, required: false },
  secondToDate: { type: Date, required: false

   },
  tourGuide: { type:String,  required: true },
  guideLanguage: { 
    type: String, 
    enum: ['Sinhala', 'English', 'Tamil'], 
    required: function () { return this.tourGuide === true; } // Required only if tourGuide is "Yes"
  },
});

const TourPlan = mongoose.model('TourPlan', tourPlanSchema);

module.exports = TourPlan;
