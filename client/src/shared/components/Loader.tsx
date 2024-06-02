export function Loader() {
  return (
    <div className='flex flex-col items-center p-2 gap-1'>
      <div className='size-24 border-4 border-dashed border-blue-500 rounded-full
        animate-spin'></div>
      <h2 className='font-semibold text-2xl'>Loading...</h2>
    </div>
  )
}