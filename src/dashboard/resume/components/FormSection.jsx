import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Summary from "./forms/Summary";

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(2);
    const [enableNext, setEnableNext] = useState(false);
    const {resumeId}=useParams();
    return (
        <div>FormSection
            <div className='flex justify-between items-center'>
                <div className="flex gap-5">
                    <Link to={"dashboard"}>
                        <Button><Home /></Button>
                    </Link>
                    <ThemeColor/>

                </div>
                <div className="flex gap-2">
                    {activeFormIndex > 1 && <Button size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex - 1)}><ArrowLeft /></Button>}
                    <Button disabled={!enableNext}
                        className="flex gap-2" size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
                        Next<ArrowRight />
                    </Button>
                </div>
            </div>
            {/*personal details*/}
            {activeFormIndex == 1 ? <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
                : activeFormIndex == 2 ?
                    <Summary enabledNext={(v) => setEnableNext(v)} />

                    : activeFormIndex == 3 ?
                        <Experience />
                        : activeFormIndex == 4 ?
                            <Education />
                            : activeFormIndex == 5 ?
                                <Skills />
                                :activeFormIndex==6 ?
                                <Navigate to={'/my-resume/'+resumeId+'/view'}/>
                                : null
            }
            {/*summary*/}
            {/*experience*/}
            {/*education details*/}
            {/*skills*/}
        </div>

    )
}

export default FormSection