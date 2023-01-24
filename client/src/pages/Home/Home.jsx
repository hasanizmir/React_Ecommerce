import React from 'react'

import './Home.scss'
import Slider from '../../components/Slider/Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'

const Home = () => {
  return (
    <div className='home'>
      <Slider />
      <FeaturedProducts type="featured" />
      <FeaturedProducts type="trending" />
    </div>
  )
}

export default Home