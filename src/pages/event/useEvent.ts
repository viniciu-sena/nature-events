import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../service/client';
import { formatterSingleData } from '../../utils/formatters';

export function useEvent() {
  const { id } = useParams();

  const shareMessage = useMemo(() => {
    return window.location.href;
  }, []);

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [id],
    queryFn: () => client.eonet.event(id as string),
    select: (response) => formatterSingleData(response.data),
    staleTime: 300000,
    retry: false,
  });

  const center = useMemo(() => {
    if (event) {
      const { coordinates } = event.geometry[0];
      return coordinates ? coordinates.reverse() : [0, 0];
    }
    return [0, 0];
  }, [event]);

  const { data: location } = useQuery({
    queryKey: [`location-${center}`, center],
    queryFn: () => client.location.reverse({ lat: center[0], lon: center[1] }),
    select: (response) => response.data,
    staleTime: 300000,
  });

  return {
    event,
    isLoading,
    shareMessage,
    center,
    isError,
    location,
  };
}
