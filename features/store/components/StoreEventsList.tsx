import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/Carousel';
import StoreEventCard from './StoreEventCard';

const mockEvents = [
  // { id: 1, text: 'Here You will get what you want', isMain: true },
  {
    id: '6e60c137-5010-465f-a484-37e41de274e7',
    text: 'The GOAT device and some text that i write here to test text wrapping on that component',
  },
  {
    id: '12fc2e41-ecf6-432a-be58-8e36a795dd8d',
    text: 'Just use AI and call it a day',
  },
  {
    id: '6387f43b-15bf-4800-8d9a-e1ca55919bd2',
    text: 'My name is Uvuvwevwevwe Onyetenyevwe Ugwemubwem Osas',
  },
  {
    id: '88285d96-bcfc-4041-9158-0d1bf07a8d43',
    text: "Don't be scared of that sale",
  },
  {
    id: 'a79fb937-ba00-49e9-85a0-8b57c9f784d9',
    text: 'This technology is minblowing',
  },
  { id: 'ab4e2efe-1b98-49b5-bb24-2ad1a2bb9603', text: 'Upcoming releases' },
  {
    id: '07c0bd54-3a47-439e-a6b6-a3528ca62e95',
    text: 'We have something for you',
  },
];

// todo: bug fix: something is pushing the carousel width so the block overlows
export default function StoreEventsList() {
  return (
    <Carousel>
      <CarouselContent>
        {mockEvents.map((event) => (
          <CarouselItem key={event.id} className='lg:basis-1/2 xl:basis-1/3'>
            <StoreEventCard event={event} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant='default' className='left-1' />
      <CarouselNext variant='default' className='right-1' />
    </Carousel>
  );
}
