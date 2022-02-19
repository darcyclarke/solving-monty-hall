const num_games = 10000
const num_doors = 3

function rand (max) {
  return Math.floor(Math.random() * max)
}


function game(change) {
  // define an array of doors
  const doors = Array.from(Array(num_doors).keys())
  // determine winning door
  const winner = rand(num_doors)
  // guess door
  let guess = rand(num_doors)
  // lock-in "house" doors
  let house = doors.filter(v => v != guess)
  // console.log('-- game --')
  // console.log('initial guess:', guess)
  // if the strategy was to switch doors, do so
  if (change) {
    // if the house had the winner, set the guess accordingly
    // otherwise, set the guess to a random house door
    guess = (house.indexOf(winner) >= 0) ? winner : house[rand(house.length)]
  }
  // console.log('results:', winner, guess, house)
  // return whether or not the guessed door is the winner 
  return guess === winner
}

function run (change) {
  const results = []
  for (let i=0;i < num_games;i++) {
    results.push(game(change))
  }
  const wins = results.filter(v => !!v).length
  const percent = parseFloat((wins / num_games) * 100).toFixed(2)
  console.log(`-------- switch - ${change} --------`)
  console.log(`Games: ${num_games} Wins: ${wins} Percentage: ${percent}`)
}

// run games with strategy to "stay"
run(false)

// run games with strategy to "switch"
run(true)
