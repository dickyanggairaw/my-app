// import { Filesystem, Directory} from "@capacitor/filesystem"

// export function usePhotoGallery(){
//     const savePicture = async (CameraPhoto: any, fileName: string): Promise<Photo> => {
//         const base64Data = await base64FromPath(photo.webPath!);
//         const savedFile = await FileSystem.writeFile({
//           path: fileName,
//           data: base64Data,
//           directory: Directory.Data
//         });
//         return {
//             filepath: fileName,
//             webviewPath: photo.webPath
//           };
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