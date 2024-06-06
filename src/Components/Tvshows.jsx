import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loading';

const Tvshows = () => {
    document.title = "SMDB | Tvshows";

    const navigate = useNavigate();
    const[category,setcategory] = useState("airing_today"); 
    const[tv,settv] = useState([]);
    const[page,setpage] = useState(1);
    const[hasMore , sethasMore] = useState(true);

    const GetTv = async() =>{
        try {
           const {data} = await axios.get(
            `/tv/${category}?page=${page}`
        );

            if(data.results.length > 0){
                settv((prevState) => [...prevState, ...data.results]);
                setpage(page + 1);
                // console.log(data);
            }else{
                sethasMore(false);
            }
            // settrending(data.results);
            
         } catch (error) {
           console.log("Error: " + error);
        }
     }; 
     
   const refershHandler = () => {
        if(tv.length === 0){
            GetTv();
        }else{
            setpage(1);
            settv([]);
            GetTv();
        }
    };

     useEffect (() => {
        refershHandler(); 
     },[category]);


  return tv.length > 0 ? (
    <div className='h-screen w-screen '>

        <div className='px-[5%] w-full flex items-center justify-between '>
            <h1 className=' text-2xl font-semibold text-zinc-400'>
            <i 
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] ri-arrow-left-line">
            </i> {" "}
                TV-Shows
            </h1>

        <div className='flex items-center w-[80%]'>
            <Topnav/>
            <Dropdown
                title="Category"
                options={["on_the_air","popular","top_rated","airing_today"]}
                func={(e) => setcategory(e.target.value)}
            />

            <div className='w-[2%]'></div>

             {/* <Dropdown 
                title="Duration"
                options={["week","day"]}
                func={(e) => setduration(e.target.value)}
            /> */}

        </div>
            </div>

            <InfiniteScroll
                dataLength={tv.length}
                next={GetTv}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={tv} title="Tv"/>
            </InfiniteScroll>
        </div>
  ) : (
    <Loading/>
);
}

export default Tvshows