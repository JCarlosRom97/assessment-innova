import React from "react";
import { AlbumListContainer, RowStyled, TextStyled } from "../../Styles";
import { TouchableOpacity } from "react-native";
import { PureComponent } from "react";

type Props ={
    album:{id:number, title:string}, 
    onDeleteAlbum: (id:number)=> void, 
    onNavigate: (id:number, title:string) => void
}

class AlbumList extends PureComponent <Props>{

    render(){
        return(
            <AlbumListContainer key={this.props.album.id}>
                <RowStyled rows={11}>
                    <TouchableOpacity onPress={() => this.props.onNavigate(this.props.album.id, this.props.album.title) }>
                        <TextStyled size={14}>{this.props.album.title}</TextStyled>
                    </TouchableOpacity>
                </RowStyled>
                <RowStyled rows={1} >
                    <TouchableOpacity  
                    onPress={()=> this.props.onDeleteAlbum(this.props.album.id)}
                    >
                        <TextStyled center={true} size={18} isBold={true}>-</TextStyled>
                    </TouchableOpacity>
                </RowStyled>
            </AlbumListContainer>
        )
    }
}


export default AlbumList;