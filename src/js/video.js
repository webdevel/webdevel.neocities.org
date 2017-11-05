import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import TechCarousel from './TechCarousel'
require('../css/video.scss')

ReactDOM.render(<Root main={<TechCarousel />} />, document.querySelector('#root'))
