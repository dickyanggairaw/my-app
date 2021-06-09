// import { useState, useEffect } from "react";
// import { isPlatform } from "@ionic/react";

// import {
//   Camera,
//   CameraResultType,
//   CameraSource,
//   Photo,
// } from "@capacitor/camera";
// import { Filesystem, Directory } from "@capacitor/filesystem";
// import { Storage } from "@capacitor/storage";
// import { Capacitor } from "@capacitor/core";

// export function usePhotoGallery() {
//   const takePhoto = async () => {
//     const cameraPhoto = await Camera.getPhoto({
//       resultType: CameraResultType.Uri,
//       source: CameraSource.Camera,
//       quality: 100,
//     });

//     const fileName = new Date().getTime() + '.jpeg';
//     const savedFileImage = await savePicture(cameraPhoto, fileName);
//     const newPhotos = [savedFileImage, ...photos];
//   };

//   const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
//     const base64Data = await base64FromPath(photo.webPath!);
//     const savedFile = await FileSystem.writeFile({
//       path: fileName,
//       data: base64Data,
//       directory: Directory.Data
//     });
  
//     // Use webPath to display the new image instead of base64 since it's
//     // already loaded into memory
//     return {
//       filepath: fileName,
//       webviewPath: photo.webPath
//     };
//   };
//   return {    
//     takePhoto,
//   };
// }

export async function base64FromPath(path: string): Promise<string> {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string')
        }
      };
      reader.readAsDataURL(blob);
    });
}