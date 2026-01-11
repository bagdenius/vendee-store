import StoreEventCard from './StoreEventCard';

const events = [
  { id: 1, text: 'The GOAT device' },
  { id: 2, text: 'That was awesome' },
  { id: 3, text: 'Upcoming releases' },
];

export default function StoreEventsList() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
      {events.slice(0, 3).map((event) => (
        <StoreEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
