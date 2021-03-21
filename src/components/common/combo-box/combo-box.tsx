import React, { useState, useEffect } from 'react';
import './combo-box.scss';

const initialState = {
  inputText: '',
  filter: null,
  dataSource: null,
  defSelectValue: null
}
const ComboBox = (props) => {
  const [state, updateState] = useState(initialState);
  const uniqueId = 'comboPopup' + (props.uniqueId || '') + new Date().getTime();
  // const keyField = props.keyField;
  const valueField = props.valueField;
  const dataSource = props.dataSource;
  const defSelectValue = props.defSelectValue;
  const onSelected = props.onSelected;
  const update = (val) => {
    updateState({ ...state, ...val });
  }
  const onFocus = () => {
    const element = document.getElementById(uniqueId);
    element.className = 'combo-popup show';
  }
  const onBlur = () => {
    const element = document.getElementById(uniqueId);
    if (element) element.className = 'combo-popup hide';
  }
  const onSelectedItem = (val) => {
    if (onSelected) {
      onSelected(val);
    }
    update({ inputText: val[valueField] });
    onBlur();
  }
  const setDefState = () => {
    update({
      dataSource,
      defSelectValue,
      inputText: defSelectValue != null ? defSelectValue[valueField] : undefined
    });
  }
  window.onclick = () => {
    onBlur();
  }
  useEffect(() => setDefState(), []);// [dataSource, defSelectValue, valueField]);
  return (
    <React.Fragment>
      <div className="container-combobox" onClick={(event) => event.stopPropagation()}>
        <input
          className="form-control"
          type="text"
          value={state.inputText}
          onFocus={onFocus}
          onChange={event => update({inputText: event.target.value, filter: event.target.value})}
        />
        <div id={uniqueId} className="combo-popup hide">
          <ul>
            {
              dataSource
              ?.filter(d => state?.filter == null || state?.filter === '' ? true : (d[valueField] as string).includes(state?.filter))
              ?.map((d, index) => {
                return <li key={index} onClick={(event) => onSelectedItem(d)}>{d[valueField]}</li>
              })
            }
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ComboBox;