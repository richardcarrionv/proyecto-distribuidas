import React from "react";
import Sidebar from "../../components/sidebar/Sidebar"; 

const Main = (props) => { 
  return ( 
    <div> 
      {props.children}
    </div>
  );

}

export default Main; 
