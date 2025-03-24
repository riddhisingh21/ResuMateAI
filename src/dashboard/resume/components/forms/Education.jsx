import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, University } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

function Education({ enabledNext }) {
    const[loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    const handleChange = (event, index) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList.slice(0, educationalList.length - 1));
    }

    const onSave = async () => {
        // Validate required fields
        const isValid = educationalList.every(edu => 
            edu.universityName.trim() && 
            edu.degree.trim() && 
            edu.startDate
        );

        if (!isValid) {
            toast.error('Please fill in all required fields (University Name, Degree, and Start Date)');
            enabledNext(false);
            return;
        }

        setLoading(true);
        try {
            const data = {
                data: {
                    Education: educationalList.map(({id, ...rest}) => rest)
                }
            };

            const response = await GlobalApi.UpdateResumeDetail(params.resumeId, data);
            if (response.data) {
                toast.success('Education details updated successfully');
                enabledNext(true); // Enable next button after successful save
            }
        } catch (error) {
            console.error('Save Error:', error);
            toast.error('Server Error, Please try again!');
            enabledNext(false); // Disable next button if save fails
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (resumeInfo?.education) {
            setEducationalList(resumeInfo.education);
        }
    }, [resumeInfo]);

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            Education: educationalList
        }));
    }, [educationalList, setResumeInfo]);

    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            const isValid = resumeInfo.education.every(edu => 
                edu.universityName?.trim() && 
                edu.degree?.trim() && 
                edu.startDate
            );
            enabledNext(isValid);
        } else {
            enabledNext(false);
        }
    }, [resumeInfo?.education, enabledNext]);
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold'>Education</h2>
            <p>Add your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div>
                        <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                            <div className="col-span-2">
                                <label>University Name</label>
                                <Input name="universityName" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.universityName}
                                >
                                </Input>
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input name="degree" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.degree}></Input>
                            </div>

                            <div>
                                <label>Major</label>
                                <Input name="major" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.major}></Input>
                            </div>

                            <div>
                                <label>Start Date</label>
                                <Input type="date" name="startDate" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.startDate}></Input>
                            </div>

                            <div>
                                <label>End Date</label>
                                <Input type="date" name="endDate" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.endDate}></Input>
                            </div>

                            <div className="col-span-2">
                                <label>Description</label>
                                <Textarea name="description" 
                                onChange={(e) => handleChange(e, index)}
                                defaultValue={item?.description}></Textarea>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div>
                    <Button variant="outline" className="text-primary" onClick={AddNewEducation} >+ Add More Education</Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveEducation} >- Remove</Button>
                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Education
