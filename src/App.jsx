import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import HomePage  from "./pages/HomePage";
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {

  //add new job
  const addJob = async (newJob) => {
  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error adding job', error);
    return false;
  }
}

//delete job
const deleteJob = async (id) => {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error deleting job', error);
    return false;
  }
}

//update job
const updateJob = async (job) => {
  try {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error updating job', error);
    return false;
  }
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}> 
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/job/:id' element={<JobPage deleteJob={deleteJob}  />}  loader = { jobLoader }/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />}  loader = { jobLoader }/>
      </Route>
    </>
  )
);

  return <RouterProvider router={router} />
}

export default App
