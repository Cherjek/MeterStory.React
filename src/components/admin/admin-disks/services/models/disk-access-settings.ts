export class DiskAccessSettings {
  id?: number;
  read?: boolean;
  write?: boolean;
}
export class DiskSettings {
  Settings?: DiskAccessSettings[];
}