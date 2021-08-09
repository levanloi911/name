import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Modal from 'react-bootstrap/Modal'
import './loadVideo.css'
import ReactVideosPreview from "react-thumbnails-video-preview";
import axios from "axios";
import { Delete, Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../feattures/useSlice";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
function Loadvideo() {
    const [LinkUrl, setLinkUrl] = useState("")
    const [Title, setTitle] = useState("")
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser)
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [url, setUrl] = React.useState([]);
    const [Open, setOpen] = useState(false)
    const [Id, setId] = useState("")
    const [nameButton, setButton] = useState("")
    const [urlfillter, serUrlfillter] = React.useState("");
    const [videoUrl, setVideoUrl] = React.useState("https://www.youtube.com/watch?v=biVdeJq8MI8");
    const[crud, setCrud] =useState(false)
    let videoCode;
    if (videoUrl) {
        videoCode = videoUrl.split("v=")[1].split("&")[0];
    }
    const handleSetUrl=(id, itemUrl)=>{
        setVideoUrl(itemUrl)
        serUrlfillter(id)
    }
    const checkElapsedTime = (e) => {
        console.log(e.target.playerInfo.playerState);
        const duration = e.target.getDuration();
        const currentTime = e.target.getCurrentTime();
        if (currentTime / duration > 0.95) {
            setModalIsOpen(true);
        }
    };

    const opts = {
        playerVars: {
            autoplay: 1
        }
    };

    const handleExerciseComplete = () => console.log("Do something");

    const geturl=async()=>{
        await axios.get('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/videos').then(response => {
            setUrl(response.data)
        }).catch(error => {
            console.log("error", error)
        })
    }
    const handleEdit = async(id, title, linkurl)=>{
        setOpen(true);
        setId(id);
        setLinkUrl(linkurl);
        setTitle(title)
        setButton("Update")
    }
    const handleAdd = async () => {
        setOpen(true);
        setLinkUrl("");
        setTitle("")
        setButton("Add video")
    }
    const handleRemove = async(id)=>{
        await axios.delete('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/videos/' + id)
            .then(response => geturl(), toast("deleted!"))
            .catch(error => {
                console.error('There was an error!', error);
            })
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        setOpen(false)
        const update =  { url: LinkUrl,  title:Title };
        if (nameButton =="Update"){
            await axios.put('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/videos/' + Id, update)
                .then(response => geturl(), setLoading(false), toast("Updated!"))
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }else{
            await axios.post('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/videos', update)
                .then(response => geturl(), setLoading(false), toast("added!"))
                .catch(error => {
                    console.error('There was an error!', error);
                })
        }
       
    }
 
    
  useEffect(()=>{
    geturl();
  },[])
    useEffect(() => {
        user===null ? setCrud(false) : setCrud(true);
    }, user)
    console.log(user)
    return (
        <div className="container_video">
            {crud === false ?
            <div className="c_video">
                <div className="videoPlay">
                    <div>
                        <div>
                            <YouTube 
                                className='video'
                                videoId={videoCode}
                                containerClassName="embed embed-youtube"
                                onStateChange={(e) => checkElapsedTime(e)}
                                opts={opts}
                            />
                        </div>
                        
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        contentLabel="Exercise Completed"
                    >
                        <div>
                            <h3>Completed the exercise?</h3>
                            <button onClick={handleExerciseComplete}>Complete exercise</button>
                        </div>
                    </Modal>

                </div>
                <div className="listvideo" style={{ position: 'relative' }}>
                <div>
                   
                        
                    {url && url.filter(itemF => itemF.id !== urlfillter).slice(0,5).map(item=>(
                        <li>
                            <div onClick={() => handleSetUrl(item.id,item.url)}>
                               
                                <ReactVideosPreview list={[
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

                                <span className='title'>{item.title}</span>
                            </div>
                          
                        </li>
                    ))}
                    

                   
                </div>
            </div> 
          
            </div>
           :

                <div className='table_manage'>

                        <div className='manage'>
                            <h3 className="text_manage">Manage Video</h3>
                        <Button onClick={() => handleAdd()} className="btn_add">Add video</Button>
                        </div>
                        <table class="table">
                            <caption>List </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Stt</th>
                                    <th scope="col">Link url</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {url && url.filter(itemF => itemF.id !== urlfillter).slice(0, 5).map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.url}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            <Edit onClick={() => handleEdit(item.id, item.title, item.url)} fontSize="small" style={{
                                                width: '50%', margin: '1px'
                                            }} />
                                            <Delete onClick={() => handleRemove(item.id)} fontSize="small" style={{
                                                width: '50%', margin: '1px'
                                            }} /></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

        </div>
        


            }
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal
                show={Open}
                onHide={() => setOpen(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{nameButton}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ModalFrom">
                        <label>Title video</label>
                        <input placeholder="Title" value={Title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Link video</label>
                        <input placeholder='Link url' value={LinkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                        <Button type='submit' disabled={loading} onClick={handleSubmit} >     {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                            <span>{nameButton}</span></Button>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Close
                    </Button>

                </Modal.Footer>



            </Modal>

        </div>
    );
}

export default Loadvideo;
