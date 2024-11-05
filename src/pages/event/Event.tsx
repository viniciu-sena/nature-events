import {
  ArrowLeft,
  FacebookLogo,
  TwitterLogo,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import EventIcon from '../../components/event-icon/EventIcon';
import EventMarker from '../../components/event-marker/EventMarker';
import Loading from '../../components/loading/Loading';
import NotFound from '../../components/not-found/NotFound';
import { EONETCategories, Event as EventType } from '../../types/events';
import { useEvent } from './useEvent';

export default function Event() {
  const { event, isLoading, shareMessage, center, isError, location } =
    useEvent();

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      {isLoading ? (
        <Loading className="h-[60vh] w-full" />
      ) : (
        <article className="flex flex-col gap-4 w-full md:w-1/2 mx-auto">
          {/* Header */}
          <header className="flex gap-4 justify-between items-center">
            <aside className="flex justify-start items-center gap-2 relative">
              <Link
                to="/"
                className="text-xs opacity-70 font-normal hover:underline absolute mb-20 md:mb-16 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Voltar a página principal</span>
              </Link>
              <EventIcon
                category={event?.categories[0].id as EONETCategories}
              />
              <h1 className="font-semibold text-lg">{event?.title}</h1>
            </aside>
            <aside className="flex items-center gap-2 mt-4">
              <FacebookShareButton
                url={shareMessage}
                title="Ei, veja o que ocorreu"
              >
                <FacebookLogo size={28} />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareMessage}
                title="Ei, veja o que ocorreu"
              >
                <TwitterLogo size={28} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={shareMessage}
                title="Ei, veja o que ocorreu"
              >
                <WhatsappLogo size={28} />
              </WhatsappShareButton>
            </aside>
          </header>
          {/* Content */}
          <main>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <aside className="flex flex-col gap-2">
                <LabelValue
                  label="Status"
                  value={event?.closed ? 'Encerrado' : 'Em andamento'}
                />
                <LabelValue
                  label="Data"
                  value={
                    event?.geometry[0].date
                      ? format(new Date(event?.geometry[0].date), 'PPP', {
                          locale: ptBR,
                        })
                      : null
                  }
                />
                {event?.closed && (
                  <LabelValue
                    label="Conclusão"
                    value={
                      event?.closed
                        ? format(new Date(event?.closed), 'PPP', {
                            locale: ptBR,
                          })
                        : null
                    }
                  />
                )}
              </aside>
              <aside className="flex flex-col gap-2">
                <label className="text-sm font-normal opacity-80">
                  Descrição
                </label>
                <span className="font-normal">
                  {event?.description || 'Não informado'}
                </span>
              </aside>
            </section>
            <MapContainer
              center={center as L.LatLngExpression}
              zoom={10}
              scrollWheelZoom
              className="h-[40vh] mt-4 w-full shadow-lg rounded z-0"
            >
              <TileLayer
                noWrap={true}
                minZoom={3}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={center as L.LatLngExpression}
                icon={L.divIcon({
                  html: renderToString(
                    <EventMarker event={event as EventType} />,
                  ),
                })}
              />
            </MapContainer>
            {location && location.display_name}
          </main>
        </article>
      )}
    </>
  );
}

function LabelValue({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm font-normal opacity-80">{label}</label>
      <span className="font-normal">
        {value && value !== null ? value : 'Não informado'}
      </span>
    </div>
  );
}
