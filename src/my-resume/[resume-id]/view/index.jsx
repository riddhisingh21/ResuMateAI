import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print'>
                <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                    <h2 className="text-center text-2xl font-medium">Congrats! Your ResuMate AI generated resume is ready!</h2>
                    <p className="text-center text-gray-400">Now you are ready to download your resume and you can share unique resume URL with your friends and family</p>
                    <div className="flex justify-between px-44 my-10">
                        <button onClick={HandleDownload} style={{background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer'}}>Download</button>
                        <RWebShare
                            data={{
                                text: "Hello, everyone this is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " Resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <button type="button" style={{background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer'}}>Share</button>
                        </RWebShare>
                    </div>
                </div>
            </div>
            <div className="my-10 mx-10 md:mx-20 lg:mx-36">
                <div id='print-area'>
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume
