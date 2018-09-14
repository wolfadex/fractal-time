import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../../firebaseConfig.json';
import store from '../index';
import {
  CHECK_WEBRTC,
  CREATE_ROOM,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  NEW_CONNECTION,
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  ROOM_CLOSED,
  DISCONNECT,
  CONNECTION_CLOSED,
  CHANNEL_OPEN,
} from './types';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true,
});

const RTCPeerConnection =
  window.RTCPeerConnection || webkitRTCPeerConnection || mozRTCPeerConnection;

const isIE = () => {
  const ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
};

// ------------------------------------------------------------
//
//     User initiated actions
//
// ------------------------------------------------------------

// ------------------------------------------------------------
//
//     User initiated actions
//
// ------------------------------------------------------------

// export const checkWebRTC = () => ({
//   available: !isIE() && RTCPeerConnection != null,
//   type: CHECK_WEBRTC,
// });

// const COLLECTION_ID = 'rooms';
// let peerConnection;
// let creatingRoom = false;
// let userId;
// let stopWaitingForPlayers;
// let channel;

// const handleChannel = () => {
//   channel.onmessage = ({ data }) => {
//     store.dispatch(data);
//   };

//   channel.onopen = () => {
//     store.dispatch({
//       type: CHANNEL_OPEN,
//     });
//   };
// };

// const finishCreatingRoom = () => {
//   channel = peerConnection.createDataChannel('game of microscope');

//   handleChannel();
//   peerConnection
//     .createOffer({})
//     .then((desc) => peerConnection.setLocalDescription(desc))
//     .then(() => {})
//     .catch((err) => console.error(err));

//   peerConnection.onicecandidate = ({ candidate }) => {
//     if (candidate == null) {
//       firestore
//         .collection(COLLECTION_ID)
//         .add({
//           [userId]: JSON.stringify(peerConnection.localDescription),
//         })
//         .then((docRef) => {
//           const roomId = docRef.id;

//           stopWaitingForPlayers = firestore
//             .collection(COLLECTION_ID)
//             .doc(roomId)
//             .onSnapshot((doc) => {
//               const { [userId]: self, ...others } = doc.data();
//               const {
//                 firebase: { connectedTo },
//               } = store.getState();

//               Object.values(others)
//                 .filter((other) => !connectedTo.includes(other))
//                 .forEach((other) => {
//                   peerConnection.setRemoteDescription(
//                     new RTCSessionDescription(JSON.parse(other)),
//                   );
//                 });

//               store.dispatch({
//                 others,
//                 type: NEW_CONNECTION,
//               });
//             });

//           store.dispatch({
//             roomId,
//             type: CREATE_ROOM_SUCCESS,
//           });
//         })
//         .catch((error) => {
//           console.error('Room create failure:', error);
//           store.dispatch({
//             error,
//             type: CREATE_ROOM_FAILURE,
//           });
//         });
//     }
//   };
// };

// const createPeerConnection = () => {
//   peerConnection = new RTCPeerConnection({
//     iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
//   });
//   peerConnection.onicestatechange = ({ iceConnectionState }) => {
//     switch (iceConnectionState) {
//       case 'disconnected':
//       case 'closed':
//       case 'failed':
//         store.dispatch({
//           type: CONNECTION_CLOSED,
//         });
//         break;
//       default:
//         // TODO: Add some logging here to find out what isn't supported
//         break;
//     }
//   };
// };

// export const createRoom = () => (dispatch) => {
//   dispatch({
//     type: CREATE_ROOM,
//   });

//   if (!peerConnection) {
//     createPeerConnection();
//   }

//   if (firebase.auth().currentUser) {
//     finishCreatingRoom();
//   } else {
//     creatingRoom = true;
//     firebase
//       .auth()
//       .signInAnonymously()
//       .catch((error) => {
//         // Handle Errors here.
//         // var errorCode = error.code;
//         // var errorMessage = error.message;
//         // ...
//       });
//   }
// };

// export const joinRoom = (roomId) => (dispatch) => {
//   dispatch({
//     roomId,
//     type: JOIN_ROOM,
//   });

//   if (!peerConnection) {
//     createPeerConnection();
//   }

//   firestore
//     .collection(COLLECTION_ID)
//     .doc(roomId)
//     .set(
//       {
//         [userId]: JSON.stringify(peerConnection.localDescription),
//       },
//       { merge: true },
//     )
//     .then(() => {
//       stopWaitingForPlayers = firestore
//         .collection(COLLECTION_ID)
//         .doc(roomId)
//         .onSnapshot((doc) => {
//           const { [userId]: self, ...others } = doc.data();
//           const {
//             firebase: { connectedTo },
//           } = store.getState();

//           Object.values(others)
//             .filter((other) => !connectedTo.includes(other))
//             .forEach((other) => {
//               peerConnection.setRemoteDescription(
//                 new RTCSessionDescription(JSON.parse(other)),
//               );
//             });

//           store.dispatch({
//             others,
//             type: NEW_CONNECTION,
//           });
//         });

//   peerConnection.ondatachannel = ({ channel: c }) => {
//     channel = c;
//     handleChannel();
//   };
//   peerConnection.onicecandidate = ({ candidate }) => {
//     if (candidate == null) {

//           dispatch({
//             type: JOIN_ROOM_SUCCESS,
//           });
//         })
//         .catch((error) => {
//           console.error('Join room failure:', error);
//           dispatch({
//             error,
//             type: JOIN_ROOM_FAILURE,
//           });
//         });
//     }
//   };

//   peerConnection
//     .createAnswer({})
//     .then((answerDesc) => peerConnection.setLocalDescription(answerDesc))
//     .catch((err) => console.error(err));
// };

// export const closeRoom = () => (dispatch, getState) => {
//   const {
//     firebase: { roomId },
//   } = getState();

//   stopWaitingForPlayers();

//   firestore
//     .collection(COLLECTION_ID)
//     .doc(roomId)
//     .delete();

//   dispatch({
//     type: ROOM_CLOSED,
//   });
// };

// export const disconnect = () => {
//   peerConnection && peerConnection.close();

//   return {
//     type: DISCONNECT,
//   };
// };

// // ------------------------------------------------------------
// //
// //     Firebase initiated actions
// //
// // ------------------------------------------------------------

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     userId = user.uid;

//     if (creatingRoom) {
//       creatingRoom = false;
//       finishCreatingRoom();
//     }
//   }
// });

// // ------------------------------------------------------------
// //
// //     User initiated WebRTC communication
// //
// // ------------------------------------------------------------

// export const sendUpdate = (message) => {
//   channel.send(message);
// };
