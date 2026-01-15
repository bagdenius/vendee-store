'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}</p>
      <button
        className='inline-block px-6 py-3 text-lg cursor-pointer'
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
