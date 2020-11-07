export function getSpots (state) {
  return state.spots
}

export function getActiveSpot (state) {
  return state.activeSpot
}

export function getActiveHeroPosition (state) {
  return state.activeHeroPosition
}

export function getActiveVillainPosition (state) {
  return state.activeVillainPosition
}

export function getRanges (state) {
  return state.ranges
}

export function getActiveRanges (state) {
  return state.activeRanges
}

export function getCaption (state) {
  return (spot) => (spot && state.spots && spot in state.spots ? state.spots[spot].caption : null)
}

export function getActiveRangeKey (state) {
  return state.activeRangeKey
}

export function getEdit (state) {
  return state.edit
}

export function getActiveColors (state) {
  return state.activeColors
}

export function getBlueprints (state) {
  return state.blueprints
}

export function getActiveBlueprints (state) {
  return state.activeBlueprints
}
