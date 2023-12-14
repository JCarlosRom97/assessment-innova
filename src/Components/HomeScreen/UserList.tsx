import React, { useEffect, useState } from "react";
import { TextStyled, UserListContainer, AlbumListContainer, RowStyled } from "../../Styles";
import { UserInterface, RootStackParamList } from "../../Types";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AlbumList from "../AlbumList.tsx";
import Spinner from "react-native-loading-spinner-overlay";


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
            <FlatList
                data={album}
                keyExtractor={(item:{id: number, title:string}) => 'album-'+item.id}
                renderItem={({item})=> 
                <AlbumList 
                    album={item} 
                    onDeleteAlbum={(id:number) => deleteAlbum(id)} 
                    onNavigate ={ (id, title) => navigation.navigate("AlbumDetail", {id, title})}
                />}    
            />
        </View>
    )
}


export default UserList;