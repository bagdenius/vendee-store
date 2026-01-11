import StoreEventCard from './StoreEventCard';

const events = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function StoreEventsList() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
      {events.slice(0, 3).map((event, i) => (
        <StoreEventCard key={i} event={event} />
      ))}
    </div>
  );
}
