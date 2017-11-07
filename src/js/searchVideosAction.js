import { YouTube, SearchRequest } from 'youtube-search-google-api'

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS'
export function getSearchVideosAction () {
  /**
   * Thunk middleware knows how to handle functions.
   * It passes the dispatch method as an argument to the function,
   * thus making it able to dispatch actions itself.
   */
  return (dispatch) => {
    /**
     * First dispatch: the app state is updated to inform
     * that the API call is starting.
     */
    dispatch({type: SEARCH_VIDEOS})
    /**
     * The function called by the thunk middleware can return a value,
     * that is passed on as the return value of the dispatch method.
     * In this case, we return a promise to wait for.
     * This is not required by thunk middleware, but it is convenient for us.
     */
    return new Promise((resolve, reject) => {
      /**
       * Make API call
       */
      new YouTube().search(new SearchRequest(
        {
          query: {
            key: 'AIzaSyCQmxDuzFV0r_AIVBvdOArWFXPJIzjDfnA', /* restricted for deployment */
            prettyPrint: 'false',
            type: 'video',
            maxResults: 11,
            order: 'viewCount',
            videoCategoryId: '28',
            fields: 'items/snippet/thumbnails/high/url,items/snippet/title,items/id/videoId',
            q: 'react+redux -game -gaming'
          }
        },
        (error, response, body) => {
          const result = JSON.parse(body)
          resolve(result)
          // reject(reason)
        }
      ))
    })
      .then((result) => {
        dispatch(getSearchVideosSuccessAction(result))
      })
      .catch((error) => {
        console.error(SEARCH_VIDEOS_ERROR, error)
        dispatch(getSearchVideosErrorAction(new Error(SEARCH_VIDEOS_ERROR)))
        return Promise.reject(error)
      })
  }
}
export const SEARCH_VIDEOS_ERROR = 'SEARCH_VIDEOS_ERROR'
export function getSearchVideosErrorAction(error) {
  return { type: SEARCH_VIDEOS_ERROR, error }
}
export const SEARCH_VIDEOS_SUCCESS = 'SEARCH_VIDEOS_SUCCESS'
export function getSearchVideosSuccessAction(payload) {
  return { type: SEARCH_VIDEOS_SUCCESS, payload: payload }
}
