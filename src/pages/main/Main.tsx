import { Globe, MagnifyingGlass, Spinner } from '@phosphor-icons/react';
import L from 'leaflet';
import { memo } from 'react';
import { renderToString } from 'react-dom/server';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../../components/date-picker/DatePicker';
import EventMarker from '../../components/event-marker/EventMarker';
import FormLabel from '../../components/form-label/FormLabel';
import Loading from '../../components/loading/Loading';
import { Select } from '../../components/select/Select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { EONETCategories, EventRequest } from '../../types/events';
import { categories, statusList } from '../../utils/selectItems';
import { useMain } from './useMain';

function Main() {
  const {
    events,
    center,
    loading,
    searchRef,
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
  } = useMain();
  const navigate = useNavigate();

  return (
    <>
      <header className="grid grid-cols-1 gap-4">
        <form
          className="w-full flex flex-col md:flex-row justify-start items-center gap-2"
          onSubmit={handleSearch}
        >
          <FormLabel label="Status" className="w-full md:w-1/6">
            <Select
              value={status}
              onChange={(item) => setStatus(item as EventRequest['status'])}
              items={statusList}
              placeholder="Selecione um status"
            />
          </FormLabel>
          <FormLabel label="Categoria" className="w-full md:w-1/6">
            <Select
              value={category}
              onChange={(item) => setCategory(item as EONETCategories)}
              items={categories}
              placeholder="Selecione uma categoria"
            />
          </FormLabel>
          <FormLabel label="Data inicial" className="w-full md:w-1/6">
            <DatePicker
              value={dateStart}
              onChange={setStart}
              maxDate={dateEnd}
              placeholder="Data inicial"
              className="w-full"
            />
          </FormLabel>
          <FormLabel label="Data final" className="w-full md:w-1/6">
            <DatePicker
              value={dateEnd}
              onChange={setEnd}
              minDate={dateStart}
              placeholder="Data final"
              className="w-full"
            />
          </FormLabel>
          <FormLabel label="Região" className="w-full md:w-1/2">
            <div className="flex gap-2 w-full">
              <Input
                className="focus:border-none w-full"
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
            </div>
          </FormLabel>
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
          {events !== undefined &&
            events.map((event) => (
              <Marker
                key={event.id}
                position={
                  event.geometry?.[0]?.coordinates?.reverse() as L.LatLngExpression
                }
                icon={L.divIcon({
                  html: renderToString(<EventMarker event={event} />),
                })}
                eventHandlers={{
                  click: () => navigate(event.id),
                }}
              />
            ))}
        </MapContainer>
      </main>
    </>
  );
}

export default memo(Main);
