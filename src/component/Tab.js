

function Tab(props) {
  if(props.istab === 0){
    return (
      <div style={{width:`${props.tabwidth}px` }} className="tab-content">
        <img src= {props.state[props.id]?.photo[0]}/>
        <img src= {props.state[props.id]?.photo[1]}/>
      </div>
    ) 
  }

  if(props.istab === 1) {
    return(
    <div style={{width:`${props.tabwidth}px` }} className="tab-content">
        <img src= {props.state[props.id]?.product[0]}/>
        <img src= {props.state[props.id]?.product[1]}/>
    </div>
    )
  }
}


export default Tab;