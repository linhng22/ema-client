import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import "../css/news.css";
var loaded = false;

axios.defaults.withCredentials = true;

export default function News(props) {
    const [allNews, setAllNews] = useState([]);
    const [otherNews, setOtherNews] = useState([]);
    const [newsWithId, setNewsWithId] = useState({
        id: 0,
        time: "",
        title: "",
        content: ""
    });
    
    let params = useParams();
    const newsId = params.newsId; // get the news ID from url params

    // Get news from the server
    if (!loaded){
        axios.get("https://tienganhcoan.herokuapp.com/").then(response => {
            // Save all news to allNews variable. All news will be displayed on "Bảng tin" page
            setAllNews(response.data);
            // Save specific news to newsWithId and other news to otherNews variable
            for (let i = 0; i < response.data.length; i++) {
                if ( response.data[i]){
                    if (i !== newsId - 1 ){
                        if (i < 11) {
                            setOtherNews(prevData => ([
                                ...prevData,
                                response.data[i]
                            ]));
                        }
                    } else setNewsWithId(response.data[i]);
                } 
            }
        }).then(()=>loaded = true);
    }

    // Display other news as cards
    const otherNewsCards = otherNews.map(news => {
        return (
            <div className="news-card other" key={news.id}>
                <div style={{textAlign: "left"}}>
                    <a 
                        href={`/news/${news.id}`} 
                        className="other-news link">
                        {news.title}</a>
                </div>
                <p className="other-news news-card-time">
                    <small>Cập nhật: {news.time}</small></p>
                <hr/>
            </div>
        )
    });

    // Display all news as cards
    const allNewsCards = allNews.map(news => {
        const content = news.content.split('. ');
        const firstSentence = content[0] + `<div class='more'><button class='more-btn'><a href='/news/${news.id}'>Xem thêm</a></button></div>`;
        return (
            <div className="news-card all-news" key={news.id}>
                <div style={{textAlign: "left", marginBottom: "10px"}}>
                    <a 
                        href={`/news/${news.id}`} 
                        className="link all-news">
                        {news.title}</a>
                </div>
                <p className="news-card-time all-news">
                    <small>Cập nhật: {news.time}</small></p>
                <div 
                    className="news-card-content all-news" 
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(firstSentence)}}>
                </div>
                <hr/>
                <br/>
            </div>
        )
    })
    
    return (
        <>
            <Nav admin={props.admin}/>
            
            <div style={{display: newsId ? "" : "none"}}>
                <div className="news-with-id-container">
                    <div className="other-news-container">
                        <h3 style={{textAlign: "left", fontSize:"23px"}}>Bài đăng tương tự</h3>
                        {otherNewsCards}
                    </div>
                    <div className="news-box">
                        <h2 className="news-box-title">{newsWithId.title}</h2>
                        <p className="news-box-time">Cập nhật: {newsWithId.time}</p>
                        <div 
                            className="news-box-content" 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newsWithId.content)}}>    
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div 
                className="all-news-container"
                style={{display: !newsId ? "" : "none"}}>
                    <div className="all-news">
                        {allNewsCards}
                    </div>
            </div>

            <Footer />
        </>
        
    )
}