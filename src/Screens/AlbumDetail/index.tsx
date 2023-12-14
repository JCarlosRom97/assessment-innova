import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, FlatList, TouchableHighlight, ListRenderItemInfo } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ParamList, RootStackParamList } from "../../Types";
import { StackNavigationProp } from "@react-navigation/stack";
import Star from './../../Images/star.png'
import Spinner from "react-native-loading-spinner-overlay";

const AlbumDetail = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [photosAlbum, setPhotoAlbum] = useState([])
    const [isAlbumPhotos, setIsAlbumPhotos] = useState(true);
    const {params} = useRoute<RouteProp<ParamList,'AlbumDetail'>>();
    const albumId = params.id;
    const title = params.title; 
    const ImageWidth = Dimensions.get('window').width / 3 ;


    const setHeader = (title:string) =>{
        navigation.setOptions({title: title,  headerRight: () => (
            <TouchableHighlight onPress={()=> setIsAlbumPhotos((prevState)=> !prevState)}>
                <Image  source={Star} />
            </TouchableHighlight>
        )})
    }

    const getAllPhotos = async() => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        const AllAlbumPhotosData = await data.json();
        setPhotoAlbum(AllAlbumPhotosData)
    }


    const getAlbumPhotos = async ()=>{
        const data = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const AlbumPhotosData = await data.json();
        setPhotoAlbum(AlbumPhotosData)
    }

    useEffect(()=>{
        if(isAlbumPhotos){
            setPhotoAlbum([])
            getAlbumPhotos().catch((error) => console.error(error))
            setHeader(title)
        }else{
            setPhotoAlbum([])
            getAllPhotos().catch((error)=> console.error(error))
            setHeader("All")
         
        }
    },[isAlbumPhotos])

  

    const ImageRender = (url:ListRenderItemInfo<{id:number, url:string}>) => <Image source={{uri: url.item.url }} style={{width:ImageWidth, height: ImageWidth}} />

    if(photosAlbum.length == 0){
        return <Spinner visible={true} textContent={'Loading...'}/>
    }

    return(
        <FlatList 
            keyExtractor={(item:{id: number}) => 'image-'+item.id}
            numColumns={3}  
            data={photosAlbum} 
            renderItem={ImageRender} 
        />
    )
}

export default AlbumDetail;