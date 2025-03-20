import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
const formField = {
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}


function Experience() {
    
    const [experienceList ,setExperienceList]=useState([formField]);



    const {resumeInfo,setResumeInfo} =useContext(ResumeInfoContext);
    const params=useParams();
    const[loading, setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo&&setExperienceList(resumeInfo?.Experience)

    },[resumeInfo])

    const handleChange = (index, event)=>{

        const newEntries = experienceList.slice();

        const {name, value} = event.target;

        newEntries[index][name] = value;
        setExperienceList(newEntries);

    }

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,formField])
    }

    const RemoveExperience=()=>{
        setExperienceList(experienceList.slice(0,experienceList.length-1))
    }

    const handleRichTextEditor=(e, name, index )=>{

        const newEntries = experienceList.slice();

        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);

    }

    const onSave=()=>{
        setLoading(true);
        const data={
            data:{
                Experience:experienceList.map(({id,...rest})=>rest)
            }
        }
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        })
    },[experienceList])                      
 


  return (
     <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold'>Professional Experience</h2>
        <p>Add your previous Job Experiences</p>

        <div>
            {experienceList.map((item, index) =>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>

                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.title}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.companyName}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.city}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.state}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.startDate}
                            />
                        </div>

                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" 
                            onChange={(event)=>handleChange(index, event)}
                            defaultValue={item?.endDate}
                            />
                        </div>

                        <div className='col-span-2'>

                            <RichTextEditor 
                            index={index}
                            defaultValue={item?.workSummary}
                            onRichTextEditorChange={(event)=>handleRichTextEditor(event, 'workSummary',index)}/>

                        </div>

                    </div>
                </div>
            ))}
        </div>

        <div className='flex justify-between'>
            <div className="flex gap-2">
            <Button variant="outline" className="text-primary" onClick={AddNewExperience} >+ Add More</Button>
            <Button variant="outline" className="text-primary" onClick={RemoveExperience} >- Remove</Button>
            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
                {loading? <LoaderCircle className='animate-spin'/>:'Save'}
            </Button>
        </div>
    </div>
  )
}

export default Experience