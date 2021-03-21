import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';
import { MeterDataSlicesConfigService } from './services/meter-data-slices-config-service';

const MeterDataSlicesConfig = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aCfg',
        showDuration: true,
        tableHeader: 'Срезы аппаратной конфигурации',
        service: MeterDataSlicesConfigService
      }}
    />
  );
};

export default MeterDataSlicesConfig;
