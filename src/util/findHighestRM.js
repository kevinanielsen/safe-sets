export function findHighestRM(sets) {
  let workouts = [];
  for(let s in sets) {
    workouts.push(sets[s].workout)
  }

  const uniqueWorkouts = [...new Set(workouts)]

  const result = uniqueWorkouts.map((workout) => {
    let currentSets = sets.filter(set => set.workout === workout)

    let currentRMSnS = [];
    let currentRMS = [];
    for(let set in currentSets) {
      currentRMSnS.push({
        rm: (currentSets[set].weight * ((1.0278) - (0.0278 * currentSets[set].reps))), 
        set: currentSets[set],
      });
      currentRMS.push(currentSets[set].weight * ((1.0278) - (0.0278 * currentSets[set].reps)));
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

// 1RM = w ÷ ((1.0278) – (0.0278 x r))