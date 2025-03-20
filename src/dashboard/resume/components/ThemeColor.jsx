import React, { useContext, useState } from 'react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
  

function ThemeColor() {


    const colors = [

        "#FF5733", "#FFC300", "#DAF7A6", "#900C3F", "#581845",
         "#2E86C1", "#1ABC9C", "#F1C40F", "#E74C3C", "#3498DB",
          "#27AE60", "#F39C12", "#E67E22", "#9B59B6", "#34495E",
           "#2980B9", "#1F618D", "#27AE60", "#2ECC71", "#3498DB",
            "#9B59B6", "#F1C40F", "#E67E22", "#E74C3C", "#EC7063",
             "#F39C12"
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor]=useState();
    const {resumeId} = useParams();

    const onColorSelect=(color)=>{
        setSelectedColor(color);
          setResumeInfo({
            ...resumeInfo,
            themeColor:color
          })  
          const data = {
            data:{
                themeColor:color
            }
          }
          GlobalApi.UpdateResumeDetail(resumeId, data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated !')
            
          })
    }
    
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" size="sm"
            className="flex gap-2"><LayoutGrid />Theme</Button>
        </PopoverTrigger>
        <PopoverContent>
            <h2 className='mb-2 text-sm font-bold'>Select Theme color</h2>
            <div className='grid grid-cols-5'>

            {colors.map((item, index) =>{
                <div 
                onClick={()=>(onColorSelect(item))}
                className={`h-5 w-5 rounded-full cursor-pointer hover:border border-black
                    ${selectedColor===item&&'border border-black'}
                    `}
                style={
                    {
                        backgroundColor:item
                    }
                }></div>
            })}
            </div>
        </PopoverContent>
        </Popover>

  )
}

export default ThemeColor