import {
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_ERROR,
  SEARCH_VIDEOS_SUCCESS
} from './searchVideosAction'

export function reduceVideos(state = null, action) {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return null
      break
    case SEARCH_VIDEOS_SUCCESS:
      return action.payload
      break
    default:
      return state
  }
}
