import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Modal } from 'flowbite-react'
import { FaPlay, FaRegEnvelope } from 'react-icons/fa'
import EditModal from "../components/EditModal";
import { LuPlus } from "react-icons/lu";
import CreateModal from "../components/CreateModal";
import { Link, useParams } from "react-router-dom";
import { follow } from "../components/Common";
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Card from '../components/Card'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from "../firebase";
import Message from "../components/Message";

function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [openCreateModal, setCreateModal] = useState(false)
  const [user, setUser] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const fileInput = useRef(null)
  const [openMessage, setOpenMessage] = useState(false)

  const { inView, ref: refView } = useInView()

  const userId = useParams()

  const  handleFileUpload = (e) => {
    e.stopPropagation();
    fileInput.current.click();
  }
  
  useEffect(() => {
    getUser()
  }, [userId.id])
  
  const getUser = async () =>{
    try{
      const res = await fetch(`/api/user/getUser?userId=${userId.id}`)
      
      if(res.ok){
        const data = await res.json()
        console.log(data)
        setUser(data)
      }
      
    }catch(err){
      console.log(err)
    }
  }


  const getPosts = async () => {
      const res = await fetch(`/api/post/getPost?ownerId=${userId.id}`)
      const data = await res.json()
      
      if(res.ok){
        setPosts(data)
      }
}

useEffect(() => {
  getPosts()
}, [userId.id])



  const handleChange = (e) => {
    const file = e.target.files[0]
    const storage = getStorage(app)

    const fileName = file.name + new Date().getTime()
    console.log(file)

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
        fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            banner: downloadUrl
          })
        }).then(res => res.json())
        .then(data => {
          setUser(prev => ({...prev, banner: data.banner}))
          getUser()
        })
      })
    })
  }

  return (
    <div className="w-full min-h-screen flex-wrap pb-4">
      <div style={{ backgroundImage: `url(${user?.banner})` }} className={' relative h-[20rem] bg-no-repeat bg-center aspect-auto bg-cover'}>
        <input onChange={handleChange} type="file" className="hidden" ref={fileInput} />
        {
          user?._id === currentUser?._id && (
            <div onClick={handleFileUpload} className="p-3 rounded-full absolute text-gray-400 hover:text-white  bg-black right-2 top-2 cursor-pointer hover:bg-gray-800">
              <MdEdit />
            </div>
          )
        }
        <div className="w-full bottom-[-6.9rem] items-center lg:bottom-[-8.7rem] absolute md:bottom-[-7.6rem]">
          <div className="w-[94%] mx-auto">
            <div className="flex relative justify-between items-end">
              <div className=" md:h-[11rem] shrink-0 border-4 border-gray-200 min  dark:border-[#0B0C0E] overflow-hidden rounded-full lg:h-[13rem] w-[9rem] h-[9rem] lg:w-[13rem] md:w-[11rem]">
                  <img className="w-full h-full object-cover" src={user?.picture} />
              </div>
              <div className="flex overflow-clip gap-4 right mb-2 items-center">
                {
                  user?._id !== currentUser?._id ? (
                    <>
                      <Button color="dark" className="p-0" onClick={() => follow(user?._id, currentUser?._id, currentUser, setUser, user)}>
                      {
                        user?.followers?.includes(currentUser?._id) ? 
                        'Following' : 'Follow'
                      }
                      </Button>
                      <Button color="light" className="p-0" onClick={() => setOpenMessage(true)}><FaRegEnvelope /></Button>
                    </>

                  ): (
                    <Button className="p-0" onClick={() => setOpenModal(true)} outline color="dark"><MdEdit /></Button>
                  )
                }
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <EditModal user={user} getUser={getUser} openModal={openModal} setOpenModal={setOpenModal} />
                </Modal>
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-md ml-4 lg:ml-12 md:text-lg whitespace-nowrap">{user?.username}</h2>
              <div className="flex gap-4 overflow-clip">
                <Link to={`/profile/${user?._id}/following`} className='flex items-baseline gap-1'>
                  <span className="text-lg dark:text-gray-300 font-semibold">{user?.following?.length}</span>
                  <span className="text-xs font-semibold">Following</span>
                </Link>
                <Link onClick={() => handleFollowers(user?.following)} to={`/profile/${user?._id}/followers`} className="flex items-baseline gap-1">
                  <span className="dark:text-gray-300 text-lg font-semibold">{user?.followers?.length}</span>
                  <span className="text-xs font-semibold">Followers</span>
                </Link>
                <div className="flex items-baseline gap-1">
                  <span className="dark:text-gray-300 text-lg font-semibold">{posts?.postCount}</span>
                  <span className="text-xs font-semibold">Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-full mb-2 mt-4">
            <div className="w-[87%] mx-auto">
              <div className=" w-[60%] flex flex-col items-start">
                <p className="">{user?.bio}</p>
                {
                  user?._id === currentUser?._id &&(
                    <button onClick={() => setCreateModal(true)} className="mt-4 p-2 rounded-full bg-black 
                    dark:bg-gray-100 dark:text-black text-white 
                    text-2xl font-extrabold flex items-center gap-1 cursor-pointer">
                      <LuPlus />
                    </button>
                  )
                }
              </div>
              <Modal show={openCreateModal} onClose={() => setCreateModal(false)}>
                <CreateModal getPost={getPosts} user={user} openCreateModal={openCreateModal} setCreateModal={setCreateModal} />
              </Modal>
              <div className="mb-10">
             
                    <div className='w-[80%] overflow-hidden mx-auto mt-5 grid grid-cols-2 md:gap-3 gap-2 md:grid-cols-3'>
                      {
                        posts && (
                          posts?.posts?.map(post => (
                            <Card key={post?._id} post={post} />
                          ))
                        )
                      }
                    </div>
                    {
                      openMessage && (
                        <Message user={user} setOpenMessage={setOpenMessage} />
                      )
                    }
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile