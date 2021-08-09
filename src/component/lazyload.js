import axios from "axios"
import { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import LazyLoad from 'react-lazyload'
import {  FormControl } from "react-bootstrap"
import validator from 'validator'
import './lazyload.css'
import ReactVideosPreview from "react-thumbnails-video-preview";
const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)
function Lazyload(){
    const [search, setSearch] = useState("");
    const [ data, setData] = useState([])
    const filter = validator.isEmpty(search) ? data && data : data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    useEffect(()=>{
        axios.get('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/videos')
        .then(response => setData(response.data))
        .catch(
            error=>console.log(error)
        )
    },[])
    return(
        <div >
              <div className="search">
                <FormControl
                    className="from_search"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
               
            </div>
            <div className="lazy_grid" >
          
            {  filter.map((item)=>(
                <div className='content_grid' style={{ width: filter.length < 2?'50%':''}}>
                    <LazyLoad height={200} offset={100}
                        placeholder={<Loading />}>
                        <ReactVideosPreview  list={[
                            {
                                imgList: [
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/0.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/1.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/2.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/3.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/0.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/1.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/2.jpg",
                                    "//img.youtube.com/vi/" + item.url.split("v=")[1].split("&")[0] + "/3.jpg",

                                ]
                            }
                        ]} />
                        <span>{item.title}</span>
               
                </LazyLoad> </div>
            ))}

        </div>
        </div>

    )
}



export default Lazyload;