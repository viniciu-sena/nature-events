import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import EventIcon from '../../components/event-icon/EventIcon';
import { LabelWrapper } from '../../components/select/Select';
import { client } from '../../service/client';
import { eventsStore } from '../../store/events';
import { optionsStore } from '../../store/options';
import { EONETCategories } from '../../types/events';
import { translate } from '../../utils/translate';

export function useMain() {
  const {
    events,
    loading: eventLoading,
    setLoading: setEventLoading,
    setEvents,
  } = eventsStore((state) => state);
  const { location, category, setCategory, setLocation } = optionsStore(
    (state) => state,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const center: [number, number] = useMemo(() => {
    if (location?.lon) {
      return [Number(location.lat), Number(location.lon)];
    }
    return [0, 0];
  }, [location]);

  const categories = useMemo(
    () => [
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
    ],
    [],
  );

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const value = searchRef?.current?.value || null;

      if (value === null) return;

      setLoading(true);
      client.location
        .byFullName({ q: value })
        .then((response) => {
          const item = response.data?.[0];

          if (!item) {
            toast.warning('Endereço não encontrado');
            return;
          }

          setLocation(item);
        })
        .finally(() => setLoading(false));
    },
    [searchRef],
  );

  const handleResetLocation = useCallback(() => {
    setLocation(null);
    setEvents(null);
  }, []);

  useEffect(() => {
    if (location !== null && events !== null) return;
    const bbox = location?.boundingbox?.join(',');
    setEventLoading(true);
    client.eonet
      .get({ bbox, limit: 500, category })
      .then((response) => {
        setEventLoading(false);
        if (response.data.events) {
          setEvents(response.data.events);
        }
      });
  }, [location, category]);

  return {
    events,
    location,
    center,
    searchRef,
    loading,
    eventLoading,
    categories,
    category,
    setCategory,
    handleSearch,
    handleResetLocation,
  };
}
