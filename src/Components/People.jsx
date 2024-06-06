import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Cards from './partials/Cards';

const People = () => {
    document.title = "SMDB | People";

    const navigate = useNavigate();
    const[category,setcategory] = useState("popular"); 
    const[person,setperson] = useState([]);
    const[page,setpage] = useState(1);
    const[hasMore , sethasMore] = useState(true);

    const GetPerson = async() =>{
        try {
           const {data} = await axios.get(
            `/person/${category}?page=${page}`
        );

            if(data.results.length > 0){
                setperson((prevState) => [...prevState, ...data.results]);
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
        if(person.length === 0){
            GetPerson();
        }else{
            setpage(1);
            setperson([]);
            GetPerson();
        }
    };

     useEffect (() => {
        refershHandler(); 
     },[category]);




  return person.length > 0 ? (
    <div className='h-screen w-screen '>

        <div className='px-[5%] w-full flex items-center justify-between '>
            <h1 className=' text-2xl font-semibold text-zinc-400'>
            <i 
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] ri-arrow-left-line">
            </i> {" "}
                Person
            </h1>

        <div className='flex items-center w-[80%]'>
            <Topnav/>
            {/* <Dropdown 
                title="Category"
                options={["popular","top_rated","upcoming","now_playing"]}
                func={(e) => setcategory(e.target.value)}
            /> */}

            <div className='w-[2%]'></div>

             {/* <Dropdown 
                title="Duration"
                options={["week","day"]}
                func={(e) => setduration(e.target.value)}
            /> */}

        </div>
            </div>

            <InfiniteScroll
                dataLength={person.length}
                next={GetPerson}
                hasMore={hasMore}
                loader={<h1>Loading...</h1>}
            >
                <Cards data={person} title="Person"/>
            </InfiniteScroll>
        </div>
  ) : (
    <Loading/>
);
}

export default People