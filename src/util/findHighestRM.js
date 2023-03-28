export function findHighestRM(sets) {
  let workouts = [];
  for(let s in sets) {
    workouts.push(sets[s].workout)
  }

  // Makes a list with only one of each workoutId
  const uniqueWorkouts = [...new Set(workouts)]

  const result = uniqueWorkouts.map((workout) => {
    // Filter the sets so only relevant sets for this workout will be used.
    let currentSets = sets.filter(set => set.workout === workout)

    // List of objects with both 1rm and the set object.
    let currentRMSnS = [];
    // List of only 1rm
    let currentRMS = [];
    for(let set in currentSets) {
      currentRMSnS.push({
        rm: calcRM(currentSets[set].weight, currentSets[set].reps), 
        set: currentSets[set],
      });
      currentRMS.push(calcRM(currentSets[set].weight, currentSets[set].reps));
    }
    let maxRM = Math.max(...currentRMS)
    const result = currentRMSnS.find((set) => {
      return set.rm === maxRM;
    })

    return {
      workout: workout,
      rm: result,
    }
      
  })
  return result
}

function calcRM(weight, reps) {
  return (weight / ((1.0278) - (0.0278 * reps)))
}

// 1RM = w ÷ ((1.0278) – (0.0278 x r))