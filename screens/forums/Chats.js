import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../db/firebase'
import { collection, getDocs } from "firebase/firestore";

const Chats = (props) => {
    const user = props.navigation.getParam('user');
    const [messages, setMessages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getDocs(collection(db, "chats"))
        .then((querySnapshot) => {querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            setIndex(index + 1)
            messages.push(doc.data())
        });
        })
        .catch((err) => {
            console.log(err.message)
        })

        
    },[]);
    

    let i = 0

    const data = ['מה המצב?']
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: data, //'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'משה',
    //       avatar: NaN, //'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 3,
    //     text: data, //'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 4,
    //       name: 'ביבי',
    //       avatar: NaN, //'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ])
    setMessages(messages.reverse())
  }, [])

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

      const ref = doc(db, "chats", 'chat' + index);
      setDoc(ref, messages[0]);
      setIndex(index + 1)

  }, [])

  return (
    <View style={{  flex: 1, marginBottom: 18, backgroundColor: '#fff' }}>  
    <GiftedChat
        placeholder='כתוב כאן'
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
        _id: user.uid,
        name: user.firstName + " " + user.lastName
        }}
    />
    </View>
  )
}

Chats.navigationOptions = {
  headerTitle: 'פורום',
  headerBackTitle: "מסך הבית"
};

export default Chats;