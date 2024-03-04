import { useSelector } from "react-redux"
import { MdEdit } from "react-icons/md";
import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { FaRegEnvelope } from 'react-icons/fa'
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

function Profile() {
  const [openModal, setOpenModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [openCreateModal, setCreateModal] = useState(false)
  const [user, setUser] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const fileInput = useRef(null)

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
        setUser(data)
      }
      
    }catch(err){
      console.log(err)
    }
  }


  const getPost = async ({ pageParam }) => {
    if(pageParam){
      const res = await fetch(`/api/post/getPost?ownerId=${userId.id}&limits=${pageParam * 9}`)
      return await res.json()
    }
}

const { 
  data, status, error, fetchNextPage, hasNextPage
} = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: getPost,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const nextPage = lastPage?.posts.length ? allPages[0]?.posts.length + 1 : undefined
    return nextPage
  }
})

const content = data?.pages.map(posts => 
  posts?.posts?.map((post, i) => {
    if(posts?.posts.length === i + 1){
      return <Card  post={post} key={post._id} innerRef={refView}  />
    }else{
      return <Card key={post._id} post={post} />
    }
})
)

  useEffect(() => {
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const handleChange = (e) => {
    const file = e.target.files[0]
    const storage = getStorage(app)
    const { currentUser } = useSelector(state => state.user)

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
    <div className="w-full min-h-full flex-wrap pb-4">
      <div style={{ backgroundImage: `url(${user[0]?.banner})` }} className={' relative h-[20rem] bg-no-repeat bg-center aspect-auto bg-cover'}>
        <input onChange={handleChange} type="file" className="hidden" ref={fileInput} />
        {
          user[0]?._id === currentUser._id && (
            <div onClick={handleFileUpload} className="p-3 rounded-full absolute text-gray-400 hover:text-white  bg-black right-2 top-2 cursor-pointer hover:bg-gray-800">
              <MdEdit />
            </div>
          )
        }
        <div className="w-full bottom-[-6.9rem] items-center lg:bottom-[-8.7rem] absolute md:bottom-[-7.6rem]">
          <div className="w-[94%] mx-auto">
            <div className="flex relative justify-between items-end">
              <div className=" md:h-[11rem] shrink-0 border-4 border-gray-200 min  dark:border-[#0B0C0E] overflow-hidden rounded-full lg:h-[13rem] w-[9rem] h-[9rem] lg:w-[13rem] md:w-[11rem]">
                  <img className="w-full h-full object-cover" src={user[0]?.picture} />
              </div>
              <div className="flex overflow-clip gap-4 right mb-2 items-center">
                {
                  user[0]?._id !== currentUser._id ? (
                    <>
                      <Button color="dark" className="p-0" onClick={() => follow(user[0]?._id, currentUser?._id, currentUser, setUser, user)}>
                      {
                        user[0]?.followers?.includes(currentUser?._id) ? 
                        'Following' : 'Follow'
                      }
                      </Button>
                      <Button color="light" className="p-0"><FaRegEnvelope /></Button>
                    </>

                  ): (
                    <Button className="p-0" onClick={() => setOpenModal(true)} outline color="dark"><MdEdit /></Button>
                  )
                }
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <EditModal user={user[0]} getUser={getUser} openModal={openModal} setOpenModal={setOpenModal} />
                </Modal>
              </div>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-md ml-4 lg:ml-12 md:text-lg whitespace-nowrap">{currentUser?.username}</h2>
              <div className="flex gap-4 overflow-clip">
                <Link to={`/profile/${user[0]?._id}/following`} className='flex items-baseline gap-1'>
                  <span className="text-lg dark:text-gray-300 font-semibold">{user[0]?.following?.length}</span>
                  <span className="text-xs font-semibold">Following</span>
                </Link>
                <Link onClick={() => handleFollowers(user[0]?.following)} to={`/profile/${user[0]?._id}/followers`} className="flex items-baseline gap-1">
                  <span className="dark:text-gray-300 text-lg font-semibold">{user[0]?.followers?.length}</span>
                  <span className="text-xs font-semibold">Followers</span>
                </Link>
                <div className="flex items-baseline gap-1">
                  <span className="dark:text-gray-300 text-lg font-semibold">{data?.pages[0].postCount}</span>
                  <span className="text-xs font-semibold">Posts</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-full mb-2 mt-4">
            <div className="w-[87%] mx-auto">
              <div className=" w-[60%] flex flex-col items-start">
                <p className="">{user[0]?.bio}</p>
                {
                  user[0]?._id === currentUser._id &&(
                    <button onClick={() => setCreateModal(true)} className="mt-4 p-2 rounded-full bg-black 
                    dark:bg-gray-100 dark:text-black text-white 
                    text-2xl font-extrabold flex items-center gap-1 cursor-pointer">
                      <LuPlus />
                    </button>
                  )
                }
              </div>
              <Modal show={openCreateModal} onClose={() => setCreateModal(false)}>
                <CreateModal getPost={getPost} user={user[0]} openCreateModal={openCreateModal} setCreateModal={setCreateModal} />
              </Modal>
              <div className="mb-10">
                {
                  posts && (
                    <div className='w-[80%] overflow-hidden mx-auto mt-5 grid grid-cols-2 gap-2 md:grid-cols-3'>
                      {content}
                    </div>
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