# solving-monty-hall

See `index.js` for latest...

#### Example

```js
const num_games = 100000
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
  // if the strategy was "random", flip a coin
  change = (change === 'random') ? rand(2) : change
  // if the strategy is to switch doors, do so    
  if(change) {
    // if the house had the winner, return that...
    // otherwise, set guess to a random house door
    guess = (house.indexOf(winner) >= 0) ? winner : house[rand(house.length)]
  }
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

// run games with strategy that's "random"
run('random')
```

### Example Output

```bash
$ node index.js

-------- switch - false --------
Games: 100000 Wins: 33276 Percentage: 33.28
-------- switch - true --------
Games: 100000 Wins: 66679 Percentage: 66.68
-------- switch - random --------
Games: 100000 Wins: 50010 Percentage: 50.01
```