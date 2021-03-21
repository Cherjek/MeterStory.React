import React from 'react';
import PeriodDataInfo from '../../../meter-data-info/shared/components/period-data-info/period-data-info';
import { MeterDataSlicesConfigService } from './services/meter-data-slices-config-service';

const MeterDataSlicesConfig = () => {
  return (
    <div className="main-content">
      <div className="col">
        <PeriodDataInfo
          data={{
            measureCode: 'aCfg',
            showDuration: true,
            tableHeader: 'Срезы аппаратной конфигурации',
            service: MeterDataSlicesConfigService
          }}
        />
      </div>
    </div>
  );
};

export default MeterDataSlicesConfig;
