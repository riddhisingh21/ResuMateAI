import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Summary from "./forms/Summary";


function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
    const {resumeId} = useParams();

    const enabledNext = (value) => {
        setEnableNext(value);
    };

    // Reset enableNext when switching forms
    useEffect(() => {
        setEnableNext(false);
    }, [activeFormIndex]);

    const handleNext = () => {
        setActiveFormIndex(prev => prev + 1);
        setEnableNext(false);
    };

    const handleBack = () => {
        setActiveFormIndex(prev => prev - 1);
        setEnableNext(true);
    };

    const renderForm = () => {
        switch(activeFormIndex) {
            case 1:
                return <PersonalDetail enabledNext={enabledNext}/>;
            case 2:
                return <Summary enabledNext={enabledNext}/>;
            case 3:
                return <Experience enabledNext={enabledNext}/>;
            case 4:
                return <Education enabledNext={enabledNext}/>;
            case 5:
                return <Skills enabledNext={enabledNext}/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="flex gap-5">
                    <Link to={"/dashboard"}>
                        <button type="button" style={{ background: '#f3f4f6', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Home />
                        </button>
                    </Link>
                    <ThemeColor/>
                </div>
                <div className="flex gap-2">
                    {activeFormIndex > 1 && (
                        <button 
                            type="button"
                            style={{ background: '#f3f4f6', color: '#222', border: '1px solid #ccc', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={handleBack}
                        >
                            <ArrowLeft />
                        </button>
                    )}

                    <button 
                        type="button"
                        disabled={!enableNext}
                        style={{ background: !enableNext ? '#e5e7eb' : '#2563eb', color: !enableNext ? '#888' : 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: !enableNext ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={handleNext}
                    >
                        Next<ArrowRight />
                    </button>
                </div>
            </div>

            {activeFormIndex === 1 ? (
                <PersonalDetail enabledNext={setEnableNext} />
            ) : activeFormIndex === 2 ? (
                <Summary enabledNext={setEnableNext} />
            ) : activeFormIndex === 3 ? (
                <Experience enabledNext={setEnableNext} />
            ) : activeFormIndex === 4 ? (
                <Education enabledNext={setEnableNext} />
            ) : activeFormIndex === 5 ? (
                <Skills enabledNext={setEnableNext} />
            ) : activeFormIndex === 6 ? (
                <Navigate to={`/my-resume/${resumeId}/view`}/>
            ) : null}
        </div>
    );
}

export default FormSection
