import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './Tab2.css';
import React, {useState, useEffect} from 'react'
import { presentToast } from '../toast'
import { registerUser } from '../firebaseConfig'
import { useHistory } from 'react-router-dom'

const Tab2: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if(localStorage.login){
      history.push('/tab3')
    }
  }, [])

  async function submitRegister () {
    if(email?.trim() === '' || password?.trim() === ''){
      presentToast("email or password is required")
    }
    const res = await registerUser(email, password)
    if(res) {
      presentToast("register successfully")
    }
  }
  function login(e: any){
    e.preventDefault()
    history.push('/login')
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
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
          <IonButton size="small" slot="icon-only" onIonFocus={e => submitRegister()}>Submit</IonButton>
        </IonList>
        <p>have account ?</p>
        <a href="#" onClick={e => login(e)}>login</a>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
