import { Button } from '@/components/ui/button';
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

            // Check if both required properties exist
            if (!parsedResponse.ExperienceLevel || !parsedResponse.bulletPoints) {
                throw new Error('Invalid response format');
            }

            // Loop through each experience level
            parsedResponse.ExperienceLevel.forEach(level => {
                // Check if this level exists in bulletPoints
                if (parsedResponse.bulletPoints[level] && Array.isArray(parsedResponse.bulletPoints[level])) {
                    htmlContent += `<p><strong>${level}:</strong></p><ul>`;
                    parsedResponse.bulletPoints[level].forEach(point => {
                        htmlContent += `<li>${point}</li>`;
                    });
                    htmlContent += '</ul>';
                }
            });

            // If no content was generated, throw an error
            if (!htmlContent) {
                throw new Error('No valid content found in response');
            }

            return htmlContent;
        } catch (error) {
            console.error('Parsing error:', error);
            // Return a more user-friendly format if parsing fails
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
            
            // Log the raw response for debugging
            console.log('Raw AI Response:', response);
            
            // Format the response into HTML
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
                <Button 
                    className="flex gap-2 border-primary text-primary"
                    onClick={GenerateSummaryFromAI} 
                    size="sm" 
                    variant="outline"
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
                </Button>
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
