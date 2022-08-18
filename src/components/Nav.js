import React from "react";
import "../css/Nav.css"
import {Link} from "react-router-dom"
import banner from "../images/banner.png"

export default function Nav(props) {
    // Display "create-news", "create-test" after user signs in as admin
    // Change "Đăng nhập" (sign in) to "Đăng xuất" (sign out) after user signs in as admin 
    return (
        <nav className="nav">
            <img src={banner} alt="banner" className="banner-image"/>
            <div className="nav--links">
                <Link 
                    to="/" 
                    onClick={() => window.location.replace("/")}>
                        Trang chủ</Link>
                <Link 
                    to="/news" 
                    onClick={() => window.location.replace("/news")}>
                        Bảng tin</Link>
                <Link 
                    to="/create-news" 
                    style={{display: props.admin ? "" : "none"}}
                    onClick={() => window.location.replace("/create-news")}>
                        Tạo bài đăng</Link>
                <Link 
                    to="/create-test" 
                    style={{display: props.admin ? "" : "none"}}
                    onClick={() => window.location.replace("/create-test")}>
                        Tạo Quiz</Link>
                <Link 
                    to="/quiz" 
                    onClick={() => window.location.replace("/quiz")}>
                        Quiz</Link>
                <Link 
                    to="/sign-in" 
                    onClick={() => window.location.replace("/sign-in")}>
                        {props.admin ? "Đăng xuất" : "Đăng nhập"}</Link>
            </div>
        </nav>
    )
}