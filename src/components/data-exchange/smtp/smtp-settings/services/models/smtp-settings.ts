export class SmtpSettings {
  id?: number;
	addr?: string;
	port?: number;
	login?: string;
	password?: string;
	auth?: number | string;
	crypto?: number | string;
	certCheck?: boolean;
	cert?: string;
	from?: string;
}