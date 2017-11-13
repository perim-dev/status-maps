import React from 'react'

import '../../css/linha-marquee.css'

export default props => {
  const cor = `${props.cor}`
  return (
  <div className="linha-marquee marquee">
    <span className={cor}>{props.texto}</span>
  </div>
  )
}
