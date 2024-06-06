import NotFound from "/hello.avif";

const Notfound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='h-[50%] object-cover' src={ NotFound } alt='' />
    </div>
  );
};

export default Notfound;
