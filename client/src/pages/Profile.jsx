import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from "../firebase";

function Profile() {
  const [file, setFile] = useState(null)
  const { currentUser } = useSelector(state => state.user)
  const fileInput = useRef(null)

  const  handleFileUpload = (e) => {
    e.stopPropagation();
    fileInput.current.click();
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    const storage = getStorage(app)
    console.log(file)
    const fileName = file.name + new Date().getTime()

    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file, metadata)

    uploadTask.on('state_changed', (snapshot) => {
      
    }, (error) => {
      console.log(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        console.log(downloadUrl)
      })
    })
  }

  

  return (
    <div className="w-full">
      <div className='w-full relative h-[20rem] bg-white'>
        <input onChange={handleChange} type="file" className="hidden" ref={fileInput} />
        <div onClick={handleFileUpload} className="p-3 rounded-full absolute text-gray-400 hover:text-white  bg-black right-2 top-2 cursor-pointer hover:bg-gray-800">
          <MdEdit />
        </div>
        <div className="left-3 bottom-[-6.9rem] items-center lg:bottom-[-8.7rem] absolute md:bottom-[-7.6rem]">
          <div className=" md:h-[11rem] border-4 border-gray-200  dark:border-[#0B0C0E] overflow-hidden rounded-full lg:h-[13rem] w-[9rem] h-[9rem] lg:w-[13rem] md:w-[11rem]">
              <img className="w-full h-full object-cover" src={currentUser?.picture} />
          </div>
          <h2 className="text-center font-semibold text-lg">{currentUser?.username}</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile