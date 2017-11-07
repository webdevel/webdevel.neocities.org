import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from 'react-responsive-carousel'
import { getSearchVideosAction } from './searchVideosAction'
import { connect } from 'react-redux'

class TechCarousel extends Component {

  getSlides() {
    if (this.props.videos === null) return
    const items = this.props.videos.items
    const slides = items.map((item) =>
      <div>
        <img src={item.snippet.thumbnails.high.url} />
        <a target="_blank" className="legend" href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>{item.snippet.title}</a>
      </div>
    )
    return slides
  }
  render() {
    return (
      <div id="carousel-section">
        <Carousel autoPlay={true} infiniteLoop={true}
          showThumbs={false} showArrows={true} showStatus={false}>
          {this.getSlides()}
        </Carousel>
      </div>
    )
  }
  componentDidMount() {
    this.props.getSearchVideosAction()
  }
}
const mapStateToProps = (state) => { return { videos: state.videos } }
const mapDispatchToProps = { getSearchVideosAction }
export default connect(mapStateToProps, mapDispatchToProps)(TechCarousel)
