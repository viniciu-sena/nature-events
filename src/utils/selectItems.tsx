import EventIcon from '../components/event-icon/EventIcon';
import { LabelWrapper } from '../components/select/Select';
import { EONETCategories } from '../types/events';
import { translate } from './translate';

export const categories = [
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.drought} size={16} />
        <label>{translate.categoriesPT.drought}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.drought,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.dustHaze} size={16} />
        <label>{translate.categoriesPT.dustHaze}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.dustHaze,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.earthquakes} size={16} />
        <label>{translate.categoriesPT.earthquakes}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.earthquakes,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.floods} size={16} />
        <label>{translate.categoriesPT.floods}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.floods,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.landslides} size={16} />
        <label>{translate.categoriesPT.landslides}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.landslides,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.manmade} size={16} />
        <label>{translate.categoriesPT.manmade}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.manmade,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.seaLakeIce} size={16} />
        <label>{translate.categoriesPT.seaLakeIce}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.seaLakeIce,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.severeStorms} size={16} />
        <label>{translate.categoriesPT.severeStorms}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.severeStorms,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.snow} size={16} />
        <label>{translate.categoriesPT.snow}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.snow,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.tempExtremes} size={16} />
        <label>{translate.categoriesPT.tempExtremes}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.tempExtremes,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.volcanoes} size={16} />
        <label>{translate.categoriesPT.volcanoes}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.volcanoes,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.waterColor} size={16} />
        <label>{translate.categoriesPT.waterColor}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.waterColor,
  },
  {
    label: (
      <LabelWrapper>
        <EventIcon category={EONETCategories.wildfires} size={16} />
        <label>{translate.categoriesPT.wildfires}</label>
      </LabelWrapper>
    ),
    value: EONETCategories.wildfires,
  },
];

export const statusList = [
  {
    label: 'Todos',
    value: 'all',
  },
  {
    label: 'Agora',
    value: 'open',
  },
  {
    label: 'Encerrado',
    value: 'closed',
  },
];
