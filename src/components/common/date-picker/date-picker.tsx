import React from 'react';
// import { DatePickerInput } from 'rc-datepicker';
// import 'moment/locale/ru.js';
// import 'rc-datepicker/lib/style.css';
import './date-picker.scss';

const DatePicker = (props) => {
  const onChange = (jsDate, dateString) => {
    if (props.onChange) {
      props.onChange(jsDate, (dateString + ':00+03:00'));
    }
  }
  // const onClear = () => {
  //   if (props.onClear) {
  //     props.onClear();
  //   }
  // }
  // const disabled = props.disabled;
  // const formatDate = (d) => {
  //   const date = (new Date(d));
  //   if (date) {
  //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`
  //   }
  //   return date.toDateString();
  // }
  return (
    // <DatePickerInput
    //             disabled={disabled}
    //             displayFormat='YYYY-MM-DD'
    //             returnFormat='YYYY-MM-DD'
    //             className="react-datepicker-component smart-react-component"
    //             onChange={(jsDate, dateString) => onChange(jsDate, dateString)}
    //             onShow={() => {}}
    //             onHide={() => {}}
    //             showOnInputClick
    //             placeholder={props.placeholder}
    //             locale='ru'
    //             onClear={() => onClear()}
    //           />
    <input 
      type="datetime-local" 
      className="form-control" 
      value={props.value}
      onChange={(e) => { onChange(new Date(e.target.value), e.target.value) }} />
  );
}
export default DatePicker;