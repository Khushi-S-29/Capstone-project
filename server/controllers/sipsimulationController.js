exports.runSIPSimulation = (req, res) => {
  try {
    const { sip, years, riskLevel } = req.body;

    if (!sip || !years) {
      return res.status(400).json({
        error: "SIP amount and years are required"
      });
    }


    
    
    let annualReturn = 0.12; //default value

    if (riskLevel === "low") annualReturn = 0.07;
    if (riskLevel === "high") annualReturn = 0.16;

    let totalInvestment = sip * 12 * years;
    let futureValue = 0;

    // finding the sip value using the compound interest formula
    for (let i = 0; i < years; i++) {
      futureValue = (futureValue + sip * 12) * (1 + annualReturn);
    }



    res.json({
      totalInvestment,
      estimatedValue: Math.round(futureValue),
      annualReturnUsed: annualReturn
    });

  } catch (error) {
    res.status(500).json({
      error: "Basic SIP simulation failed"
    });
  }
};
// exports.runSIPSimulation = (req, res) => {
//   res.json({ message: "Test working" });
// };
