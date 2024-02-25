import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from "../firebase";
import { Button, Modal } from 'flowbite-react'
import { FaRegEnvelope } from 'react-icons/fa'
import EditModal from "../components/EditModal";

function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const [user, setUser] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [downloadUrl, setDownloadUrl] = useState('')
  const fileInput = useRef(null)

  const  handleFileUpload = (e) => {
    e.stopPropagation();
    fileInput.current.click();
  }

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
        fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            banner: downloadUrl
          })
        }).then(res => res.json())
        .then(data => {
          setUser([...user, {banner:data.banner}])
        })
      })
    })
  }


  useEffect(() => {
    const getUser = async () =>{
      try{
        const res = await fetch(`/api/user/getUser/${currentUser._id}`)
  
        if(res.ok){
          const data = await res.json()
          setUser(data)
        }
        
      }catch(err){
        console.log(err)
      }
    }
    getUser()
  }, [currentUser._id])

  console.log(user)
  

  return (
    <div className="w-full min-h-screen">
      <div style={{ backgroundImage: `url(${user?.banner})` }} className={' relative h-[20rem] bg-no-repeat bg-center aspect-auto bg-cover'}>
        <input onChange={handleChange} type="file" className="hidden" ref={fileInput} />
        <div onClick={handleFileUpload} className="p-3 rounded-full absolute text-gray-400 hover:text-white  bg-black right-2 top-2 cursor-pointer hover:bg-gray-800">
          <MdEdit />
        </div>
        <div className="w-full bottom-[-6.9rem] items-center lg:bottom-[-8.7rem] absolute md:bottom-[-7.6rem]">
          <div className="w-[94%] mx-auto">
            <div className="flex relative justify-between items-end">
              <div className=" md:h-[11rem] border-4 border-gray-200 min  dark:border-[#0B0C0E] overflow-hidden rounded-full lg:h-[13rem] w-[9rem] h-[9rem] lg:w-[13rem] md:w-[11rem]">
                  <img className="w-full h-full object-cover" src={user?.picture} />
              </div>
              <div className="flex gap-4 right mb-2 items-center">
                <Button color="dark">Follow</Button>
                <Button color="light"><FaRegEnvelope /></Button>
                <Button onClick={() => setOpenModal(true)} outline color="dark"><MdEdit /></Button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <EditModal user={user} openModal={openModal} setOpenModal={setOpenModal} />
                </Modal>
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-lg ml-2 whitespace-nowrap">{currentUser?.username}</h2>
              <div className="flex gap-4">
                <div className='flex flex-col text-center'>
                  <span className="text-lg dark:text-gray-300 font-semibold">{user?.following?.length}</span>
                  <span>Following</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="dark:text-gray-300 text-lg font-semibold">{user?.followers?.length}</span>
                  <span>Followers</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="dark:text-gray-300 text-lg font-semibold">0</span>
                  <span>Posts</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 ml-8 w-[60%] absolute">{user?.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile