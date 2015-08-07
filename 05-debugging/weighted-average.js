function weightedAverage(terms, weights) {
  if (terms.length != weights.length) {
    throw new Error('terms and weights must have the sme length');
  }

  var sumOfTerms = 0;
  var sumOfWeights = 0;

  for(var i = 0 ; i <= terms.length ; i ++) {
    sumOfTerms += terms[i] * weights[i];
    sumOfWeights += weights[i];
  }

  return sumOfWeights / sumOfTerms;
}

console.log('A class of 25 students took a science test. 10 students had an average (arithmetic mean) score of 80. The other students had an average score of 60. What is the average score of the whole class?');

console.log(weightedAverage([80, 60], [10, 15]));