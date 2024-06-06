import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Topnav = () => {
    const[query,setquery] = useState("");
    const[searches,setsearches] = useState([]);

    const GetSerches = async() =>{
        try {
           const {data} = await axios.get(`/search/multi?query=${query}`);
           setsearches(data.results);
    
             
        } catch (error) {
           console.log("Error: " + error);
        }
     };
  
     useEffect(()=>{
  
        GetSerches();
     },[query]);
  


  return (
    <div className=' w-[80%] h-[10vh] relative flex mx-auto items-center'>
        <i className="text-3xl text-zinc-400 ri-search-line"></i>
            <input 
                onChange={(e) => setquery(e.target.value)}
                value={query}

                 className='w-[50%] text-zinc-200  border-none p-5 mx-10 outline-none bg-transparent ' type='text' placeholder='search anything'/>

                 {query.length > 0 && (
                    <i onClick={()=>setquery("")} 
                    className="text-3xl text-zinc-400 ri-close-line right-0"></i>
         )}
 
    <div className='z-[100] absolute w-[80%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto'>

        {searches.map((s,i)=>(
        <Link 
            to={`/${s.media_type}/details/${s.id}`}
            key={i} className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100 '>
            <img 
            className='w-[10vh] h-[10vh] object-cover rounded mr-10'
            src={
                s.backdrop_path||s.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path||s.profile_path
                }` : "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
                } alt=''/>
            <span>{
                s.name || 
                s.title || s.original_name || s.original_title
                
                }</span>
        </Link>
))}
       
        
    </div>
    </div>
  )
}

export default Topnav