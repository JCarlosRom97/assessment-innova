import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, TouchableHighlight } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ParamList, RootStackParamList } from "../../Types";
import { StackNavigationProp } from "@react-navigation/stack";
import Star from './../../Images/star.png'
import isLandscape from "../../Hooks/isLandScape";

const AlbumDetail = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [photosAlbum, setPhotoAlbum] = useState([])
    const [isAlbumPhotos, setIsAlbumPhotos] = useState(true);
    const {params} = useRoute<RouteProp<ParamList,'AlbumDetail'>>();
    const albumId = params.id;
    const title = params.title; 
    const ImageWidth = Dimensions.get('window').width / 4 ;

    const IMAGE_SIZE = isLandscape() ? 270 : 140;

    const getAllPhotos = async() => {
        try {
            const data = await fetch(`https://jsonplaceholder.typicode.com/photos`);
            const AllAlbumPhotosData = await data.json();
            setPhotoAlbum(AllAlbumPhotosData)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(()=>{
        if(isAlbumPhotos){
            getAlbumPhotos().catch((error) => console.error(error))
            setHeader(title)
        }else{
            getAllPhotos()
            setHeader("All")
         
        }
    },[isAlbumPhotos])


    const setHeader = (title:string) =>{
        navigation.setOptions({title: title,  headerRight: () => (
            <TouchableHighlight onPress={()=> setIsAlbumPhotos((prevState)=> !prevState)}>
                <Image  source={Star} />
            </TouchableHighlight>
        )})
    }

  

    const getAlbumPhotos = async ()=>{
        const data = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const AlbumPhotosData = await data.json();
        setPhotoAlbum(AlbumPhotosData)
    }

    return(
        <FlatGrid
            itemDimension={ImageWidth}
            spacing={0}
            data={photosAlbum}
            renderItem={({ item }:{item:{url:string}}) => (<Image source={{uri: item.url}} style={{width:IMAGE_SIZE, height: IMAGE_SIZE}} />)}
        />
    )
}

export default AlbumDetail;