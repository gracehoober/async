"use strict";
//TODO: consider using a global variable for URL
async function showNumberTrivia(favNumber){

  const response = await fetch(`http://numbersapi.com/${favNumber}?json`);
  const data = await response.json();

  return data;
}

async function showNumberRace(num1, num2, num3, num4){
  let resp1 = showNumberTrivia(num1);
  let resp2 = showNumberTrivia(num2);
  let resp3 = showNumberTrivia(num3);
  let resp4 = showNumberTrivia(num4);
//TODO: winnerPromise
  const answerPromise = await Promise.race([resp1, resp2, resp3, resp4]);
  const answer = await answerPromise;

  return answer.text;
}

async function showNumberAll(nums){
  const responses = [];
  for(let num of nums){
    responses.push(showNumberTrivia(num));
  }
  const results = await Promise.allSettled(responses);
  const errors = results.filter(r => r.status === 'rejected');

  const validResponses = results.filter( r => r.status === 'fulfilled');

  return [errors, valid_responses];
}

//TODO: if functions are set up with less dependency on showNumberTrivia,
//look at fulfilled status and ok value


async function main(){

  const numTrivia = await showNumberTrivia(13);
  console.log("showNumberTrivia:", numTrivia.text);

  const numRace = await showNumberRace(15,31,6,7);
  console.log("showNumberRace:", numRace);

  const allNums = await showNumberAll([15,31,6,7,"WRONG"]);
  console.log("showNumberAll fulfilled:", allNums[0], allNums[1]);

}