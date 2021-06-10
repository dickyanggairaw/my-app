import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonGrid } from '@ionic/react';
import './Splash.css';
import { useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Splash: React.FC = () => {
  const history = useHistory()
  const { login } = useSelector((state: any) => state)
  useEffect(() => {
    setInterval(function toLogin () {
      history.push('/login')
    }, 5000)
  },[])


  return (
    <IonPage>
      <IonContent>
        <IonImg src="https://i.gifer.com/PVY2.gif"/>
      </IonContent>  
    </IonPage>
  );
};

export default Splash;
