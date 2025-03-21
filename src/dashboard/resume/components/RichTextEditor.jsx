import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState, useContext, useEffect } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIchatSession } from '../../../../service/AIModal';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const PROMPT = "Job Title: {positionTitle} , Depends on job title give me 5-7 bulllet points for my experience in resume, give me result in HTML format"

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

            parsedResponse.bulletPoints.forEach(section => {
                htmlContent += `<p><strong>${section.experienceLevel}:</strong></p><ul>`;
                section.bulletPoints.forEach(point => {
                    htmlContent += `<li>${point}</li>`;
                });
                htmlContent += '</ul>';
            });

            return htmlContent;
        } catch (error) {
            console.error('Parsing error:', error);
            return response; // Return original response if parsing fails
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
            
            // Format the response into HTML
            const formattedHTML = formatAIResponseToHTML(response);
            
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
