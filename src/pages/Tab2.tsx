import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './Tab2.css';
import React, {useState} from 'react'
import { presentToast } from '../toast'
import { registerUser } from '../firebaseConfig'

const Tab2: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  async function submitRegister () {
    if(email?.trim() === '' || password?.trim() === ''){
      presentToast("email or password is required")
    }
    const res = await registerUser(email, password)
    if(res) {
      presentToast("register successfully")
    }
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
          <IonButton expand="block" onIonFocus={e => submitRegister()}>Full Button</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
