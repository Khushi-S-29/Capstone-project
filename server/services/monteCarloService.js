function runMonteCarlo(sip, years, meanReturn, volatility, runs = 200) {
  const results = [];

  for (let i = 0; i < runs; i++) {
    let portfolio = 0;

    for (let y = 0; y < years; y++) {
      const randomShock = (Math.random() * 2 - 1) * volatility;
      const annualReturn = meanReturn + randomShock;

      portfolio = (portfolio + sip * 12) * (1 + annualReturn);
    }

    results.push(portfolio);
  }

  results.sort((a, b) => a - b);

  const average =
    results.reduce((sum, val) => sum + val, 0) / results.length;

  const worstCase = results[Math.floor(runs * 0.1)];
  const bestCase = results[Math.floor(runs * 0.9)];

  return {
    average: Math.round(average),
    worstCase: Math.round(worstCase),
    bestCase: Math.round(bestCase),
    allResults: results
  };
}

module.exports = { runMonteCarlo };
