const Feature = require("../models/feature")
const TestCase = require("../models/testCase")

// Helper function to update feature test counts
async function updateFeatureTestCounts(featureId) {
  try {
    // Get all test cases for this feature
    const testCases = await TestCase.find({ featureId })

    // Count test cases by status
    const counts = {
      total: testCases.length,
      pending: testCases.filter((tc) => tc.status === "pending").length,
      pass: testCases.filter((tc) => tc.status === "pass").length,
      fail: testCases.filter((tc) => tc.status === "fail").length,
    }

    // Update the feature with new counts
    await Feature.findByIdAndUpdate(featureId, { testCounts: counts }, { new: true })

    return counts
  } catch (error) {
    console.error("Error updating feature test counts:", error)
    throw error
  }
}

module.exports = { updateFeatureTestCounts }
