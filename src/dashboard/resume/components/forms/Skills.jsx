import React, { useContext, useEffect, useState } from "react";
import {Rating} from '@smastrom/react-rating';
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
function Skills({ enabledNext }) {  // Add enabledNext prop
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
            rating: 0
        }
    ]);

    const {resumeId} = useParams();
    const [loading, setLoading] = useState(false);
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList(prev => [...prev, {
            name: '',
            rating: 0
        }]);
    }

    const RemoveSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(prev => prev.slice(0, -1));
        }
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                Skills: skillsList.map(({ name }) => ({ name })) // Use 'Skills' with capital S
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp);
                setLoading(false);
                toast('Details Updated !');
                enabledNext(true); // Enable next button after successful save
            })
            .catch(error => {
                console.error('Error updating skills:', error.response?.data);
                setLoading(false);
                toast('Server Error, Try Again !');
                enabledNext(false); // Disable next button if save fails
            });
    }

    useEffect(() => {
        if (resumeInfo?.Skills && Array.isArray(resumeInfo.Skills)) {
            setSkillsList(resumeInfo.Skills);
        }
    }, [resumeInfo]);

    useEffect(() => {
        if (skillsList) {
            setResumeInfo(prev => ({
                ...prev,
                Skills: skillsList // Use 'Skills' with capital S in context
            }));
        }
    }, [skillsList, setResumeInfo]);

    // Add validation effect
    useEffect(() => {
        if (skillsList) {
            const isValid = skillsList.some(skill => skill.name.trim()); // Enable next if at least one skill has a name
            enabledNext(isValid);
        } else {
            enabledNext(false);
        }
    }, [skillsList, enabledNext]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold'>Skills</h2>
            <p>Add your top professional key skills</p>
        
            <div>
                {Array.isArray(skillsList) && skillsList.map((item, index) => (
                    <div key={index} className="flex justify-between border rounded-lg p-3 mb-2">
                        <div>
                            <label className="text-xs">Name</label>
                            <Input 
                                className="w-full" 
                                value={item?.name || ''}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>

                        <Rating 
                            style={{maxWidth: 120}} 
                            value={item?.rating || 0} 
                            onChange={(v) => handleChange(index, 'rating', v)}
                        />
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <button style={{ border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }} onClick={AddNewSkills}>
                        + Add More Skills
                    </button>
                    <button 
                        style={{ border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }} 
                        onClick={RemoveSkills}
                        disabled={skillsList.length <= 1}
                    >
                        - Remove
                    </button>
                </div>
                <button disabled={loading} onClick={onSave} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default Skills
