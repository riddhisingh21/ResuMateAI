import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'react-toastify';

function Experience() {;
    const [experienceList, setExperienceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience) {
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
        
        setResumeInfo({
            ...resumeInfo,
            experience: newEntries
        });
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList
            }
        };

        GlobalApi.UpdateResumeDetail(params.resumeId, data)
            .then(resp => {
                toast.success('Experience updated successfully');
                setLoading(false);
            })
            .catch(error => {
                toast.error('Failed to update experience');
                setLoading(false);
            });
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }]);
    };

    const RemoveExperience = () => {
        if (experienceList.length > 0) {
            setExperienceList(experienceList.slice(0, -1));
        }
    };

    return (
        <div className="space-y-4">
            {experienceList.map((exp, index) => (
                <div key={index} className="p-4 border rounded-lg">
                    {/* Add your form fields here */}
                </div>
            ))}
            
            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-primary" onClick={AddNewExperience}>
                        + Add More
                    </Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveExperience}>
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Experience
