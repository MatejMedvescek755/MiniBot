const admin = require('firebase-admin');

require('dotenv').config();

const serviceAccount = require("../firestoreKey.json");
const { get } = require('http');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const init = async (chatId) => {
  try{
    const userRef = db.collection('users').doc(chatId.toString());
    const user = await userRef.get();
    if(!user.exists){
        await userRef.set({
            balance: 1000,
            betAmount: 0,
            betNumber: null,
        });
    }
  }catch(err){
    console.log(err);
    throw err;
  }
}


const updateUser = async (chatId, updates) => {
  const userRef = db.collection('users').doc(chatId.toString());

  try {
      await userRef.update(updates);
      console.log(`User with chatId ${chatId} has been updated.`);
  } catch (err) {
      console.error('Error updating document:', err);
  }
};

const getUserData = async (chatId) => {
  const userRef = db.collection('users').doc(chatId.toString());

  try {
      const doc = await userRef.get();
      if (doc.exists) {
          console.log('Document data:', doc.data());
          return doc.data();
      } else {
          console.log('No such document!');
          return null;
      }
  } catch (err) {
      console.error('Error getting document:', err);
      throw err;
  }
};




module.exports= { init, updateUser, getUserData };