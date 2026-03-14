import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
onSnapshot,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyADX1EtQo8_sq4RPylkSn_u9TfhrgITwVw",
  authDomain: "roommate-sync-8fbc2.firebaseapp.com",
  projectId: "roommate-sync-8fbc2",
  storageBucket: "roommate-sync-8fbc2.firebasestorage.app",
  messagingSenderId: "247388087525",
  appId: "1:247388087525:web:70ca0e0b7f21c6b770200c"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatBox = document.getElementById("chatBox");


/* Load Messages in Real Time */

const q = query(collection(db,"messages"), orderBy("time"));

onSnapshot(q,(snapshot)=>{

chatBox.innerHTML="";

snapshot.forEach((doc)=>{

const msg = doc.data();

chatBox.innerHTML += `
<p>
<b>${msg.user}</b>: ${msg.text}
</p>
`;

});

chatBox.scrollTop = chatBox.scrollHeight;

});


/* Send Message */

window.sendMessage = async function(){

const messageInput = document.getElementById("messageInput");

const message = messageInput.value.trim();

if(message === "") return;

await addDoc(collection(db,"messages"),{

user:"User",
text:message,
time:Date.now()

});

messageInput.value="";

}
