import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";

function ResumePreview(){

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    return (
        <div>
            {/* {Personal Detail } */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>

            {/* Summary  */}

            {/* Professional Experience  */}

            {/* Educational Details  */}

            {/* Skills */}

        </div>
    )
}

export default ResumePreview