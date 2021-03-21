import React from 'react';
import ButtonAsync from '../common/button-async/button-async';
import MessagePopup from '../common/message-popup/message-popup';
import { FileUploadService } from './services/upload-service';
const initialState = {
  dataSource: null,
};
const reducer = (state: any, action: any) => {
  return { ...state, ...action };
};
const UpdateVpo = () => {
  const [state, setDataSource] = React.useReducer(reducer, initialState);
  const fileUpload = (name, e) => {
    if (e.target.files && e.target.files.length) {
      const data = {};
      data[name] = e.target.files[0];
      setDataSource(data);
    }
  }
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
      <div className="main-content">
        <div className="col">
          <div className="scroll-container">
            <div className="scroll-view">
              <div className="row vertical group-panel">
                <div className="col">
                  <label>{'Обновление ВПО UM31SMART'.toUpperCase()}</label>
                </div>
                <div className="col">
                  <div className="row no-gutters-2 center-v">
                    <div className="col-auto">
                      {/* <form
                        encType="multipart/form-data"
                        method="post"
                        action="http://192.168.202.230/upload/firmware"
                      >
                        <input type="file" name="file" className="btn btn-primary" />
                        &nbsp;&nbsp;&nbsp;
                        <input
                          className="btn btn-outline-secondary"
                          type="submit"
                          value="Загрузка файла ВПО UM31SMART"
                        />
                      </form> */}

                      <input type="file" name="fileOne" style={{ display: 'none' }} onChange={(e) => fileUpload('fileOne', e)} />
                      <button className="btn btn-primary" onClick={() => { document.getElementsByName('fileOne')[0].click() }}>Выберите файл</button>
                      &nbsp;&nbsp;&nbsp;
                      { state.fileOne ? state.fileOne.name : undefined }
                      &nbsp;&nbsp;&nbsp;
                      <ButtonAsync 
                        disabled={state.fileOne == null}
                        className="btn btn-outline-secondary"
                        content="Загрузка файла ВПО UM31SMART"
                        clickAsync={() => (new FileUploadService('/upload/firmware')).upload(state.fileOne)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row vertical group-panel">
                <div className="col">
                  <label>{'Обновление загрузчика'.toUpperCase()}</label>
                </div>
                <div className="col">
                  <div className="row no-gutters center-v">
                    <div className="col-auto">
                      <input type="file" name="fileTwo" style={{ display: 'none' }} onChange={(e) => fileUpload('fileTwo', e)} />
                      <button className="btn btn-primary" onClick={() => { document.getElementsByName('fileTwo')[0].click() }}>Выберите файл</button>
                      &nbsp;&nbsp;&nbsp;
                      { state.fileTwo ? state.fileTwo.name : undefined }
                      &nbsp;&nbsp;&nbsp;
                      <ButtonAsync 
                        disabled={state.fileTwo == null}
                        className="btn btn-outline-secondary"
                        content="Загрузка файла загрузчика"
                        clickAsync={() => (new FileUploadService('/upload/loader')).upload(state.fileTwo)}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="col-auto">
                      <ButtonAsync 
                        className="btn btn-outline-secondary"
                        content="Обновление загрузчика"
                        clickAsync={() => (new FileUploadService('/action/update/loader')).updateLoader()}
                        onMessage={(message: any) => setDataSource({ handleMessage: message}) }                
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UpdateVpo;
