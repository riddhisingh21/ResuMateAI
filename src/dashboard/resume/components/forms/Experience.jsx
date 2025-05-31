import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Experience({ enabledNext }) {
    const [experienceList, setExperienceList] = useState([{
        title: '',
        company: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
    }]);  
    
    const context = useContext(ResumeInfoContext);
    const resumeInfo = context?.resumeInfo;
    const setResumeInfo = context?.setResumeInfo;
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (resumeInfo?.Experience && resumeInfo.Experience.length > 0 && !initialized) {
            // Clean the incoming data
            const cleanedData = resumeInfo.Experience.map(({ id, ...rest }) => rest);
            setExperienceList(cleanedData);
            setInitialized(true);
            enabledNext(true);
        }
    }, [resumeInfo, initialized, enabledNext]);

    useEffect(() => {
        if (initialized && setResumeInfo) {
            setResumeInfo(prev => ({
                ...prev,
                Experience: experienceList
            }));
        }
    }, [experienceList, setResumeInfo, initialized]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setExperienceList(newEntries);
        
        // Update the context immediately
        if (setResumeInfo) {
            setResumeInfo(prev => ({
                ...prev,
                experience: newEntries
            }));
        }
    };

    const handleRichTextChange = (index, value) => {
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            description: value
        };
        setExperienceList(newEntries);
        
        // Update the context immediately
        if (setResumeInfo) {
            setResumeInfo(prev => ({
                ...prev,
                experience: newEntries
            }));
        }
    };

    const onSave = async () => {
        if (experienceList.length === 0) {
            toast.error('Please add at least one experience');
            return;
        }

        // Validate required fields
        const isValid = experienceList.every(exp => 
            exp.title.trim() && 
            exp.company.trim() && 
            exp.startDate
        );

        if (!isValid) {
            toast.error('Please fill in all required fields (Job Title, Company, and Start Date)');
            return;
        }

        setLoading(true);
        try {
            // Remove any id fields from the experience entries
            const cleanedExperienceList = experienceList.map(({ id, ...rest }) => rest);

            const data = {
                data: {
                    Experience: cleanedExperienceList
                }
            };

            const response = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            if (response?.data) {
                toast.success('Experience updated successfully');
                enabledNext(true);
                setInitialized(true);
            }
        } catch (error) {
            console.error('Save Error:', error);
            toast.error(error.response?.data?.error?.message || 'Failed to update experience');
            enabledNext(false);
        } finally {
            setLoading(false);
        }
    };

    const AddNewExperience = () => {
        try {
            if (experienceList.length >= 10) {
                toast.error('Maximum limit of 10 experiences reached');
                return;
            }

            const newExperience = {
                title: '',
                company: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                description: ''
            };

            setExperienceList(prev => [...prev, newExperience]);

            if (setResumeInfo) {
                setResumeInfo(prev => ({
                    ...prev,
                    Experience: [...experienceList, newExperience]
                }));
            }

            toast.success('New experience section added');
        } catch (error) {
            console.error('Error adding new experience:', error);
            toast.error('Failed to add new experience section');
        }
    };

    const RemoveExperience = () => {
        if (experienceList.length > 0) {
            setExperienceList(prev => prev.slice(0, -1));
        }
    };

    return (
        <div className="space-y-4">
            {experienceList.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Title</label>
                            <Input
                                type="text"
                                name="title"
                                value={exp.title}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g. Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g. Tech Corp"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">City</label>
                            <Input
                                type="text"
                                name="city"
                                value={exp.city}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g. San Francisco"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">State</label>
                            <Input
                                type="text"
                                name="state"
                                value={exp.state}
                                onChange={(e) => handleChange(index, e)}
                                placeholder="e.g. CA"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input
                                type="date"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Date</label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={exp.endDate}
                                    onChange={(e) => handleChange(index, e)}
                                    disabled={exp.currentlyWorking}
                                />
                                <label className="flex items-center gap-3">
                                    <Input
                                        type="checkbox"
                                        name="currentlyWorking"
                                        checked={exp.currentlyWorking}
                                        onChange={(e) => handleChange(index, {
                                            target: {
                                                name: 'currentlyWorking',
                                                value: e.target.checked
                                            }
                                        })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm">Current</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <RichTextEditor
                            value={exp.description}
                            onChange={(value) => handleRichTextChange(index, value)}
                            index={index}
                        />
                    </div>
                </div>
            ))}
            
            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <button 
                        style={{ border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }} 
                        onClick={AddNewExperience}
                        type="button"
                    >
                        + Add More
                    </button>
                    <button 
                        style={{ border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }} 
                        onClick={RemoveExperience}
                        type="button"
                        disabled={experienceList.length === 0}
                    >
                        - Remove
                    </button>
                </div>
                <button 
                    disabled={loading} 
                    onClick={onSave}
                    type="button"
                    style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}
                >
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default Experience
