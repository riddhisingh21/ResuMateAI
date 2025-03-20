import { LoaderCircle, MoreVertical, Notebook, Pen } from "lucide-react";
import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  
import { useNavigate } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";
  

function ResumeCardItem({resume}){

    const navigation = useNavigate();

    const onDelete=()=>{
        setLoading(true);
        GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
            console.log(resp);
            toast('Resume Deleted !')
            refreshData();
            setLoading(false);
            setOpenAlert(false);
        },
        (error)=>{
            console.log(error);
            toast('Server Error, Please try again !')
            setLoading(false);
        }
    )
    }

    const [openAlert, setOpenAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <>
        <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
            <div className='p-14 bg-graident-to-b bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg
            hover:scale-105 transition-all hover:shadow-md shadow-primary'>
                <Notebook/>

            </div>
        </Link>
        <div className="border p-3 flex justify-between text-white"
        style={{
            backgroundColor:resume?.themeColor
        }}>
            <h2 className='text-center my-1'>{resume.title}</h2>
            
            <DropdownMenu>
            <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 curosr-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                
                <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+'/edit')} > <Pen/> Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')} >View</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')}>Download</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpenAlert(true)} >Delete</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>


            <AlertDialog open={openAlert}>
     
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={loading} >
                    {loading? <LoaderCircle className='animate-spin'/> : 'Delete' }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>


        </div>
        </>
    )
}

export default ResumeCardItem