import React, { useState, useEffect } from 'react';
import './modal.scss';

const initialState = {
  isShown: false,
  value: null
}
const Modal = (props) => {
  const [state, updateState] = useState(initialState);
  const isShown = props.isShown;
  const headerText = props.headerText;
  const onOk = props.onOk;
  const onClose = props.onClose;
  const value = props.value;
  // const showModal = () => {
  //   setIsShown(true);
  // };
  const closeModal = () => {
    updateState({ ...state, isShown: false });
    onClose();
  };
  const ok = () => {
    onOk(state.value);
    closeModal();
  }
  const cancel = () => {
    closeModal();
  }
  const dynammicModalClass = () => (state.isShown ? { display: 'block' } : undefined);

  useEffect(() => {
    updateState({ ...state, value: value, isShown: isShown });
  }, [isShown]);

  // return isShown ? <h3>Modal content</h3> : null;
  return state.isShown ? (
    <div className="modal" style={dynammicModalClass()} id="channelModal">
      <div className="row">
        <div className="col">{headerText.toUpperCase()}</div>
        <div className="col-auto" onClick={() => cancel()}>X</div>
      </div>
      <div className="row">
        <div className="col">
          <textarea 
            value={state.value}
            onChange={(event) => updateState({ ...state, value: event.target.value })}/>
        </div>
      </div>
      <div className="row no-gutters-2 center">
        <div className="col-auto">
          <button
            className="btn btn-primary"
            onClick={() => ok()}
          >Сохранить</button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={() => cancel()}
          >Отмена</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;