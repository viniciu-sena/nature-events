import { Event } from '../../types/events';
import EventIcon from '../event-icon/EventIcon';

export default function EventMarker({ event }: { event: Event }) {
  return (
    <article className="relative group">
      <EventIcon category={event.categories?.[0]?.id} />

      <span className="absolute bottom-full left-1/2 transform -translate-x-[45%] mb-2  w-max px-2 py-1 text-sm text-white bg-gray-800 rounded-md shadow-md hidden group-hover:block">
        <span className="relative z-20">{event.title || 'Nada informado'}</span>
        <span className="absolute left-1/2 transform -translate-x-[45%] -bottom-1 w-3 h-3 bg-gray-800 rotate-45 z-0"></span>
      </span>
    </article>
  );
}
