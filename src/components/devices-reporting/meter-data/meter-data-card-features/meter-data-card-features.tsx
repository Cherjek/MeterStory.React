import React from 'react';
import { MeterDataCardFeaturesService } from './services/meter-data-card-features-service';
import PeriodDataInfo from '../meter-data-info/shared/components/period-data-info/period-data-info';
import { _groupsTypeMeterDictionary } from '../../meter-settings/meter-settings-table/services/meter-settings-table-service';

const MeterDataCardFeatures = () => {
  return (
    <PeriodDataInfo
      data={{
        measureCode: 'aCons',
        tableHeader: 'Срезы профилей мощности',
        showDuration: true,
        service: MeterDataCardFeaturesService,
        groupsPu: [_groupsTypeMeterDictionary[0]]
      }}
    />
  );
};

export default MeterDataCardFeatures;
