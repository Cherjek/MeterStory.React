import React from "react";

const initialState = {
  startAsync: false,
  message: null
}
const ButtonAsync = (props: any) => {
  // public props:
  // clickAsync - асинхронный метод
  // onComplete - успешно
  // onError - ошибка,
  // className - class style
  // content - содержимое кнопки
  // onMessage
  const [state, update] = React.useState(initialState);
  const clickAsync = props.clickAsync;
  const onMessage = props.onMessage;
  const loading = (s: boolean) => {
    update({...state, startAsync: s});
  }
  const setMessage = (message: any) => {
    onMessage(message);
  }
  const click = () => {    
    loading(true);
    clickAsync()
      .then((res: any) => setMessage({ code: 'success', text: 'Успешно' }) )
      .catch((error: any) => setMessage({ code: 'error', text: error.message }) )
      .finally(() => loading(false));
  }
  return (
    <React.Fragment>
      <button 
        disabled={state.startAsync || props.disabled}
        onClick={() => click()} 
        className={props.className}>
        {state.startAsync ? 'Загрузка...' : props.content}
      </button>
    </React.Fragment>
  );
}
export default ButtonAsync;