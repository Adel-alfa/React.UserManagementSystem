import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className="pageTemplate1">
   <div className='w-6/9 h-4/7 flex flex-col justify-center items-center gap-2 text-white
    bg-linear-to-tr from-[#ebe5e5] via-[#db9cdd] to-[#e71919] border-2 border-white rounded-[30px] ring-4 ring-red-600'>
        <TbError404 className='text-7xl ' />
   <img src="./images/not found.png" className='rounded-2xl ' />
    <a
      href="/dashboard" 
      className="mb-4 inline-block rounded-lg bg-lime-900/20 px-6 py-2 text-red-600 font-semibold shadow hover:bg-gray-100 transition"
    >
      Go Back Home
    </a>
  </div>
  
</div>

  );
};

export default NotFoundPage;
