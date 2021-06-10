import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonButton, IonLoading } from '@ionic/react';
import React, { useState, useEffect } from 'react'
import './Tab1.css';
import { loginUser } from '../firebaseConfig'
import { setLogin } from '../store/action'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Tab1: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bussy, setBussy] = useState<boolean>(false)

  useEffect(() => {
    if(localStorage.login){
      history.push('/tab3')
    }
  }, [localStorage])
 
  async function submitLogin (e: any) {
    e.preventDefault()
    setBussy(true)
    const res = await loginUser(email, password)
    if(res) {
      localStorage.setItem('login', "true")
      dispatch(setLogin(true))
      history.push('/tab3')
    }
    setBussy(false)
  }
  function register (e:any){
    e.preventDefault()
    history.push('/register')
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      {<IonLoading message="Please wait" duration={0} isOpen={bussy}/>}
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
          <IonLabel>Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton size="small" slot="icon-only" onClick={e => submitLogin(e)}>Submit</IonButton>
        </IonList>
        <p>Dont have account ?</p>
        <a href="#" onClick={e => register(e)}>register</a>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
