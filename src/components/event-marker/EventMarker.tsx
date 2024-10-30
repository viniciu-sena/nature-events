import { Event } from '../../types/events';
import EventIcon from '../event-icon/EventIcon';

export default function EventMarker({ event }: { event: Event }) {
  return (
    <article title={event.title || 'Nada informado'}>
      {<EventIcon category={event.categories?.[0]?.id} />}
    </article>
  );
}
