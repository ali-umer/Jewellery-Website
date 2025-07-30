import Link from "next/link";
import {FaFacebookF,FaInstagram, FaXTwitter,FaTiktok,FaLinkedinIn,FaYoutube} from "react-icons/fa6";

export  function SocialMedia(){
    return (

  <div className="flex flex-wrap justify-center gap-4 text-3xl">
            <Link className="hover:scale-120" href="https://www.instagram.com/" target="_blank"><FaInstagram /></Link>
            <Link className="hover:scale-120" href="https://www.facebook.com/" target="_blank"><FaFacebookF /></Link>
            <Link className="hover:scale-120" href="https://www.youtube.com/" target="_blank"><FaYoutube /></Link>
            <Link className="hover:scale-120"href="https://www.tiktok.com/" target="_blank"><FaTiktok /></Link>
            <Link className="hover:scale-120"href="https://twitter.com/" target="_blank"><FaXTwitter /></Link>
            <Link className="hover:scale-120" href="https://www.linkedin.com/" target="_blank"><FaLinkedinIn /></Link>
  </div>

    );
};