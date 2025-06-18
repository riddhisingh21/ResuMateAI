import { Ghost, Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import GlobalApi from '../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {

    const [openDialog, setOpenDialog] = useState(false) 
    const [resumeTitle, setResumeTitle] = useState("")
    const {user}  =useUser();
    const [loading, setLoading] = useState(false);
    const navigation=useNavigate();

    const onCreate = () =>{
        setLoading(true)
        const uuid = uuidv4();
        const data = {
            title:resumeTitle,
            resumeId:uuid,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName

        }

        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp.data.data.documentId);
            console.log(resp)
            if(resp){
                setLoading(false)
                navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit');
            }
        },(err)=>{
            console.log(err)
            setLoading(false)
        })
        
    }

  return (
    <div>
        <div className='p-14 py-24 border items-center flex justify-center 
        bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all 
        hover:shadow cursor-pointer border-dashed ' onClick={()=>setOpenDialog(true)}>
            <PlusSquare/>
        </div>

        <Dialog open = {openDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new resume</DialogTitle>
                    <DialogDescription>
                        <p className="text-muted-foreground text-sm">
                            Add a title for your new resume
                        </p>
                        <Input className="my-2"  
                        placeholder="Resume Title"
                        onChange={(e) => setResumeTitle(e.target.value)}
                        />
                    </DialogDescription>
                    <div className='flex justify-end gap-5'>
                        <button onClick={()=>setOpenDialog(false)} style={{ background: '#f3f4f6', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>
                            Cancel
                        </button>

                        <button disabled={!resumeTitle || loading} onClick={() => onCreate()} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>
                            {loading? 
                            <Loader2 className='animate-spin'/> : 'Create'
                        }
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddResume