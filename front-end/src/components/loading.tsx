import styled from "styled-components"

export function Loading () {
    return ( 
      <Triforce>
      <Triangle></Triangle>
      </Triforce>
    )    
}


const Triforce = styled.div`
@keyframes spin {
  from {opacity: 0%}
  to {opacity: 100%}
}
 margin:50px auto;
  width:200px;
  height:200px;
  `

const Triangle = styled.div`
@keyframes spin {
  from {opacity: 0%}
  to {opacity: 100%}
}
  content:'';
	position:relative;
	width:0px;
	height:0px;
	border-left: 60px solid transparent;
	border-right: 60px solid transparent;
	border-bottom: 104px solid #FFBC00;
  animation: spin 1.3s infinite;
  
  &::before {
    content:'';
	position:absolute;
	display:block;
	border-left:60px solid transparent;
	border-right:60px solid transparent;
	border-bottom:104px solid #FFBC00;
	top:104px;
	left:-120px;
  animation: spin 1.3s infinite;

  }
  &::after {
    content:'';
	position:absolute;
	display:block;
	border-left:60px solid transparent;
	border-right:60px solid transparent;
	border-bottom:104px solid #FFBC00;
	top:104px;
  animation: spin 1.3s infinite;
  }

`