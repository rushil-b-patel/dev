import React from 'react'
import CircularGallery from '../components/CircularGallery'

function Gallery() {
  return (
    <div style={{ height: '700px', position: 'relative' }}>
        <CircularGallery bend={3} borderRadius={0.05} scrollEase={0.02}/>
    </div>
  )
}

export default Gallery