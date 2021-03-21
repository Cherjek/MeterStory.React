import { IFormTemplateService } from './iform-template-service';
import { DataGridColumn } from '../../common/data-grid/columns';
import { DataGridSettings } from '../../common/data-grid/data-grid-settings';
export interface IFormTemplate {
  service: IFormTemplateService<any>;
  gridColumns: DataGridColumn[];
  gridSettings: DataGridSettings;
  headerText: string;
}