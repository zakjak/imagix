import { Button, Modal, TextInput, Textarea } from 'flowbite-react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useRef, useState } from 'react'; 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

function CreateModal({ user, setCreateModal, getPost }) {
    const fileInput = useRef(null)
    const [desc, setDesc] = useState('')
    const [photo, setPhoto] = useState('')

    const handleChange = (e) => {
        const file = e.target.files[0]
        const storage = getStorage(app)
    
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
            setPhoto(downloadUrl)
          })
        })
      }

    const handleFileUpload = (e) => {
        e.stopPropagation()
        fileInput.current.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`https://imagix-xwa1.onrender.com/api/post/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              image: photo,
              desc: desc,
              userId: user._id
            })
          })

          if(res.ok){
            setCreateModal(false)
            getPost()
          }
    }

  return (
    <>
        <Modal.Header>Create</Modal.Header>
        <form onSubmit={handleSubmit}>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <Textarea value={desc} onChange={e => setDesc(e.target.value)} className='max-h-12 min-h-12' type='text' placeholder={`Enter your mind, ${user.username.split(' ')[0]}`} />
                    <TextInput className='hidden' type='file' ref={fileInput} onChange={handleChange} />
                    
                        {
                            photo ? (
                                <div className="relative w-[20rem] h-[15rem] rounded-md overflow-hidden">
                                    <img className='w-full h-full absolute' src={photo} alt="" />
                                    <div onClick={() => setPhoto('')} className="absolute p-4 text-white bg-black rounded-full  right-2 top-2 cursor-pointer">
                                        <IoCloseOutline />
                                    </div>
                                </div>
                            ): (
                                <div onClick={handleFileUpload}   className="h-32 w-32 cursor-pointer bg-gray-200 flex items-center justify-center text-gray-600 text-3xl rounded-md">
                                    <FaCloudUploadAlt />
                                </div>
                            )
                        }
                    <Button type='submut' disabled={!photo || !desc}>Post</Button>
                </div>
            </Modal.Body>
        </form>
    </>

  )
}

export default CreateModal