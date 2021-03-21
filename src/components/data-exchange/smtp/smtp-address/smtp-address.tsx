import React, { useEffect } from 'react';
import ButtonAsync from '../../../common/button-async/button-async';
import MessagePopup from '../../../common/message-popup/message-popup';
import './smtp-address.scss';
import { SmtpAddressService } from './services/smtp-address-service';
const initialState = {
  dataSource: null
};
const reducer = (state: any, action: any) => {
  return {...state, ...action};
};
const smtpAddressService = new SmtpAddressService();
const SmtpAddress = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const addRow = () => {
    const newRow = { id: 0, phones: [], emails: [] };
    const newSource = (state.dataSource as any[]) || [];
    newSource.unshift(newRow);
    setDataSource({ dataSource: newSource });
  }
  const removeRow = (index) => {
    const newSource = (state.dataSource as any[]);
    newSource.splice(index, 1);
    setDataSource({ dataSource: newSource });
  }
  const cellEdit = (event: any, index: number, field: string) => {
    const newSource = (state.dataSource as any[]);
    const row = newSource[index];
    row[field] = field === 'id' ?
      Number(event.target.value) :
      event.target.value;
    setDataSource({ dataSource: newSource });
  }
  const cellItemEdit = (event, index, field, indexItemField) => {
    const newSource = (state.dataSource as any[]);
    newSource[index][field][indexItemField] = event.target.value;
    setDataSource({ dataSource: newSource });
  }
  const cellEmailEdit = (event, index, indexEmail) => {
    cellItemEdit(event, index, 'emails', indexEmail);
  }
  const cellPhoneEdit = (event, index, indexPhone) => {
    cellItemEdit(event, index, 'phones', indexPhone);
  }
  const addItems = (index, field) => {
    const newSource = (state.dataSource as any[]);
    const data = newSource[index];
    data[field] = data[field] || [];
    data[field].push('');
    setDataSource({ dataSource: newSource });
  }
  const addPhone = (index) => {
    addItems(index, 'phones');
  }
  const addEmail = (index) => {
    addItems(index, 'emails');
  }
  const deleteItems = (index, field, indexItemField) => {
    const newSource = (state.dataSource as any[]);
    newSource[index][field].splice(indexItemField, 1);
    setDataSource({ dataSource: newSource });
  }
  const deleteEmail = (index, indexEmail) => {
    deleteItems(index, 'emails', indexEmail);
  }
  const deletePhone = (index, indexPhone) => {
    deleteItems(index, 'phones', indexPhone);
  }
  useEffect(() => {
    smtpAddressService
      .getData()
      .then(result => setDataSource({ dataSource: result?.map(r => ({ id: r.id, phones: r.Tel, emails: r.Email })) }))
      .catch((err) => setDataSource({ handleMessage: err }));
  }, []);
  return (
    <React.Fragment>
      {state.handleMessage ? (
        <MessagePopup
          message={state.handleMessage}
          close={() => setDataSource({ handleMessage: null })}
        />
      ) : (
        <></>
      )}
      <div className="scroll-container">
        <div className="scroll-view tab">
          <div className="row vertical group-panel">
            <div className="col">
              <label>{'Адресная книга'.toUpperCase()}</label>
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <h4 className="h4-color" onClick={() => addRow()}>
                    + ДОБАВИТЬ СТРОКУ
                  </h4>
                </div>
              </div>
              {state.dataSource?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="row no-gutters-2 bottom-margin">
                    <div className="col-auto">
                      <input
                        className="form-control"
                        type="number"
                        value={data.id}
                        style={{ maxWidth: 100 }}
                        onChange={(event) => cellEdit(event, index, 'id')}
                      />
                    </div>

                    <div className="col">
                      <div className="row no-gutters-2">
                        {data.emails?.map((email, indexEmail) => {
                          return (
                              <div key={indexEmail} className="col-auto bottom-margin">
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={email === '' ? undefined : email}
                                    onChange={(event) => cellEmailEdit(event, index, indexEmail)}
                                  />
                                  <div className="input-group-append">
                                    <span className="input-group-text delete" onClick={() => deleteEmail(index, indexEmail)}></span>
                                    <span className="input-group-text">@</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {data.phones?.map((phone, indexPhone) => {
                          return (
                            <div key={indexPhone} className="col-auto bottom-margin">
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={phone === '' ? undefined : phone}
                                  onChange={(event) => cellPhoneEdit(event, index, indexPhone)}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text delete" onClick={() => deletePhone(index, indexPhone)}></span>
                                  <span className="input-group-text">m</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="col-auto">
                          <div className="row no-gutters-2 center-v">
                            <div className="col-auto">+</div>
                            <div className="col-auto">
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => addPhone(index)}>m</button>
                            </div>
                            <div className="col-auto">
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => addEmail(index)}>@</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-auto">
                      <button onClick={() => removeRow(index)} className="btn btn-outline-circle button-action">X</button>
                    </div>

                  </div>
                );
              })}
            </div>
            <div className="col">
              <div className="row no-gutters-2 center">
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-primary"
                    content="Записать"
                    clickAsync={
                      () => smtpAddressService.saveData(state.dataSource)
                    }
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  />
                </div>
                <div className="col-auto">
                  <ButtonAsync
                    className="btn btn-outline-secondary"
                    content="Очистить"
                    clickAsync={
                      () => smtpAddressService.clearData().then(() => setDataSource({ dataSource: null }))
                    }
                    onMessage={(message: any) =>
                      setDataSource({ handleMessage: message })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SmtpAddress;