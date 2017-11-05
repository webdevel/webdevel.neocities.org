import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from 'react-responsive-carousel'
import { YouTube, SearchRequest } from 'youtube-search-google-api'

export default class TechCarousel extends Component {

  constructor(props) {
    super(props)
    this.state = { slides: null }
    this.getSlides()
  }
  getSlides() {
    new YouTube().search(new SearchRequest(
      {
        query: {
          key: 'AIzaSyCQmxDuzFV0r_AIVBvdOArWFXPJIzjDfnA',
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
        const result = JSON.parse(body), items = result.items
        const slides = items.map((item) =>
          <div>
            <img src={item.snippet.thumbnails.high.url} />
            <a target="_blank" className="legend" href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>{item.snippet.title}</a>
          </div>
        )
        this.setState({ slides: slides })
      }
    ))
  }
  render() {
    return (
      <div id="carousel-section">
        <Carousel autoPlay={true} infiniteLoop={true}
          showThumbs={false} showArrows={true} showStatus={false}>
          {this.state.slides}
        </Carousel>
      </div>
    )
  }
}
