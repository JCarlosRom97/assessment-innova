import React, { useEffect, useState } from "react";
import { TextStyled, UserListContainer, AlbumListContainer, RowStyled } from "../../Styles";
import { UserInterface, RootStackParamList } from "../../Types";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const UserList = ({user}:UserInterface) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [album, setAlbum] = useState([]);
    useEffect(()=>{
        const getAlbums = async ()=>{
            const data = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
            const albumData = await data.json();
            setAlbum(albumData)
        }

        getAlbums().catch((error) => console.error(error))

    }, [user.id])

    const deleteAlbum = (id: number) => {
        const newAlbumArray = album.filter((item:{id:number})=> item.id !== id);
        setAlbum(newAlbumArray)
    }

    return(
        <View>
            <UserListContainer>
                <TextStyled size={16}>{user.name}</TextStyled>
            </UserListContainer>
            {album.map((element:{id:number, title:string})=>(
                <AlbumListContainer key={element.id}>
                    <RowStyled rows={11}>
                        <TouchableOpacity onPress={() => navigation.navigate("AlbumDetail", {id: element.id, title: element.title})}>
                            <TextStyled size={14}>{element.title}</TextStyled>
                        </TouchableOpacity>
                    </RowStyled>
                    <RowStyled rows={1} >
                        <TouchableOpacity  
                            onPress={() => deleteAlbum(element.id)} 
                        >
                            <TextStyled center={true} size={18} isBold={true}>-</TextStyled>
                        </TouchableOpacity>
                    </RowStyled>
                </AlbumListContainer>
            ))}
        </View>
    )
}


export default UserList;