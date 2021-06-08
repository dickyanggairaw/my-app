import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonButton, IonLoading } from '@ionic/react';
import React, { useState } from 'react'
import './Tab1.css';
import { loginUser } from '../firebaseConfig'
import { setLogin } from '../store/action'
import { useHistory } from 'react-router-dom'

const Tab1: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [bussy, setBussy] = useState<boolean>(false)
  async function submitLogin () {
    setBussy(true)
    const res = await loginUser(email, password)
    if(res) {
      setLogin(res.user)
      history.push('/tab3')
    }
    setBussy(false)
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
          <IonButton size="small" slot="icon-only" onClick={e => submitLogin()}>Full Button</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
