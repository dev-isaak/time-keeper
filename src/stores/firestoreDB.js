import { defineStore } from 'pinia'
import { collection, addDoc, getDocs } from "firebase/firestore"; 

export const useFirestoreDB = defineStore('firestoreDB', {
  state: () => {
    return {

		}
  },
  getters: {},
  actions: {

		//https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment
		//el db es la variable creada en main.js
		async getTest(){
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
		},
		async postTest(){
			try {
				const docRef = await addDoc(collection(db, "users"), {
					user_name: "Ada",
					user_lastname: "Lovelace",
					user_phone: '999999',
					user_photo: 'route-photo',
					user_address: 'adress test',
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}

	}
})
