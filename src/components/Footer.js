import React from "react";
import "../css/footer.css";

export default function Footer(){
    return(
        <div className="footer">
            <p style={{margin: "5px"}}>
                &copy; {new Date().getFullYear()} EMA - English Ms An
            </p>
            <a href="/policy" className="policy-link">Chính sách và điều khoản</a>
        </div>
    )
}