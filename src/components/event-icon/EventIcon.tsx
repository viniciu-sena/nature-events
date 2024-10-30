import {
  Activity,
  CloudFog,
  CloudLightning,
  CloudRain,
  DropHalfBottom,
  Factory,
  Fire,
  MapPin,
  Meteor,
  Mountains,
  Snowflake,
  SunHorizon,
  Thermometer,
} from '@phosphor-icons/react';
import { useMemo } from 'react';
import { EONETCategories } from '../../types/events';
export default function EventIcon({
  category,
  size = 32,
}: {
  category?: EONETCategories;
  size?: number;
}) {
  const icon = useMemo(() => {
    switch (category) {
      case EONETCategories.drought:
        return <SunHorizon size={size} color="#ffc107" weight="duotone" />;
      case EONETCategories.dustHaze:
        return <CloudFog size={size} color="#b0b0b0" weight="duotone" />;
      case EONETCategories.earthquakes:
        return <Activity size={size} color="#ff6e4a" weight="duotone" />;
      case EONETCategories.floods:
        return <CloudRain size={size} color="#409eff" weight="duotone" />;
      case EONETCategories.landslides:
        return <Mountains size={size} color="#9e7240" weight="duotone" />;
      case EONETCategories.manmade:
        return <Factory size={size} color="#707070" weight="duotone" />;
      case EONETCategories.seaLakeIce:
        return <Snowflake size={size} color="#66d9ef" weight="duotone" />;
      case EONETCategories.severeStorms:
        return <CloudLightning size={size} color="#ff8c00" weight="duotone" />;
      case EONETCategories.snow:
        return <Snowflake size={size} color="#f0f0f0" weight="duotone" />;
      case EONETCategories.tempExtremes:
        return <Thermometer size={size} color="#ff7043" weight="duotone" />;
      case EONETCategories.volcanoes:
        return <Meteor size={size} color="#ff5f57" weight="duotone" />;
      case EONETCategories.waterColor:
        return <DropHalfBottom size={size} color="#3caea3" weight="duotone" />;
      case EONETCategories.wildfires:
        return <Fire size={size} color="#ff5a36" weight="duotone" />;
      default:
        return <MapPin size={size} color="#00aaff" weight="fill" />;
    }
  }, [category, size]);

  return icon;
}
