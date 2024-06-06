import Loader from '/Loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='h-[50%] object-cover' src={Loader} alt='loading' />
    </div>
  )
}

export default Loading