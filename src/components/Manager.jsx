import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer';
import Navbar from './Navbar';
const Manager = () => {
  const [form, setForm] = useState({ site: "", name: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([]);
  const [showPass, setshowPass] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;// Backend ka actual URL yahan daalo

const fetchPasswords = async () => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          toast.error("Please login first!");
          return;
      }

      let response = await fetch(`${BASE_URL}/api/passwords`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`
          }
      });

      if (!response.ok) {
          toast.error("Failed to load passwords.");
          return;
      }

      const data = await response.json();
      setpasswordArray(data); // ✅ Store only user's passwords
  } catch (error) {
      console.error("Error fetching passwords:", error);
      toast.error("An error occurred.");
  }
};


// ✅ Corrected useEffect Dependency
useEffect(() => {
  fetchPasswords();
}, []); // ✅ Remove `localStorage.getItem("token")` from dependency array

  const ref = useRef();
  const showPassword = () => {
    if (ref.current.src.endsWith("1741780233994.png")) {

      ref.current.src = "https://i.postimg.cc/SKgvsxLx/1741780265183.png"
      setshowPass(true)
    } else {
      ref.current.src = "https://i.postimg.cc/QtVnWZSk/1741780233994.png"
      setshowPass(false)
    }
  }
  
  const submitPass = async () => {
    if (!form.password) {
        toast.error("Password field cannot be empty", { position: "top-right", autoClose: 5000 });
        return;
    }

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You need to login first!");
            return;
        }

        if (form.id) { // ✅ If ID exists, update password
            let existingPass = passwordArray.find(pass => pass._id === form.id);

            let updateResponse = await fetch(`${BASE_URL}/api/passwords/${form.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    site: form.site || existingPass?.site,  // ✅ Preserve previous value
                    name: form.name || existingPass?.name,  // ✅ Preserve previous value
                    password: form.password || existingPass?.name,
                }),
            });

            const updateText = await updateResponse.text(); 
            console.log("🔍 Update Response:", updateText); 

            let data;
            try {
                data = JSON.parse(updateText); 
            } catch (err) {
                console.error("🚨 JSON Parse Error in Update:", err);
                toast.error("Invalid server response while updating.");
                return;
            }

            if (!updateResponse.ok) {
                toast.error(data.error || "Failed to update password.");
                return;
            }

            // ✅ Correctly update the password in the frontend
            setpasswordArray(prevPasswords =>
                prevPasswords.map(pass => 
                    pass._id === form.id 
                    ? { ...pass, site: form.site || pass.site, name: form.name || pass.name, password: form.password } 
                    : pass
                )
            );

            toast.success("Password updated successfully!", { position: "top-right", autoClose: 5000 });

        } else { // ✅ Otherwise, create a new password
            let response = await fetch(`${BASE_URL}/api/passwords`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    site: form.site,
                    name: form.name,
                    password: form.password
                }),
            });

            const responseText = await response.text(); 
            console.log("🔍 Save Response:", responseText); 

            let data;
            try {
                data = JSON.parse(responseText); 
            } catch (err) {
                console.error("🚨 JSON Parse Error in Save:", err);
                toast.error("Invalid server response while saving.");
                return;
            }

            if (!response.ok) {
                toast.error(data.error || "Failed to save password. Please try again.");
                return;
            }

            console.log("✅ New Password Added:", data); 

            setpasswordArray(prevPasswords => [...prevPasswords, data]); 

            toast.success("Password saved successfully!", { position: "top-right", autoClose: 5000 });
        }

        setForm({ site: "", name: "", password: "", id: "" }); // ✅ Reset form after success

    } catch (error) {
        console.error("🚨 Error in submitPass:", error);
        toast.error("An error occurred. Please try again.");
    }
};


  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  //   const selectedPass = passwordArray.find(pass => pass.id === id);

  //   if (!selectedPass) {
  //     toast.error("Password not found!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "dark",
  //     });
  //     return;
  //   }

  //   setForm(selectedPass); // ✅ Correctly set the form values

  //   toast.warn("You are trying to edit the password", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true
  //   let confirmDelete = window.confirm("Are you sure you want to delete this password?");

  //   if (!confirmDelete) return;

  //   try {
  //     // Optimistically update the UI
  //     setpasswordArray(prevPasswords => {
  //       const updatedPasswords = prevPasswords.filter(pass => pass.id !== id);
  //       // localStorage.setItem("passwords", JSON.stringify(updatedPasswords)); // ✅ Uses updated state
  //       setpasswordArray(updatedPasswords);
  //       return updatedPasswords;
  //     });

  //     const response = await fetch("http://localhost:3000/", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id })
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || "Failed to delete password");
  //     }

  //     toast.success("Password is deleted", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting password:", error);

  //     // Rollback UI change if request fails
  //     toast.error("Failed to delete password!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
const editPassword = (id) => {
    if (!passwordArray || passwordArray.length === 0) {
        toast.error("No passwords available to edit!", { position: "top-right", autoClose: 3000, theme: "dark" });
        return;
    }

    // ✅ Make sure _id is matched correctly
    const selectedPass = passwordArray.find(pass => String(pass._id) === String(id));

    if (!selectedPass) {
        toast.error("Password not found!", { position: "top-right", autoClose: 3000, theme: "dark" });
        return;
    }

    setForm({
        id: selectedPass._id, // ✅ Make sure _id is passed to form
        site: selectedPass.site,
        name: selectedPass.name,
        password: selectedPass.password, // Security ke liye password blank rakho
    });

    toast.warn("You are editing this password!", { position: "top-right", autoClose: 5000, theme: "dark" });
};


