import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect } from 'react'

function Summary() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext); 
    const [summary,setSummary]=useState();

    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])
  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold'>Summary</h2>
        <p>Add Summary for your job title</p>
        </div>
        <div className='mt-7'>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" size="sm" className="border-primary text-primary">Generate from AI</Button>
            </div>
            <Textarea className="mt-5"
            onChange={(e)=>setSummary(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Summary