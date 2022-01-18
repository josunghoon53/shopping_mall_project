

function Tab(props) {
  if(props.istab === 0){
    return (
      <div style={{width:`${props.tabwidth}px` }} className="tab-content">
        <img src= {props.state[1]?.photo[0]}/>
        <img src= {props.state[1]?.photo[1]}/>
      </div>
    ) 
  }

  if(props.istab === 1) {
    return(
    <div style={{width:`${props.tabwidth}px` }} className="tab-content">
        <img src= {props.state[1]?.product[0]}/>
        <img src= {props.state[1]?.product[1]}/>
    </div>
    )
  }
}


export default Tab;