import React from 'react'
import Popup from 'reactjs-popup'

const EventForm = (props) => {
  return (
    <Popup 
      open={props.visible}
      modal
      position='center center'
      closeOnDocumentClick
      onClose={() => props.setVisible(false)}
    >
      <span>
        Hello
      </span>
    </Popup>
  )
}

export default EventForm