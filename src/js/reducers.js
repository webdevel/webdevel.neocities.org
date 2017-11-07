import {combineReducers} from 'redux'
import {reduceVideos} from './searchVideosReducer'

export const REDUCERS = combineReducers({
  videos: reduceVideos
})
