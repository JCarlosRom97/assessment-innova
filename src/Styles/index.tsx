import styled from "styled-components/native";
import isLandscape from "../Hooks/isLandScape";

export const UserListContainer = styled.View`
    padding: 30px 0px 15px 10px;
    background-color: white;
    border: 1px;
`

export const AlbumListContainer = styled.View`
    display: flex;
    flex-direction: row;
    width:${isLandscape()? "700px":"300px"} ;
    padding: 10px;
    margin-left:${isLandscape() ? "110px":"95px"} ;
    background-color: white;
    border: 1px;
`

export const TextStyled = styled.Text<{size:number, isBold?: boolean, center?: boolean}>`
    font-size: ${(props) => props.size}px;
    ${(props) => props.isBold ? "font-weight: bold;": "" }
    ${(props) => props.center ? "text-align: center;": "" }
`

export const RowStyled = styled.View <{rows:number}>`
    flex: ${(props) => props.rows}
`
