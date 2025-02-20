import React, { useState, useEffect } from 'react';
import { BarChart, Users, BookOpen, Clock, Search, Edit2, Trash, Plus, Download } from 'react-feather';
import { useNavigate, Link } from 'react-router-dom';
import SyllabusUpload from './SyllabusUpload';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

    // Fetch dashboard data from the backend
    const fetchDashboard = async () => {
      try {
      const authToken = sessionStorage.getItem('authToken');
      if (!authToken) {
      navigate('/login');
       return;
      }

      console.log('Making request to /api/dashboard');
      const response = await fetch('/api/dashboard', {
          headers: {
          Authorization: `Bearer ${authToken}`,
          },
      });
      // console.log('Got response from /api/dashboard', response);
     
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to load dashboard');
       }

       const data = await response.json();
          setDashboardData(data);
      } catch (error) {
        setError(error.message);
      } finally {
          setLoading(false);
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
            setNotes(data.notes); // Set the fetched data to the state
       } catch (error) {
        setError(error.message)
      }
    };

  // Call fetchDashboard on component mount
    useEffect(() => {
      fetchDashboard();
       fetchNotes();
    }, []);

    const deleteNote = async (noteId) => {
        try {
          const authToken = sessionStorage.getItem('authToken');
            if(!authToken) {
               navigate('/login');
                return;
            }

           const response = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
              const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete the note');
            }
          setNotes(notes.filter((note) => note._id !== noteId));
          } catch (error) {
            setError(error.message)
          }
    };

   const saveNote = async () => {
    try {
       const authToken = sessionStorage.getItem('authToken');
        if(!authToken) {
            navigate('/login');
          return;
        }
        const response = await fetch(`/api/notes/${selectedNote._id}`, {
          method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
             },
            body: JSON.stringify({ content: selectedNote.content }),
        });
        if (!response.ok) {
           const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update the note');
        }
        setNotes(notes.map((note) =>
            note._id === selectedNote._id ? { ...note, content: selectedNote.content } : note
       ))
        alert(`Note "${selectedNote.noteType}" saved!`);
        setSelectedNote(null); // Close the editor
       } catch (error) {
         setError(error.message);
      }

  };

  const handleDownload = async (noteId) => {
      try {
          const authToken = sessionStorage.getItem('authToken');
          if (!authToken) {
              navigate('/login');
              return;
          }

          const response = await fetch(`/api/notes/download/${noteId}`, {
              headers: {
                  'Authorization': `Bearer ${authToken}`,
              },
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to download the PDF');
          }

           const blob = await response.blob();
           const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
           a.href = url;
            a.download = `note_${noteId}.pdf`;
           document.body.appendChild(a);
           a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

      } catch (error) {
        setError(error.message)
      }
  };

      if (loading) {
        return <div className="text-center text-gray-500 mt-8">Loading dashboard...</div>;
      }

      if (error) {
       return <div className="text-center text-red-500 mt-8">{error}</div>;
     }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-500">Total Notes</h2>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.totalNotes}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-500">Total Collaborators</h2>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.totalCollaborators}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-500">Last Edited</h2>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.lastEdited}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                  <BarChart className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-medium text-gray-500">Categories</h2>
                  <p className="text-2xl font-semibold text-gray-900">{dashboardData.categories}</p>
                </div>
              </div>
            </div>
          </div>
        )}
          
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Notes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   {notes.map((note) => (
                     <tr key={note._id} className="hover:bg-gray-50">
                         <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm font-medium text-gray-900">{note.noteType}</div>
                       </td>
                       <td className="px-6 py-4 ">
                             <div className="text-sm  text-gray-500 break-words">{note.content}</div>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => setSelectedNote(note)}>
                          <Edit2 className="h-5 w-5" />
                       </button>
                         <button className="text-red-600 hover:text-red-900" onClick={() => deleteNote(note._id)}>
                             <Trash className="h-5 w-5" />
                       </button>
                        <button onClick={() => handleDownload(note._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                               <Download className="h-5 w-5"/>
                        </button>
                       </td>
                     </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>

       {selectedNote && (
         <div className="bg-white rounded-lg shadow p-6">
           <h3 className="text-lg font-semibold text-gray-900 mb-4">Editing: {selectedNote.noteType}</h3>
           <textarea
             className="w-full h-40 p-2 border rounded-md mb-4 text-gray-900"
             value={selectedNote.content}
             onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
             placeholder="Enter your note content here..."
           />
             <button
               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                onClick={saveNote}
            >
             Save Note
           </button>
         </div>
       )}
     </div>
    </div>
  );
}
export default Dashboard;