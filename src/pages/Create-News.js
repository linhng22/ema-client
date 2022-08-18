import React, { useState, useRef } from "react";
import axios from "axios"
import { Editor } from '@tinymce/tinymce-react';
import Nav from '../components/Nav';
import "../css/create-news.css"
import confirmIcon from "../images/confirm.png"
import congrat from "../images/congrat.png"
var loaded = false;

axios.defaults.withCredentials = true;

export default function CreateTest(props) {
    const [newsData, setNewsData] = useState([]);
    const [news, setNews] = useState({
        id: 0,
        time: "",
        title: "",
        content: ""
    });
    const [title, setTitle] = useState("Bài đăng mới");
    const [confirmation, setConfirmation] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const editorRef = useRef(null);

    // Update the content of the news post
    const log = () => {
        if (editorRef.current) {
            const time = new Date();
            // Update the news from user's input
            setNews( 
                {
                    id : (newsData.length) ? newsData.length + 1 : 1,
                    time: "Ngày " + time.getDate() + " tháng " + (time.getMonth() + 1) + " năm " + time.getFullYear(),
                    title: title,
                    content: editorRef.current.getContent()
                }
            );
        }
    };
    
    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("https://tienganhcoan.herokuapp.com/create-news").then(response => {
            setNewsData(response.data);
            loaded = true;
        });
    }

    // Update the title of the news
    function changeTitle(e) {
        if (e.target.value){
            setTitle(e.target.value);
        }
    }

    // Save the content of the news post
    function saveNews() {
        if (!document.getElementById("news-title").value || !editorRef.current.getContent()){
            alert("Vui lòng nhập đầy đủ Tiêu đề và Nội dung bài đăng");
        } else {
            setConfirmation(true);
            setNewsData(prevData => ([
                ...prevData,
                news
            ]));
        }
    }

    // Save new question data and answer data
    function handleSubmit(e) {
        e.preventDefault();
        setConfirmation(false);

        axios.post("https://tienganhcoan.herokuapp.com/create-news", newsData ).then((res) => {
            console.log(res);
            setDisplayMessage(true);
        })
        .catch(err => {
            console.log(err);
            alert("Có lỗi xảy ra trong quá trình tạo bài đăng. Vui lòng thực hiện lại sau.");
        })
    }
    
    return (
        <>
            <Nav admin={props.admin}/>
            <div 
                className="news-container" 
                style={{opacity: confirmation ? "0.1" : "1", 
                        display: displayMessage ? "none" : ""}}>
                <h2 className="h2">Tạo bài đăng tin tức</h2>

                <div className="news-form">
                    <div className="news-header">
                        <label>
                            <b>Tiêu đề bài đăng</b>
                            <span className="highlight">*</span> :
                        </label>
                        <input 
                            type="text"
                            minLength={4}
                            className="news-title"
                            id="news-title"
                            placeholder="Điền tiêu đề"
                            onChange={changeTitle}
                            autoComplete="off"
                            required/>
                        <label ><b>Nội dung bài đăng</b><span className="highlight">*</span> :</label>
                    </div>
                    <div className="editor-container">
                        <Editor
                            apiKey={process.env.REACT_APP_MCE_TINY_API_KEY}
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={log}
                            init={{
                                height: 430,
                                toolbar_mode: 'wrap',   
                                statusbar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'editimage', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo blocks | bold italic underline | fontfamily fontsize forecolor backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'link image table| removeformat | preview',
                                content_style: 'body { font-family:Nunito,sans-serif; font-size:12pt }'
                            }}
                        />
                    </div>
                </div>
                
                <input 
                        type="button" 
                        value="Tạo bài đăng" 
                        className="submit btn"
                        onClick={saveNews}/>
            </div>

            <div 
                className="confirmation pop-up"
                id="confirmation"
                style={{display: (confirmation) ? "" : "none"}}>
                    <img 
                        src={confirmIcon} 
                        alt="confirmation icon"
                        className="big-icon"/>
                    <h3>Bạn chắc chắn muốn tạo bài đăng tin tức bây giờ?</h3>
                    <button
                        className="cancel"
                        onClick={() => setConfirmation(false)}>
                            Kiểm tra lại
                    </button>
                    <button
                        className="create"
                        onClick={handleSubmit}>
                            Tạo ngay
                    </button>
            </div>

            <div
                className="pop-up"
                style={{display: (displayMessage) ? "" : "none", backgroundColor: "#aef5c6"}}>
                    <img 
                        src={congrat} 
                        alt="congratulation icon" 
                        className="big-icon"/>
                    <h2>Hoàn thành</h2>
                    
                    <p>Chúc mừng!<br/>Bài đăng của bạn đã được tạo thành công!</p>
                    <button
                        className="backToQuiz"
                        onClick={() => window.location.replace("/")}>
                            Về trang chủ
                    </button>
                    <button
                        className="again"
                        onClick={() => window.location.reload()}>
                            Tạo bài đăng mới
                    </button>
            </div>
        </>
        
    )
}