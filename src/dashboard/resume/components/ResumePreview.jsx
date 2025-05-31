import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

function ResumePreview(){

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    
    return (
        <div className="shadow-lg h-full p-14 border-t-[20px] mx-auto max-w-4xl min-w-[350px] w-full" 
            style={{borderColor: resumeInfo?.themeColor, fontFamily: 'Arial, Helvetica, sans-serif'}}
        >
            {/* {Personal Detail } */}
            <PersonalDetailPreview resumeInfo={resumeInfo}/>

            {/* Summary  */}
            <SummaryPreview resumeInfo={resumeInfo}/>

            {/* Professional Experience  */}
            <ExperiencePreview resumeInfo={resumeInfo}/>

            {/* Educational Details  */}
            <EducationalPreview  resumeInfo={resumeInfo}/>

            {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo}/>


        </div>
    )
}

export default ResumePreview
