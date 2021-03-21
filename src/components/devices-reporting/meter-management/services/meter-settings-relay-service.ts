import { Fetch } from '../../../../core/service';
export class MeterSettingsRelayService extends Fetch {
  constructor() {
    super('/meter/settings/relay');
  }
  saveData(body: any) {
    const params = {
      id: body.id,
      relayId: Number(body.relayId),
      relayState: Number(body.relayState),
    };
    return super.save(params);
  }
}