import { TextInput, Alert } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  SignOutSuccess,
  UpadateStart,
  UpadateSuccess,
  UpdateFailure,
} from "../Redux/Slice/UserSlice";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import axios from "axios";
const DashboardProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //states for upload image to firebase
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState();
  const filePickerRef = useRef();
  //states fro updating userdata
  const [formData, setFormdata] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdataUserSuccess] = useState(null);
  const [updateUserError, setUpdataUserError] = useState(null);
  //password validation
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
});
const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  //image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //firebase image upload and storage part
  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true);
    const storage = getStorage(app);
    const filename = new Date().getDate() + imageFile.name;
    const storageref = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageref, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0)); //10.6794764
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload the image (File size must be less than 2MB"
        );
        setImageFileUrl(null);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormdata({ ...formData, profilePic: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    //passowrd validation for form data
    setPasswords({
      ...passwords,
      [e.target.id]: e.target.value
  });

  // Check if passwords match
  if (e.target.id === 'confirm_password') {
      setPasswordMatch(e.target.value === passwords.newPassword);
  }
    setFormdata({ ...formData, [e.target.id === 'confirmPassword' ? 'password': e.target.id]: e.target.value });
  };

  //update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
  }
    try {
      dispatch(UpadateStart());
      const token = localStorage.getItem("Token"); // Retrieve token from localStorage
      const response = await axios.put(
        `https://rbac-backend-dxeh.onrender.com/api/user/updateprofile/${currentUser.rest._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      if (response.status === 200) {
        dispatch(UpadateSuccess(response.data));
        setUpdataUserSuccess("User Updated Successfully");
        console.log("success");
      } else {
        dispatch(UpdateFailure(response.data.message));
        setUpdataUserError(response.data.message);
      }
    } catch (error) {
      dispatch(UpdateFailure(error.message));
      setUpdataUserError(error.message);
    }
  };
  return (
    <div className="flex-grow flex items-center justify-center border-b-2 border-gray-300 shadow-md mt-10">
  <div className="w-full text-center">
    <div className="max-w-lg mx-auto text-center p-4 w-full border border-gray-300 rounded-lg shadow-md">
    <div className="flex-grow flex items-center justify-center border-b-2">
    <div className="w-full text-center">
      <div className="max-w-lg mx-auto text-center p-4 w-full">
        <h1 className="my-7 text-center font-semibold text-4xl">{currentUser.rest.username}</h1>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleImageChange}
          />
          <div
            className="cursor-pointer flex flex-col gap-5 relative justify-center items-center"
            onClick={() =>
              filePickerRef.current && filePickerRef.current.click()
            }
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,190,${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <div className="w-40 h-40 flex justify-center items-center mb-4 mt-4">
              <img
                src={imageFileUrl || currentUser.rest.profilePic}
                alt="user"
                className={`rounded-full object-cover border-8 border-[lightgray] ${
                  imageFileUploadProgress &&
                  imageFileUploadProgress < 100 &&
                  "opacity-40"
                }`}
              />
            </div>

            {imageFileUploadError && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="mt-5"
              >
                <span className="font-medium me-2">🥴OOPS!</span>
                {imageFileUploadError}
              </Alert>
            )}
          </div>
          <div class="mb-6">
        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">User Name</label>
        <input type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required onChange={handleChange}
            defaultValue={currentUser.rest.username}/>
    </div> 
          <div class="grid gap-6 mb-6 md:grid-cols-2 text-start">
          <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="fname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required onChange={handleChange}defaultValue={currentUser.rest.fname}/>
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="lname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required onChange={handleChange} defaultValue={currentUser.rest.lname}/>
        </div>
        <div class="">
    <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
    <select onChange={(e)=>setFormdata({...formData,gender:e.target.value})} id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.gender || currentUser.rest.gender}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
    </select>
</div>
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="number" id="phonenumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required onChange={handleChange} defaultValue={currentUser.rest.phonenumber}/>
        </div>
        </div>
        <div class="mb-6">
        <label for="experiance" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Experiance</label>
        <input type="number" id="experiance" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg.0-3" required onChange={handleChange} defaultValue={currentUser.rest.experiance}/>
    </div> 
        <div class="mb-6">
        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Address</label>
        <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required onChange={handleChange} defaultValue={currentUser.rest.address}/>
    </div> 
        <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Email address</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required onChange={handleChange}
            defaultValue={currentUser.rest.email}/>
    </div> 
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">New Password</label>
        <input type="password" id="newPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required value={passwords.newPassword} onChange={handleChange}/>
    </div> 
    <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Confirm password</label>
        <input type="password" id="confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required value={passwords.confirmPassword} onChange={handleChange}/>
    </div> 
    {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match!</p>}
          <button
            type="submit"
            className="mt-5 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={loading || imageFileUploading}
          >
            {loading ? "loading..." : "update"}
          </button>
        </form>
        {updateUserSuccess && (
          <Alert color="success" icon={HiInformationCircle} className="mt-5">
            <span className="font-medium me-2">🤗 Yheeee</span>
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" icon={HiInformationCircle} className="mt-5">
            <span className="font-medium me-2">🤗 Yheeee</span>
            {updateUserError}
          </Alert>
        )}
      </div>
      {/* {
          error && (<Alert color="failure" icon={HiInformationCircle} className="mt-5">
          <span className="font-medium me-2">🤗 Yheeee</span>
        {error}
        </Alert>)
        } */}
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DashboardProfile;
