import React, {useState} from "react";
import Axios from "axios";

const Upload = () => {

  const [imageSelected, setImageSelected] = useState("")

  const uploadImage = () => {
    const formData = new FormData ()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "xk7ohru1")
    
    Axios.post(
      "http://api.cloudinary.com/v1_1/clothespress/image/upload",
      formData
      ).then((response) => {
        console.log(response) 
      })
  };

  return (
    <div>
        <input type="file" onChange={(e) => {
        setImageSelected(e.target.files[0]);
      }} />
      <button onClick={uploadImage}> Upload Image </button>
    </div>
  )
}

export default Upload;