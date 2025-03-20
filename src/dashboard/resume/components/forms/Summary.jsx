import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle, Brain } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { AIchatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle} , Depends on job title give me summary for my resume with 4-5 lines in JSON format with field experience Level and Summary with Experience level for Fresher, Mid-level, Experienced";

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    useEffect(() => {
        if (summary) {
            setResumeInfo({
                ...resumeInfo,
                summary: summary
            });
        }
    }, [summary]);

    const GenerateSummaryFromAI = async () => {
        try {
            setLoading(true);
            if (!resumeInfo?.jobTitle) {
                toast.error('Please add job title first');
                return;
            }

            const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
            const result = await AIchatSession.sendMessage(PROMPT);
            const response = await result.response.text();
            
            // Properly parse the JSON response
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(response);
                // Ensure the response is an array
                if (!Array.isArray(parsedResponse)) {
                    parsedResponse = [parsedResponse];
                }
                setAiGeneratedSummaryList(parsedResponse);
            } catch (parseError) {
                console.error('Failed to parse AI response:', parseError);
                toast.error('Invalid response format from AI');
            }
        } catch (error) {
            console.error('AI Generation Error:', error);
            toast.error('Failed to generate summary');
        } finally {
            setLoading(false);
        }
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                summary: summary
            }
        };
        
        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                console.log(resp);
                enabledNext(true);
                toast.success("Details updated");
            })
            .catch(error => {
                console.error('Save Error:', error);
                toast.error("Failed to save details");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button 
                            variant="outline" 
                            onClick={GenerateSummaryFromAI} 
                            type="button" 
                            size="sm" 
                            className="border-primary text-primary flex gap-2"
                            disabled={loading}
                        >
                            <Brain className='h-4 w-4'/>
                            Generate from AI
                        </Button>
                    </div>
                    <Textarea 
                        className="mt-5"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button 
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList && aiGeneratedSummaryList.length > 0 && (
                <div className="mt-5">
                    <h2 className='font-bold text-lg'>Suggestions</h2>
                    {aiGeneratedSummaryList.map((item, index) => (
                        <div key={index} className="mt-3 p-4 border rounded-lg">
                            <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                            <p className="text-sm">{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summary
