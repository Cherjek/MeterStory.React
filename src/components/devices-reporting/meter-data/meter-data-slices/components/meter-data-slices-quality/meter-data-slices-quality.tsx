import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';
import { MeterDataQualityService } from '../../../meter-data-quantity/services/meter-data-quality-service';

const MeterDataSlicesQuality = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aQual',
        showDuration: true,
        tableHeader: 'Срезы показателей качества сети',
        service: MeterDataQualityService
      }}
    />
  );
};
export default MeterDataSlicesQuality;
