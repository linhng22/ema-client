import React from "react";
import Nav from '../components/Nav';

export default function Policy(props) {
    return (
        <>
            <Nav admin={props.admin}/>
            <div className="policy">
                <br/>
                <br/>
                <div style={{color: "#000"}}>
                    Trang đang trong quá trình xây dựng. Vui lòng quay lại trang trước.
                </div>
            </div>
        </>
        
    )
}