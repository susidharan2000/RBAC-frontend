import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignTask = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const id = tab.split('/')[1];
    //console.log(id);
    const navigate = useNavigate();
    const [createTask, setCreateTask] = useState({
        title: '',
        category: '',
        description: ''
    });

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        category: Yup.string().required('Category is Required'),
        description: Yup.string().required('Description is Required')
    });

    const handleSubmit = async(values, { resetForm }) => {
        //console.log(values);
        try{
            const response = await axios.post(`https://rbac-backend-dxeh.onrender.com/api/task/create-task/${id}`,values,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                }
            });  
            console.log(response);
            if(response.status === 200){
                //console.log(response.data.message);
                navigate('/dashboard?tab=createtask');
            }
            
        }
        catch(err){
                    console.log(err);
                }
        // Reset form after submission
        resetForm();
    };

    const formik = useFormik({
        initialValues: createTask,
        validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <>
            <div>
                <h1 className='text-gray-500 text-3xl text-center'>Create Task</h1>
            </div>
            <form className='mt-10 px-20' onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-xl font-medium text-gray-600 dark:text-white text-start">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Title'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="mb-6">
                    <label htmlFor="category" className="block mb-2 text-xl font-medium text-gray-600 dark:text-white text-start">Select Category:</label>
                    <select
                        id="category"
                        name="category"
                        className="bg-gray-700 text-white rounded"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="UiDevelopment">UI Development</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-500">{formik.errors.category}</div>
                    ) : null}
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-xl font-medium text-gray-600 dark:text-white mt-10">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your description here..."
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500">{formik.errors.description}</div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-10"
                >
                    Create
                </button>
            </form>
        </>
    );
};

export default AssignTask;
