import React, { useEffect } from "react";
import { FlatList} from "react-native";
import { UserReduxInterface } from "../../Types";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../Redux/reducers/user.reducer";
import UserList from "../../Components/HomeScreen/UserList";
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: UserReduxInterface) => state.users.data)

    useEffect(()=>{
        const getUsers = async ()=>{
            const data = await fetch("https://jsonplaceholder.typicode.com/users");
            const usersData = await data.json();
            dispatch(add(usersData))
        }

        getUsers().catch((error) => console.error(error))

    }, [])

    if(users.length == 0){
        return <Spinner visible={true} textContent={'Loading...'}/>
    }

    return(
    
        <FlatList  data={users}  renderItem={({item}) => <UserList user={item} />}/>
    
    )
}

export default HomeScreen;