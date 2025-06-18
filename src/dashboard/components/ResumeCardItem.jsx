import { LoaderCircle, MoreVertical, Notebook, Pen } from "lucide-react";
import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
  } from "@/components/ui/alert-dialog"

  
import { useNavigate } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";
import { useState } from "react";
  

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
        <div className="flex flex-col">
           
            <div className="relative group">
                <div 
                    className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-primary rounded-lg
                    hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer'
                    onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}
                >
                    <Notebook className="w-12 h-12 text-primary" />
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resume.id}/edit`)}>
                                <Pen className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => {
                                        onDelete();    
                                        setOpenAlert(true); }}>
                                    Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Resume Title */}
            <h2 className="text-center mt-3 font-medium text-sm truncate px-2">
                {resume.title}
            </h2>

            {/* Delete Alert Dialog */}
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your resume.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={onDelete}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default ResumeCardItem
