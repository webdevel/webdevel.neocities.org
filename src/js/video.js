import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import TechCarousel from './TechCarousel'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {REDUCERS} from './reducers'
require('../css/video.scss')

const store = createStore(REDUCERS, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Root main={<TechCarousel />} />
  </Provider>,
  document.getElementById('root')
)
