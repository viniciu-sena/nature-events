import { useQuery } from '@tanstack/react-query';
import { FormEvent, useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { client } from '../../service/client';
import { optionsStore } from '../../store/options';
import { formatterData, formatterDate } from '../../utils/formatters';

export function useMain() {
  const {
    location,
    category,
    status,
    start,
    end,
    setStart,
    setEnd,
    setCategory,
    setLocation,
    setStatus,
  } = optionsStore((state) => state);
  const bbox = useMemo(() => location?.boundingbox?.join(','), [location]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dateStart = useMemo(() => formatterDate(start), [start]);
  const dateEnd = useMemo(() => formatterDate(end), [end]);

  const center: [number, number] = useMemo(() => {
    if (location?.lon) {
      return [Number(location.lat), Number(location.lon)];
    }
    return [0, 0];
  }, [location]);

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
  }, []);

  const { data: events, isLoading: eventLoading } = useQuery({
    queryKey: ['events', bbox, category, status, start, end],
    queryFn: () =>
      client.eonet.get({ limit: 500, bbox, category, status, start, end }),
    staleTime: 300000,
    select: formatterData,
  });

  return {
    events,
    location,
    center,
    searchRef,
    loading,
    eventLoading,
    category,
    status,
    dateStart,
    dateEnd,
    setEnd,
    setStart,
    setStatus,
    setCategory,
    handleSearch,
    handleResetLocation,
  };
}
