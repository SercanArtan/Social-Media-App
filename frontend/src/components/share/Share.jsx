import { useContext, useRef, useState } from "react"
import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setfile] = useState(null);

  const submitHandler = async (e) =>{
    e.preventDefault();
    const newPost ={
      userId : user._id,
      desc : desc.current.value,
    }

    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data);
        window.location.reload();
      } catch(err){
        console.log(err)
      }
    }

    try{
      await axios.post("/posts", newPost);
    } catch(err){

    }
  };


  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
              <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noavatar.jpeg"} alt="" />
              <input placeholder={"What'sin your mind " +user.username +"?"} className="shareInput" ref={desc}/>
            </div>
            <hr className="shareHr"/>
            {file && (
              <div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick = {() => setfile(null)} />
              </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <PermMedia htmlColor="tomato" className="shareIcon"/>
                  <span className="shareOptionText">Photo or Video</span>
                  <input style={{display: "none"}} type="file" id="file"  accept=".png, .jpeg, .jpg" onChange={(e)=> setfile(e.target.files[0])}/>
                </label>
                <div className="shareOption">
                  <Label htmlColor="blue" className="shareIcon"/>
                  <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                  <Room htmlColor="green" className="shareIcon"/>
                  <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                  <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                  <span className="shareOptionText">Feelings</span>
                </div>
                <button className="shareButton" type="submit">Share</button>
              </div>
            </form>
        </div>
    </div>
  )
}
