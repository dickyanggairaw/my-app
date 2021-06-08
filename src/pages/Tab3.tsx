import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonInput, IonItem, IonImg } from '@ionic/react';
import './Tab3.css';
import React, {useEffect, useState} from 'react'
import { getUser, updateUser } from '../firebaseConfig'
import {useHistory} from 'react-router-dom'


const Tab3: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [picture, setPicture] = useState<string>('')

  useEffect(() => {
    getUser()
      .then((user: any) => {
        if(user) {
          console.log("ini user: ", user.email)
          setEmail(user.email)
          setName(user.displayName)
          setPicture(user.photoUrl)
        }else{
          history.push('/login')
        }
      }) 
  },[])
  function buttonHandle( ){
    console.log("bisa 1")
    updateUser()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src="https://th.bing.com/th/id/OIP.e3E1cAv_ChVq9jJqrV72YwHaEK?w=288&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
      <IonList>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput type="email" defaultValue={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton onClick={() => buttonHandle()}>submit</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
