import React, {useEffect, useState} from "react";
import axios from "axios"
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import "../css/home.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import phone from "../images/phone.png";
import email from "../images/email.png";
import address from "../images/address.png";

var text1 = "Các lớp học dành cho mọi độ tuổi";
var text2 = "Nội dung bám sát chương trình phổ thông, nhu cầu người học";
var text3 = "Trang bị toàn bộ 4 kỹ năng Nghe - Nói - Đọc - Viết";
var loaded = false;

axios.defaults.withCredentials = true;

export default function Home(props) {
    const [newsData, setNewsData] = useState([]);
    const [image, setImage] = useState(image1);
    const [text, setText] = useState(text1);
    const [num, setNum] = useState(1);

    useEffect(() => {
        if (newsData.length > 2){
            loaded = true;
        }
    }, [newsData]);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("https://tienganhcoan.herokuapp.com/").then(response => {
            // Save 3 most recent news to the newsData
            for (let i = response.data.length; i > response.data.length - 3; i--) {
                if (response.data[i - 1] && newsData.length < 3){
                    setNewsData(prevData => ([
                        ...prevData,
                        response.data[i - 1]
                    ]));
                }
            }
        }).then(() => {
            loaded = true;
        });    
    }
       
    // Map all the news as cards
    const newsCards = newsData.map(card => {
        return (
            <NewsCard 
                key={card.id}
                id={card.id}
                time={card.time}
                title={card.title}
                content={card.content}
            />
        )
    });

    // Update the bullets, image and text when the set number changes
    useEffect(() => {
        // Change bullets
        const bullets = document.querySelectorAll(".bullets span");
        bullets.forEach(bull => bull.classList.remove("active"));
        document.getElementById(`bullet-${num}`).classList.add("active");
        if (num === 1){
            setImage(image1);
            setText(text1)
        } else if (num === 2) {
            setImage(image2);
            setText(text2);
        } else {
            setImage(image3);
            setText(text3);
        }
    }, [num]);
    
    // Update new number after 5 seconds to change image and text accordingly
    setTimeout(() => {
        if (num < 3) {
            const newNum = num + 1;
            setNum(newNum);
        } else setNum(1);
    }, 5000);

    return (
        <>
            <Nav admin={props.admin}/>
            <div className="home">
                <div className="slides">
                    <div className="images-wrapper">
                        <img src={image} className="home-image" alt="slider"/>
                    </div>

                    <div className="text-slider">
                        <div className="text-wrap">
                            <h3>{text}</h3>
                        </div>

                        <div className="bullets">
                            <span id="bullet-1" className="active"></span>
                            <span id="bullet-2"></span>
                            <span id="bullet-3"></span>
                        </div>
                    </div>
                </div>

                <div className="news">
                    <div className="news-heading">
                        <h2 >Bảng tin</h2>
                        <div className="big-line"></div>
                    </div>
                    
                    <div className="news-container">{newsData.length > 0 ? newsCards : ""}</div>
                </div>

                <div className="contact-container">
                    <h2 className="contact-header">Liên hệ</h2>
                    <div>
                        <h3 className="highlight">Thúy An</h3>
                        <div className="contact-details">
                            <img className="contact-icon" src={phone} alt="phone number"/>
                            <span > 0936346468</span></div>
                        <div className="contact-details">
                            <img className="contact-icon" src={email} alt="email address"/>
                            <span> thuyan120888@gmail.com</span></div>
                        <div className="contact-details">
                            <img className="contact-icon" src={address} alt="home address"/>
                            <span> Ngách 59/20, Ngõ 59, đường Mễ Trì, quận Nam Từ Liêm, Hà Nội</span></div>
                    </div>
                </div>
                                
            </div>

            <Footer />
        </>
        
    )
}