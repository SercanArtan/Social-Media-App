import "./topbar.css"
import {Search, Person, Chat, Notifications} from '@mui/icons-material';
import { useContext } from "react";
import {Link} from "react-router-dom";
import { AuthContext} from "../../context/AuthContext";



export default function Topbar(){
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SERCAN SITE</span>
             </Link>
        </div> 
        <div className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon"/>
                <input placeholder="Search for friend, post or video" className="searchInput" />
            </div>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItems">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItems">
                    <Chat/>
                    <span className="topbarIconBadge">3</span>
                </div>
                <div className="topbarIconItems">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to= {`/profile/${user.username}`}>
                <img 
                src={ user.profilePicture 
                    ? PF+user.profile 
                    : PF+"person/noavatar.jpg" } 
                alt="" 
                className="topbarImg" />
            </Link>
        </div>
    </div>
    );
}
