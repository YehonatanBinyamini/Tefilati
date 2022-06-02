import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from '../../db/firebase'

const Chats = (props) => {
    const user = props.navigation.getParam('user');
    const [messages, setMessages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const temp = []
        getDocs(collection(db, "chats"))
        .then((querySnapshot) => {querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            setIndex(index + 1)
            i++;
            const message = doc.data()
            message.createdAt = message.createdAt.toDate()
            temp.push(message)
        });
        })
        .catch((err) => {
            console.log(err.message)
        })

        setTimeout(() => {

          setMessages(temp.reverse())
        }, 1000);  
    },[]);
    

    let i = 0

    

  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      
      i++;
      const ref = doc(db, "chats", i.toString());
      console.log(messages[0], i)
      setDoc(ref, messages[0]);
      setIndex(index + 1)

  }, [])

  return (
    <View style={{  flex: 1, marginBottom: 18, backgroundColor: '#fff' }}>  
    <GiftedChat
        placeholder='כתוב כאן'
        messages={messages}
        renderUsernameOnMessage={true}
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