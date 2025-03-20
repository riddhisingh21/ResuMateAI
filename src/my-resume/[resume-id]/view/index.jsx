import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";

function ViewResume(){

    const [resumeInfo, setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })

    }

    const HandleDownload=()=>{
        window.print();
    }
    return (
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div id='no-print'>
            <Header/>
            <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                <h2 className="text-center text-2xl font-medium">Congrats! Your ResuMate AI generated resume is ready !</h2>
                <p className="text-center text-gray-400">Now you are ready to download you resume and you can share unique resume URL with your friends and family</p>
                <div className="flex justify-between px-44 my-10">
                    <Button onClick={HandleDownload}>Download</Button>
                    <Button>Share</Button>
                </div>
                </div>
                
            </div>
            <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <div id='print-area'>
                    <ResumePreview/>
                </div> 

                </div>
           
      
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume