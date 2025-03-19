import React from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import {ArrowLeft,ArrowRight,LayoutGrid} from 'lucide-react'

function FormSection(){
    const [activeFormIndex,setActiveFormIndex]=useState(2);
    const [enableNext,setEnableNext]=useState(false);
    return (
        <div>FormSection
            <div className='flex justify-between items-center'>
                <Button variant="outline" size="sm"
                className="flex gap-2"><LayoutGrid/>Theme</Button>
                <div>
                    {activeFormIndex>1 && <Button size="sm"
                    onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
                    <Button disabled={!enableNext}
                    className="flex gap-2" size="sm"
                    onClick={()=>setActiveFormIndex(activeFormIndex+1)}>
                        Next<ArrowRight/>
                    </Button>
                </div>
            </div>
            {/*personal details*/}
            {activeFormIndex==1?<PersonalDetail enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==2?
            <Summary enabledNext={(v)=>setEnableNext(v)}/>:null
        }
            {/*summary*/}
            {/*experience*/}
            {/*education details*/}
            {/*skills*/}
        </div>
        
    )
}

export default FormSection