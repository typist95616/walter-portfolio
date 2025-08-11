import "./Home.scss";
import Image from "next/image";
import Logo from "@/public/Images/Logo.svg";
import Lottie from "lottie-react";
import ProfileImage from "@/public/Images/profileImage.json";

export default function Home() {

    return (
        <div className="home-container" id={"home"}>
            <div className="home-root">
                <div className="intro">
                    <div className="intro-1">Hi~</div>
                    <div className="intro-2">My name is</div>
                    <div className="intro-3">Walter Siu</div>
                    <div className="intro-4">I develop things for web!</div>
                </div>
                <div className="profileImage-container">
                    <Lottie animationData={ProfileImage} loop={true} className="profileImage" />
                </div>
            </div>
        </div>
    )
}