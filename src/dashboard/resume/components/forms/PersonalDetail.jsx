import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function PersonalDetail({ enabledNext }) {

    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo?.firstName || '',
                lastName: resumeInfo?.lastName || '',
                jobTitle: resumeInfo?.jobTitle || '',
                address: resumeInfo?.address || '',
                phone: resumeInfo?.phone || '',
                email: resumeInfo?.email || ''
            });
        }
    }, [resumeInfo]);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        enabledNext(false);

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setResumeInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSave = async (e) => {
        
        e.preventDefault();
        setLoading(true);

        try {
            // Structure the data according to Strapi's requirements
            const payload = {
                data: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    jobTitle: formData.jobTitle,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email
                }
            };
            
            const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, payload);
            
            if (resp.data) {
                enabledNext(true);
                toast("Details updated");
            }

        } catch (error) {
            console.error('Error updating details:', error); // Log the error
            // Log more detailed error information
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
            toast("Failed to update details");
            enabledNext(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>

            <h2 className='font-bold'>Personal Detail</h2>
            <p>Get Started with the Basic Information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input 
                            name='firstName' 
                            value={formData.firstName || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input 
                            name='lastName' 
                            value={formData.lastName || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='col-span-2'>Job Title</label>
                        <Input 
                            name='jobTitle' 
                            value={formData.jobTitle || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='col-span-2'>Address</label>
                        <Input 
                            name='address' 
                            value={formData.address || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='text-sm'>Phone Number</label>
                        <Input 
                            name='phone' 
                            value={formData.phone || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className='text-sm'>Email</label>
                        <Input 
                            name='email' 
                            value={formData.email || ''} 
                            required 
                            onChange={handleInputChange}
                        />
                    </div>
                    
                </div>
                <div className='mt-3 flex justify-end'>
                    <button type='submit' disabled={loading} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer' }}>
                        {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetail
