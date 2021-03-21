import React from 'react';
import './message-popup.scss';

const MessagePopup = (props: any) => {
  setTimeout(() => props.close(), props.time || 3000);
  return (
    <div className={'row no-gutters-2 center message-popup ' + props.message.code }>
      <div className="col-auto">{props.message.text}</div>
      <div className="col-auto">
        <button onClick={() => props.close()} className="btn btn-outline-circle button-action">X</button>
      </div>      
    </div>
  );
}
export default MessagePopup;