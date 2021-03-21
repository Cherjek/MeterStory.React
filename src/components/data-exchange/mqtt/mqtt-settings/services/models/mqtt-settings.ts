export class MqttSettings {
  id?: number;
	type?: number | string;
	addr?: string;
	port?: number;
	login?: string;
	password?: string;
	prefix?: string;
	deviceID?: string;
	crypto?: number | string;
	certCheck?: boolean;
	cert?: string;
}