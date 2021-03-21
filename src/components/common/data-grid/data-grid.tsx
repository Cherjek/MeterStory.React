import React from 'react';
import { 
  DataGridColumn, 
  DataGridComboboxColumn, 
  DataGridColumnType, 
  DataGridComboboxColumnCallback 
} from './columns';
import { DataGridSettings } from './data-grid-settings';
import OrderBy from '../../../core/order';
import './data-grid.scss';
import { ICallbackColumnService } from './icallback-service';
import DatePicker from '../date-picker/date-picker';

class DataGridColumnEx extends DataGridColumn {
  asc?: boolean;
}
class DataGridColumnAction {

}
const initialState = {
  dataSource: null
}
const reducer = (state: any, action: any) => {
  return {
    ...state,
    ...action
  };
}
const DataGrid = (props: any) => {
  const [state, updateDataSource] = React.useReducer(reducer, initialState);
  const columns: DataGridColumnEx[] = [...props.columns, new DataGridColumnAction()];
  const settings: DataGridSettings = props.settings || new DataGridSettings();
  const onCellEdit = props.onCellEdit;
  const onDelete = props.onDelete;
  React.useEffect(() => {
    if (state.dataSource == null) updateDataSource({dataSource: props.dataSource});
    if (state.dataSource != null) updateColumnCallbackAfterInit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataSource, state.dataSource])
  const updateColumnCallback = (row, index: number, col: DataGridComboboxColumnCallback) => {
    if (col.parent) {
      //
    } else if (col.child) {
      if (col.child instanceof Array) {
        col.child.forEach(ch => row[ch] = typeof row[ch] === 'string' ? '' : undefined);
      }
      else row[col.child] = undefined;
    }
  }
  const updateColumnCallbackAfterInit = () => {
    (state.dataSource as any[])?.map((data, index) => {
      const callbackServices = [];
      const callBackColumns = [];
      columns?.map(col => {
        if (col instanceof DataGridComboboxColumnCallback && col.values == null) {
          const newSource = (state.dataSource as any[]);
          const row = newSource[index];
          const val = col.parent ? row[col.parent] : col.code;
          callBackColumns.push(val);
          callbackServices.push(col.source?.service);
        }
      });
      Promise.all(
        callbackServices?.map(
          (service, index) => (service as ICallbackColumnService).getData(callBackColumns[index])
        )
      )
      .then(
        (result: [any[]]) => {
          const callbackValues = state.callbackValues || {};
          result.map((value: any[], index: number) => {
            callbackValues[callBackColumns[index]] = value;
          });
          updateDataSource({ callbackValues });
        }
      )
    });
  }
  const setComboboxColumnCallbackValues = (index: number, col: DataGridComboboxColumnCallback) => {
    const newSource = (state.dataSource as any[]);
    const row = newSource[index];
    const val = col.parent ? row[col.parent] : col.code;
    col.source?.service
      ?.getData(val)
      .then((result) => {
        const callbackValues = state.callbackValues || {};
        callbackValues[val] = result;
        updateDataSource({ callbackValues });
      });
  }
  const validateInput = (event: any, index: number, col: DataGridColumn) => {
    const dataSource = (state.dataSource as any[]);
    const row = dataSource[index];
    if (col.inputRules != null) {
      if (col.inputRules && col.inputRules.length) {
        return col.inputRules.every(ir => {
          if (ir.valDependOn instanceof Array ? 
            ir.valDependOn.some(vl => vl === row[ir.fieldDependOn]) 
            : row[ir.fieldDependOn] === ir.valDependOn) {
            return new RegExp(ir.ruleRegex).test(`${event.target.value}`);
          } else return true;
        })
      }
    }
    return true;
  }
  const cellEdit = (event: any, index: number, col: DataGridColumn) => {
    
    if (!validateInput(event, index, col)) return;
    
    const dataSource = (state.dataSource as any[]);
    const row = dataSource[index];
    if (col instanceof DataGridComboboxColumnCallback) {
      updateColumnCallback(row, index, col);
    }
    row[col.code] = col.type === DataGridColumnType.Bool ?
      Boolean(event.target.checked) :
      col.type === DataGridColumnType.Int || col.type === DataGridColumnType.Decimal ?
      (() => {
        if (event.target.value !== '') {
          const valNumber = Number(event.target.value);
          if (!isNaN(valNumber)) {
            return valNumber;
          }
        }
        return event.target.value;
      })() :
      event.target.value;
    updateDataSource({dataSource});
    if (onCellEdit) onCellEdit({ event, row, col });
  }
  const orderBy = new OrderBy();
  const sort = (col: DataGridColumnEx) => {
    const newSource = (state.dataSource as any[]);
    state.columns = state.columns || columns;

    const colState = state.columns.find((c: DataGridColumnEx) => c.code === col.code);
    colState.asc = colState.asc === undefined ? true : !colState.asc;
    updateDataSource({dataSource: orderBy.transform(newSource, col.code, colState.asc)});
  }
  const removeRow = (index: number) => {
    const dataSource = (state.dataSource as any[]);
    const copy = {...dataSource[index]};
    dataSource.splice(index, 1);
    updateDataSource({dataSource});
    if (onDelete) onDelete(copy);
  }
  const findMaxId = () => {
    const arrayNumber = ((state.dataSource as any[]) || [])
      .map(data => Number(data.id));
    const max = Math.max(...(arrayNumber && arrayNumber.length ? arrayNumber : [0]));
    return max + 1;
  }
  const addRow = () => {
    const newRow: any = {};
    columns
      ?.filter(col => !(col instanceof DataGridColumnAction))
      ?.forEach(col => {
      newRow[col.code] =
          col.defVal !== undefined ? col.defVal :
          col.type === DataGridColumnType.Decimal || col.type === DataGridColumnType.Int ? 
          (col.code === 'id') ? findMaxId() : 0
        :
        col.type === DataGridColumnType.Bool ? false :
        '';
      return newRow;
    });
    const dataSource = (state.dataSource as any[]) || [];
    dataSource.unshift(newRow);
    updateDataSource({dataSource});
  }
  return (
    <React.Fragment>
      {
        (!settings.readOnly && settings.isRowAdd) ?
          <div className="row no-gutters-2 center">
            <div className="col-auto">
              <h4 className="h4-color" onClick={() => addRow()}>+ ДОБАВИТЬ СТРОКУ</h4>
            </div>
          </div> : <></>
      }
      <div className={ settings.isHorizontalScroll ? 'scroll-view-horizontal' : '' }>
        <table className="grid">
          <thead>
            <tr>
              {
                columns
                  ?.filter(col => !settings.readOnly ? true : !(col instanceof DataGridColumnAction))
                  ?.map((col, index) =>
                  (col instanceof DataGridColumnAction) ? <th key={index}></th>
                    :
                  <th style={ col.width ? { width: col.width, maxWidth: col.width, minWidth: col.width } : undefined}
                      key={col.code}
                      onClick={() => sort(col)}>
                        <label>{col.name} {col.asc != null ? col.asc ? <>&#9650;</> : <>&#9660;</> : ''}</label>
                  </th>
                )
              }
            </tr>
          </thead>

          <tbody>
            {state.dataSource?.map((data: any, index: number) => {
              return (
                <tr className={ settings.readOnly ? 'readOnlyRow' : undefined} key={index}>
                  {columns
                  ?.filter(col => !settings.readOnly ? true : !(col instanceof DataGridColumnAction))
                  ?.map((col: DataGridColumn, indexCol) => {
                    if (col instanceof DataGridColumnAction) {
                      return <td key={index + indexCol} className="col-action">
                          {
                            settings.isRowDelete ?
                              <button onClick={() => removeRow(index)} className="btn btn-outline-circle button-action">X</button>
                            : <></>
                          }
                        </td>;
                    } else {
                      const val = data[col.code];
                      return (
                        <td
                          className={ col.disabledRules != null ? (data[col.disabledRules.field] === col.disabledRules.val ? 'disabled-tag' : undefined) : undefined }
                          style={ col.width ? { width: col.width, maxWidth: col.width, minWidth: col.width } : undefined}
                          key={col.code}>
                          {
                            settings.readOnly ? <div>{val}</div>
                            :
                            col.type === DataGridColumnType.Int ||
                              col.type === DataGridColumnType.Decimal ? (
                                <input
                                  className="form-control"
                                  type="number"
                                  value={val}
                                  onChange={event => cellEdit(event, index, col)}
                                />
                              ) : col.type === DataGridColumnType.DateTime ? (
                                <DatePicker
                                  value={val}
                                  onChange={(jsDate, dateString) => cellEdit({event: { target: { value: jsDate } }}, index, col)}
                                />
                              ) : col.type === DataGridColumnType.Bool ? (
                                <input
                                  className="form-control"
                                  type="checkbox"
                                  checked={val}
                                  onChange={event => cellEdit(event, index, col)}
                                />
                              ) : col.type === DataGridColumnType.Combobox ? (
                                (col instanceof DataGridComboboxColumnCallback && col.values == null) ?
                                <select
                                  className="form-control"
                                  value={val}
                                  onFocus={() => setComboboxColumnCallbackValues(index, col)}
                                  onChange={event => cellEdit(event, index, col)}
                                >
                                  {(state.callbackValues || {})[col.parent ? data[col.parent] : col.code]?.map((item, indexValCombo) => (
                                    <option key={indexValCombo} value={item}>{item}</option>
                                  ))}
                                </select>
                                :
                                <select
                                  className="form-control"
                                  value={val}
                                  onChange={event => cellEdit(event, index, col)}
                                >
                                  {(col as DataGridComboboxColumn)?.values?.map((item, indexValCombo) => (
                                    <option key={indexValCombo} value={item}>{item}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  className="form-control"
                                  type="text"
                                  value={val}
                                  onChange={event => cellEdit(event, index, col)}
                                />
                              )
                          }
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default DataGrid;