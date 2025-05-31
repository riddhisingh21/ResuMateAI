import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle, Brain } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { AIchatSession } from './../../../../../service/AIModal';

const PROMPT = "Job Title: {jobTitle} , Depends on job title give me summary for my resume with 4-5 lines in JSON format with field experience Level and Summary with Experience level for Fresher, Mid-level, Experienced";

function Summary({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    // Add this useEffect to initialize the summary with saved content
    useEffect(() => {
        if (resumeInfo?.summary) {
            setSummary(resumeInfo.summary);
            enabledNext(true); // Enable next button if summary exists
        }
    }, [resumeInfo]);

    useEffect(() => {
        if (resumeInfo && summary) {
            setResumeInfo(prev => ({
                ...prev,
                summary
            }));
        }
    }, [summary, setResumeInfo]);

    const formatAIResponse = (response) => {
        try {
            const parsedResponse = JSON.parse(response);
            const summaries = [];

            // Handle new structure: { Developer: [ { ExperienceLevel, Summary: [] }, ... ] }
            const mainKey = Object.keys(parsedResponse).find(
                key => Array.isArray(parsedResponse[key]) && parsedResponse[key].every(item => item.ExperienceLevel && item.Summary)
            );
            if (mainKey) {
                parsedResponse[mainKey].forEach(item => {
                    summaries.push({
                        experienceLevel: item.ExperienceLevel || '',
                        summary: Array.isArray(item.Summary) ? item.Summary.join('\n') : (item.Summary || '')
                    });
                });
                return summaries;
            }

            // Handle new AI response structure
            if (Array.isArray(parsedResponse.resumeSummaries)) {
                parsedResponse.resumeSummaries.forEach(item => {
                    summaries.push({
                        experienceLevel: item.experienceLevel || '',
                        summary: item.summary || ''
                    });
                });
                return summaries;
            }

            // Fallback to old structure
            if (
                Array.isArray(parsedResponse.Summary) &&
                parsedResponse.Summary.length > 0 &&
                Array.isArray(parsedResponse.ExperienceLevel)
            ) {
                const summaryObj = parsedResponse.Summary[0];
                parsedResponse.ExperienceLevel.forEach(level => {
                    summaries.push({
                        experienceLevel: level,
                        summary: summaryObj[level] || ''
                    });
                });
                return summaries;
            }

            // Log unexpected structure for debugging
            console.error('Unexpected AI response structure:', parsedResponse);
            return [];
        } catch (error) {
            console.error('Parsing error:', error, '\nRaw response:', response);
            return [];
        }
    };

    const GenerateSummaryFromAI = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error('Please add job title first');
            return;
        }

        setLoading(true);
        try {
            const formattedPrompt = PROMPT.replace('{jobTitle}', resumeInfo.jobTitle);
            const result = await AIchatSession.sendMessage(formattedPrompt);
            
            if (!result || !result.response) {
                throw new Error('No response from AI');
            }

            const response = await result.response.text();
            const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
            
            const formattedResponse = formatAIResponse(cleanedResponse);
            
            if (formattedResponse.length > 0) {
                setAiGeneratedSummaryList(formattedResponse);
                setSummary(formattedResponse[0].summary);
                toast.success('Successfully generated summaries');
            } else {
                toast.error('Failed to generate summary');
            }
        } catch (error) {
            console.error('AI Generation Error:', error);
            toast.error('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        
        if (!summary.trim()) {
            toast.error('Please add a summary');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                data: { summary }
            };
            
            const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, payload);
            
            if (response?.data) {
                enabledNext(true);
                toast.success('Summary updated successfully');
            }
        } catch (error) {
            console.error('Save Error:', error);
            const errorMessage = error.response?.data?.error?.message || 'Failed to save summary';
            toast.error(errorMessage);
            enabledNext(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSummarySelect = (selectedSummary) => {
        setSummary(selectedSummary);
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <button 
                            type="button"
                            style={{ border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '6px 12px', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
                            onClick={(e) => {
                                e.preventDefault();
                                GenerateSummaryFromAI();
                            }}
                            disabled={loading}
                        >
                            <Brain className='h-4 w-4'/>
                            Generate from AI
                        </button>
                    </div>
                    <Textarea 
                        className="mt-5"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Enter your professional summary"
                        rows={6}
                    />
                    <div className='mt-2 flex justify-end'>
                        <button 
                            type='submit'
                            disabled={loading}
                            style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}
                        >
                            {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                        </button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummaryList.length > 0 && (
                <div className="mt-5">
                    <h2 className='font-bold text-lg'>AI Generated Suggestions</h2>
                    <div className="space-y-4 mt-3">
                        {aiGeneratedSummaryList.map((item, index) => (
                            <div 
                                key={index} 
                                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => handleSummarySelect(item.summary)}
                            >
                                <h3 className='font-bold text-primary mb-2'>
                                    {item.experienceLevel} Level
                                </h3>
                                <p className="text-sm whitespace-pre-line">
                                    {item.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Summary;
