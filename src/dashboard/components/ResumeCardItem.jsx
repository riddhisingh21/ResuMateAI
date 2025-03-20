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
  

function ResumeCardItem({ resume, refreshData }) {
    const navigation = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDelete = () => {
        setLoading(true);
        GlobalApi.DeleteResumeById(resume.id)
            .then(resp => {
                console.log(resp);
                toast('Resume Deleted!');
                refreshData();
                setLoading(false);
                setOpenAlert(false);
            })
            .catch(error => {
                console.log(error);
                toast('Server Error, Please try again!');
                setLoading(false);
            });
    };

    return (
        <>
            <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg
                hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer'
                onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}
            >
                <Notebook />
            </div>
            
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                {/* Add your alert dialog content here */}
            </AlertDialog>
        </>
    );
}

export default ResumeCardItem
