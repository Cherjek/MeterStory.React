import { TimeJournal } from './time-journal';

export class MeterJournalRequest {
  ids?: number[];
  time?: TimeJournal[];
  measures?: string[];
}
