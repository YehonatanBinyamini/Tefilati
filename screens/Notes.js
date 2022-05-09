// import ChannelScreen from './forums/Chats';
// import React, { useState, useEffect} from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// export default function Forum() {
//   const [ready, setReady] = useState();

//   useEffect(() => {
//     const initChat = async () => {
//       await connectUserPromise;
//       await channel.watch();
//       setReady(true);
//     };

//     initChat();
//   }, []);

//   if (!ready) {
//     return null;
//   }

//   return (
//     <SafeAreaProvider>
//       <ChannelScreen channel={channel} />
//     </SafeAreaProvider>
//   );
// }

