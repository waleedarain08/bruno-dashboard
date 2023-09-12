import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"



export const handleUpload = (image) => {
    // e.preventDefault();
    return new Promise((resolve, reject) => {
        // ref(storage, `images/${image?.name}`).put(image)
        const storageRef = ref(storage, `files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100
                );
                console.log(progress)
            },
            (error) => {
                console.log(error);
                reject({ message: "Error", data: error })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve({ message: "Uploaded", data: url })
                });
            }
        );

    })

    // storage
    // .ref("images")
    // .child(image?.name)
    // .getDownloadURL()
    // .then((url) => {

    // });

};