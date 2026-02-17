exports.generateSnapshot = (req, res) => {
  try {
    const { age, income, expenses, savings } = req.body;

    if (!age || !income || !expenses) {
      return res.status(400).json({
        error: "Age, income and expenses are required"
      });
    }

    if (income <= 0 || expenses < 0) {
      return res.status(400).json({
        error: "Income must be positive and expenses cannot be negative"
      });
    }

    if (income <= expenses) {
      return res.status(400).json({
        error: "Expenses cannot exceed or equal income"
      });
    }

    const monthlySavings = income - expenses;
    const emergencyFund = expenses * 6;

    const suggestedSIPMin = monthlySavings * 0.3;
    const suggestedSIPMax = monthlySavings * 0.5;

    res.json({
      monthlySavings: Math.round(monthlySavings),
      emergencyFund: Math.round(emergencyFund),
      suggestedSIPRange: {
        min: Math.round(suggestedSIPMin),
        max: Math.round(suggestedSIPMax)
      }
    });

  } catch (error) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
