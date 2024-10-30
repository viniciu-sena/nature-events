import { Globe, MagnifyingGlass, Spinner } from '@phosphor-icons/react';
import L from 'leaflet';
import { memo } from 'react';
import { renderToString } from 'react-dom/server';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import EventMarker from '../../components/event-marker/EventMarker';
import Loading from '../../components/loading/Loading';
import { Select } from '../../components/select/Select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { EONETCategories } from '../../types/events';
import { useMain } from './useMain';

function Main() {
  const {
    events,
    center,
    loading,
    searchRef,
    eventLoading,
    categories,
    category,
    setCategory,
    handleSearch,
    handleResetLocation,
  } = useMain();

  return (
    <>
      <header className="grid grid-cols-1 gap-4">
        <form
          className="w-full flex justify-start items-center gap-2"
          onSubmit={handleSearch}
        >
          <Select
            value={category}
            onChange={(item) => setCategory(item as EONETCategories)}
            items={categories}
            className="min-w-fit"
            placeholder="Selecione uma categoria"
          />
          <Input
            className="focus:border-none w-1/3"
            ref={searchRef}
            placeholder="econtre sua cidade..."
          />
          <Button
            variant="default"
            type="submit"
            className="transition-all duration-300 disabled:cursor-not-allowed"
            disabled={loading}
            aria-label="Pesquisar"
            title="Pesquisar"
          >
            {loading ? (
              <Spinner className="animate-spin" size={32} />
            ) : (
              <MagnifyingGlass weight="bold" size={32} />
            )}
          </Button>
          <Button
            variant="default"
            type="reset"
            className="transition-all duration-300 disabled:cursor-not-allowed"
            disabled={loading}
            onClick={handleResetLocation}
            aria-label="Voltar ao map mundi"
            title="Voltar ao map mundi"
          >
            <Globe size={32} />
          </Button>
        </form>
      </header>
      <main className="h-full w-full relative m-auto flex justify-start pt-4">
        {eventLoading && <Loading className="absolute h-[86vh] w-full" />}
        <MapContainer
          center={center}
          zoom={2}
          scrollWheelZoom
          className="h-[86vh] w-full shadow-lg rounded z-0"
          ref={(ref) => {
            if (ref && center) {
              ref.setView(center, center[0] !== 0 && center[1] !== 0 ? 10 : 2);
            }
          }}
        >
          <TileLayer
            noWrap={true}
            minZoom={3}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events !== null &&
            events?.map((event) => (
              <Marker
                key={event.id}
                position={
                  event.geometry?.[0]?.coordinates?.reverse() as L.LatLngExpression
                }
                icon={L.divIcon({
                  html: renderToString(<EventMarker event={event} />),
                })}
              />
            ))}
        </MapContainer>
      </main>
    </>
  );
}

export default memo(Main);
