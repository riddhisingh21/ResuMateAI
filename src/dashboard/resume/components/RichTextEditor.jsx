import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState, useContext, useEffect } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIchatSession } from '../../../../service/AIModal';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const PROMPT = `Job Title: {positionTitle}
Please provide 5-7 bullet points for my experience in resume, formatted as a JSON object with the following structure:
{
    "ExperienceLevel": ["Fresher", "Mid-level", "Senior"],
    "bulletPoints": {
        "Fresher": ["point1", "point2", ...],
        "Mid-level": ["point1", "point2", ...],
        "Senior": ["point1", "point2", ...]
    }
}`;

function RichTextEditor({ value, onChange, index }) {
    const [editorValue, setEditorValue] = useState(value || '');
    const [loading, setLoading] = useState(false);
    const { resumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        setEditorValue(value || '');
    }, [value]);

    const handleEditorChange = (e) => {
        const newValue = e.target.value;
        setEditorValue(newValue);
        onChange(newValue);
    };

    const formatAIResponseToHTML = (response) => {
        try {
            const parsedResponse = JSON.parse(response);
            let htmlContent = '';

            if (!parsedResponse.ExperienceLevel || !parsedResponse.bulletPoints) {
                throw new Error('Invalid response format');
            }

            parsedResponse.ExperienceLevel.forEach(level => {
                
                if (parsedResponse.bulletPoints[level] && Array.isArray(parsedResponse.bulletPoints[level])) {
                    htmlContent += `<p><strong>${level}:</strong></p><ul>`;
                    parsedResponse.bulletPoints[level].forEach(point => {
                        htmlContent += `<li>${point}</li>`;
                    });
                    htmlContent += '</ul>';
                }
            });

            if (!htmlContent) {
                throw new Error('No valid content found in response');
            }

            return htmlContent;
        } catch (error) {
            console.error('Parsing error:', error);
          
            return '<p>Failed to format AI response. Please try again.</p>';
        }
    };

    const GenerateSummaryFromAI = async () => {
        try {
            setLoading(true);
            if (!resumeInfo?.experience?.[index]?.title) {
                toast.error('Please add job title first');
                return;
            }

            const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
            const result = await AIchatSession.sendMessage(prompt);
            const response = await result.response.text();
            
            
            console.log('Raw AI Response:', response);
            
            const formattedHTML = formatAIResponseToHTML(response);
            
            if (formattedHTML.includes('Failed to format AI response')) {
                toast.error('Invalid AI response format. Please try again.');
                return;
            }
            
            setEditorValue(formattedHTML);
            onChange(formattedHTML);
        } catch (error) {
            console.error('AI Generation Error:', error);
            toast.error('Failed to generate content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <button
                    type="button"
                    style={{border: '1px solid #2563eb', background: '#fff', color: '#2563eb', borderRadius: '6px', padding: '6px 12px', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1}}
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin"/>
                    ) : (
                        <>
                            <Brain/>
                            Generate from AI
                        </>
                    )}
                </button>
            </div>
            <EditorProvider>
                <Editor 
                    value={editorValue} 
                    onChange={handleEditorChange}
                    className="min-h-[200px]"
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor
