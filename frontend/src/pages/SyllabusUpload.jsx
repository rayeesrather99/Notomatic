import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SyllabusUpload() {
    const [file, setFile] = useState(null);
    const [noteType, setNoteType] = useState('summarized');
    const [academicLevel, setAcademicLevel] = useState('undergraduate');
    const [fontSize, setFontSize] = useState('16');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [language, setLanguage] = useState('english');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
  const fetchNotes = async () => {
    try {
      const authToken = sessionStorage.getItem('authToken');
      if(!authToken) {
          navigate('/login');
          return;
      }

      const response = await fetch('/api/notes/user', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
      });

       if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to load notes');
       }

       const data = await response.json();
        console.log("Data fetched successfully", data);

   } catch (error) {
        console.error("Error fetching notes", error);
     }
 };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a file.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
             formData.append('noteType', noteType);
            formData.append('academicLevel', academicLevel);
            formData.append('fontSize', fontSize);
            formData.append('fontFamily', fontFamily);
            formData.append('language', language);

            const response = await fetch('http://localhost:5000/api/syllabus/upload', {
                method: 'POST',
                 headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error ${response.status}`);
            }
              const data = await response.json()
              alert('Syllabus uploaded successfully! Notes generated Successfully!');
             await fetchNotes();
            // Reset form
            setFile(null);
            setNoteType('summarized');
            setAcademicLevel('undergraduate');
            setFontSize('16');
            setFontFamily('Arial');
            setLanguage('english');
             navigate("/dashboard");
        } catch (error) {
            console.error('Error uploading file:', error);
            alert(`File upload failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6">
                    <h1 className="text-2xl font-bold text-white">Upload Syllabus</h1>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Upload File */}
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <label htmlFor="file-upload" className="flex-shrink-0">
                            <div className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 cursor-pointer">
                                {file ? 'Change file' : 'Upload a file'}
                            </div>
                            <input id="file-upload" name="file" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        <div className="flex-grow">
                            {file ? (
                                <div className="flex items-center text-sm text-green-600">
                                    {file.name}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">PDF, TXT up to 10MB</p>
                            )}
                        </div>
                    </div>

                    {/* Other Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Note Type */}
                        <div className="space-y-2">
                            <label htmlFor="note-type" className="block text-sm font-medium text-gray-700">Note Type</label>
                            <select id="note-type" name="noteType" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200" value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                                <option value="summarized">Summarized</option>
                                <option value="detailed">Detailed</option>
                            </select>
                        </div>

                        {/* Academic Level */}
                        <div className="space-y-2">
                            <label htmlFor="academic-level" className="block text-sm font-medium text-gray-700">Academic Level</label>
                            <select id="academic-level" name="academicLevel" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200" value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)}>
                                <option value="undergraduate">Undergraduate</option>
                                <option value="graduate">Graduate</option>
                                <option value="phd">PhD</option>
                            </select>
                        </div>

                        {/* Font Size */}
                        <div className="space-y-2">
                            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">Font Size</label>
                            <select id="font-size" name="fontSize" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                            </select>
                        </div>

                        {/* Font Family */}
                        <div className="space-y-2">
                            <label htmlFor="font-family" className="block text-sm font-medium text-gray-700">Font Family</label>
                            <select id="font-family" name="fontFamily" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                            <select id="language" name="language" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors duration-200" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white font-bold rounded shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? 'Uploading...' : 'Generate Notes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SyllabusUpload;