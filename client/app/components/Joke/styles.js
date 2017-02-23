import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 150px;
  position: relative;
  background-color: #${props => props.bgColor};
  z-index: ${props => props.fullscreen ? 1 : ''};
`

export const JokeContainer = styled.div`
  color: white;
  font-size: 30pt;
  text-align: left;
  font-style: italic;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #${props => props.bgColor};
  &.ok{
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
  }
`

// export const Container2 = styled.div`
//   height: 150px;
//   overflow: hidden;
//   color: white;
//   font-size: 30pt;
//   text-align: left;
//   font-style: italic;
//   background-color: #${props => props.bgColor};
//   &.ok{
//     position: fixed;
//     height: 100vh;
//     width: 100vw;
//     top: 0;
//     left: 0;
//   }
// `

export const bg = css`background-color: purple;`

export const Front = styled.div`
  transition: all 1s ease;
  height: 100%;
  ${bg}
`

export const Back = styled.div`
  display: flex
  flex-direction: row
  transform: rotateY(180deg)
  ${bg}
`

export const vote = css`
  transition: width 0.5s ease;
  width: 50%;
`

export const Up = styled.div`
  ${vote}
  background-color: green
  width: 40%'
`

export const Down = styled.div`
  ${vote}
  background-color: red
`

export const Viz = styled.div`
  width: 270px;
  height: 90px;
  margin: 10px;
  background-color: cyan;
  float: right;
`

export const Top = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Big = styled.div`
  min-height: 1500px;
`
