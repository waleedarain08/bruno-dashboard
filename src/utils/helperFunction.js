import { storage } from "./firebase";


export const handleUpload = (image) => {
    // e.preventDefault();
    return new Promise((resolve, reject) => {
        const uploadTask = storage.ref(`images/${image?.name}`).put(image);
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
                storage
                    .ref("images")
                    .child(image?.name)
                    .getDownloadURL()
                    .then((url) => {
                        resolve({ message: "Uploaded", data: url })
                    });

            }
        );

    })



};