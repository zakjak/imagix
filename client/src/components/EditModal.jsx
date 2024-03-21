import { 
    Modal,
    Label,
    TextInput,
    Textarea,
    Button
 } from 'flowbite-react'
 import { useState } from 'react'

function EditModal({ openModal, setOpenModal, user, getUser }) {
    const [field, setField] = useState({name: user?.username, bio: user?.bio})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`https://imagix-delta.vercel.app/api/user/update/${user._id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: field.name,
                bio: field.bio
            })
        })

        if(res.ok){
            setOpenModal(false)
            getUser()
        }
    }

    const handleChange = (e) => {
        if(field.bio.length < 200){
            setField({...field, [e.target.id]: e.target.value})
        }
    }

  return (
        <>
        <Modal.Header>Edit your profile {user?.name}</Modal.Header>
        <form onSubmit={handleSubmit}>
            <div className="p-6 flex flex-col gap-2">
                {
                    user && (
                        <>
                        <div className="flex flex-col gap-2">
                            <Label>Name:</Label>
                            <TextInput type='text' id='username' value={field?.name} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Bio:</Label>
                            <Textarea id='bio' value={field.bio} onChange={handleChange} />
                            <p className='text-gray-400 text-sm text-right'>{`${200 - field?.bio?.length} characters left`}</p>
                        </div>
                        </>
                    )
                }
                <Button type='submit'>Edit</Button>
            </div>
        </form>
        </>
  )
}

export default EditModal