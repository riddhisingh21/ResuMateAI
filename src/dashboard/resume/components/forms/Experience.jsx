import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Experience() {
    const [experienceList, setExperienceList] = useState([{
        title: '',
        company: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
    }]);  // Initialize with one empty experience object
    
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience && resumeInfo.experience.length > 0) {
            setExperienceList(resumeInfo.experience);
        }
    }, [resumeInfo]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setExperienceList(newEntries);
        
        setResumeInfo(prev => ({
            ...prev,
            experience: newEntries
        }));
    };

    const handleRichTextChange = (index, value) => {
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            description: value
        };
        setExperienceList(newEntries);
        
        setResumeInfo(prev => ({
            ...prev,
            experience: newEntries
        }));
    };

    const onSave = async () => {
        if (experienceList.length === 0) {
            toast.error('Please add at least one experience');
            return;
        }

        setLoading(true);
        try {
            const data = {
                data: {
                    Experience: experienceList
                }
            };

            const response = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            if (response?.data) {
                toast.success('Experience updated successfully');
            }
        } catch (error) {
            console.error('Save Error:', error);
            toast.error(error.response?.data?.error?.message || 'Failed to update experience');
        } finally {
            setLoading(false);
        }
    };

    const AddNewExperience = () => {
        try {
            // Maximum limit check
            if (experienceList.length >= 10) {
                toast.error('Maximum limit of 10 experiences reached');
                return;
            }

            // Add new experience entry
            setExperienceList(prev => [...prev, {
                title: '',
                company: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                description: ''
            }]);

            // Update context
            setResumeInfo(prev => ({
                ...prev,
                experience: [...experienceList, {
                    title: '',
                    company: '',
                    city: '',
                    state: '',
                    startDate: '',
                    endDate: '',
                    currentlyWorking: false,
                    description: ''
                }]
            }));

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
                    <Button 
                        variant="outline" 
                        className="text-primary" 
                        onClick={AddNewExperience}
                        type="button"
                    >
                        + Add More
                    </Button>
                    <Button 
                        variant="outline" 
                        className="text-primary" 
                        onClick={RemoveExperience}
                        type="button"
                        disabled={experienceList.length === 0}
                    >
                        - Remove
                    </Button>
                </div>
                <Button 
                    disabled={loading} 
                    onClick={onSave}
                    type="button"
                >
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Experience
