import { MeterArchStorage } from './meter-arch-storage';

export class MeterArchTemplate {
  id?: number;
  type?: number | string;
  size?: number;
  free?: number;
  Storages?: MeterArchStorage[];
}