const deletePassword = async (id) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this password?");
  
  if (!isConfirmed) return; // ✅ Stop execution if user cancels
  
  if (!id) {
    console.error("Error: id is missing!");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    let response = await fetch(`${BASE_URL}/api/passwords`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }),  // ✅ Ensure correct id is sent
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error deleting password:", data.error);
      toast.error(data.error || "Failed to delete password.");
      return;
    }

    // ✅ Correct filter for updating state
    setpasswordArray(prevPasswords => prevPasswords.filter(pass => pass._id !== id));

    toast.success("Password deleted successfully!");
  } catch (error) {
    console.error("Error in deletePassword:", error);
    toast.error("An error occurred. Please try again.");
  }
};



  const copyPass = (pass) => {
    toast(' Copy to clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    navigator.clipboard.writeText(pass)
  }

  const isMobile = window.innerWidth <= 768;


  return (
<>
    <div className='flex flex-col items-center justify-center mt-4 h-auto'>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      // transition={Bounce}
      />
      <div className='bg-purple-500 md:w-[80%] w-[100%] h-auto p-5 rounded-xl main'>

        <div className='header flex flex-col items-center md:p-5 p-2 justify-center py-6'>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <lord-icon
              src="https://cdn.lordicon.com/maltvyiw.json"
              trigger="hover"
            >
            </lord-icon>
            <div>
              <span class="ml-3 text-3xl">pAsS</span> <span className='text-gray-800'>MaNgA</span>
            </div>
          </a>
          <p className='md:text-2xl text-xl text-bold text-white'>Your own password manager for personal use only</p>
          <p className='md:text-[15px] text-[10px] text-bold text-gray-900'>(Please refresh if your passwords are not showing or Not showing verified User)</p>
        </div>
        {/* inputs */}
        <div className='flex justify-center md:flex-row flex-col items-center gap-10'>
          <div className='flex flex-col'>
            <label htmlFor="Name" className='font-bold'>Name</label>
            <input type="text" onChange={handelChange} value={form.name} name="name" className='w-60 p-1 rounded-xl' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="website" className='font-bold'>Website</label>
            <input type="text" onChange={handelChange} value={form.site} name='site' className='w-80 p-1 rounded-xl' />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-bold">Password</label>
            <div className="relative w-80">
              <input type={showPass ? "text" : "password"} onChange={handelChange} value={form.password} name='password' className="w-full p-1 pr-12 rounded-xl border border-gray-300" />
              <div
                className="absolute right-3 flex items-center text-blue-500 cursor-pointer 
             top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-2"
                onClick={showPassword}
              >
                <img className="w-[25px]" ref={ref} src="https://i.postimg.cc/QtVnWZSk/1741780233994.png" alt="eye" />
              </div>

            </div>
          </div>

          <button className='bg-gray-800 text-white font-semibold w-28 p-1  mt-5 flex justify-center items-center rounded-xl
          'onClick={submitPass}>

            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#fff,secondary:#fffff"
            >
            </lord-icon>
            Save</button>
        </div>

        {/* table */}

        <div className='flex justify-center items-center mt-10 flex-col'>
          <h2 className='text-white font-semibold md:text-2xl text-xl p-2'>Your Saved Passwords</h2>
          {/*saved passwords */}
          <div className='text-gray-900 md:w-[80%] md:overflow-auto overflow-x-auto w-[100%] tableParent'>
            {/* No saved passwords yet  */}

            <table className="w-full border-collapse border border-gray-500">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-500 px-4 py-2">Website</th>
                  <th className="border border-gray-500 px-4 py-2">Name</th>
                  <th className="border border-gray-500 px-4 py-2">Password</th>
                  <th className="border border-gray-500 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
  {passwordArray && passwordArray.length > 0 ? (
    passwordArray.map((pass, index) => (
      <tr key={index} className="bg-white hover:bg-gray-100 transition-all">
        <td className="border border-gray-500 px-4 py-2">
          <a href={pass?.site || "#"} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {pass?.site || "No Site"}
          </a>
        </td>
        <td className="border border-gray-500 px-4 py-2">{pass?.name || "No Name"}</td>

        <td className={!isMobile ? "passMedia border border-gray-500 px-4 py-2" : "border border-gray-500 px-4 py-2"}>
          {"*".repeat(pass?.password?.length || 8)}
          <lord-icon
            src="https://cdn.lordicon.com/iykgtsbt.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#000000,secondary:#000000"
            className="w-6 h-6 cursor-pointer"
            onClick={() => { if (pass?.password) copyPass(pass.password); }}
          >
          </lord-icon>
        </td>
        
        <td className="border border-gray-500 px-4 py-2 text-center">
          <div className="flex justify-center items-center gap-4">
            <button onClick={() => pass?._id && editPassword(pass._id)} className="p-2 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
              <lord-icon
                src="https://cdn.lordicon.com/exymduqj.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#ffffff,secondary:#ffffff"
                className="w-6 h-6"
              >
              </lord-icon>
            </button>
            <button onClick={() => deletePassword(pass._id)} className="p-2 rounded-lg bg-red-500 hover:bg-red-700 text-white">
                            <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#ffffff,secondary:#ffffff"
                              className="w-6 h-6"
                            >
                            </lord-icon>
                          </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-4">Nothing to show</td>
    </tr>
  )}
</tbody>

            </table>

          </div>
        </div>

      </div>
      
    </div>
    </>
  )
}

export default Manager
