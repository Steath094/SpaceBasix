import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { profileAtom } from "../store/profileAtom";
import { userStatusAtom } from "../store/userStatusAtom";
import { refreshAtom } from "../store/student";
import { backendUrl } from '../config';

const Signup = () => {
  const setRefresh = useSetRecoilState(refreshAtom
    );
  const formRef = useRef({
    name: "",
    email: "",
    password: "",
    hostelName: "",
    institute: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const setProfile = useSetRecoilState(profileAtom);
  const setUserStatus = useSetRecoilState(userStatusAtom);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formRef.current.name) errors.name = "Name is required";
    if (!formRef.current.email) errors.email = "Email is required";
    if (!formRef.current.password) errors.password = "Password is required";
    if (!formRef.current.hostelName) errors.hostelName = "Hostel Name is required";
    if (!formRef.current.institute) errors.institute = "Institute is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const { name, email, password, hostelName, institute } = formRef.current;
      const response = await axios.post(`${backendUrl}/api/admin/register`, {
        name,
        email,
        password,
        hostelName,
        institute,
      });

      const user = response.data;

      setProfile(user);
      setUserStatus({ islogin: true, role: "admin" });
      localStorage.setItem("profile", JSON.stringify(user));
      localStorage.setItem("userStatus", JSON.stringify({ islogin: true, role: "admin" }));
      setRefresh(prev => prev + 1);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error registering user", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4 py-10">
      <div className="bg-white shadow-md rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Left form section */}
        <div className="w-full lg:w-1/2 lg:pr-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Sign up</h2>
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            {[
              { name: "name", label: "Your Name", icon: "fas fa-user", type: "text" },
              { name: "email", label: "Your Email", icon: "fas fa-envelope", type: "email" },
              { name: "password", label: "Password", icon: "fas fa-lock", type: "password" },
              { name: "hostelName", label: "Hostel Name", icon: "fas fa-building", type: "text" },
              { name: "institute", label: "Institute", icon: "fas fa-university", type: "text" },
            ].map(({ name, label, icon, type }) => (
              <div key={name} className="mb-4">
                <label className="block mb-1 text-gray-700">
                  <i className={`${icon} mr-2`} />
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={label}
                />
                {formErrors[name] && (
                  <p className="text-red-500 text-sm">{formErrors[name]}</p>
                )}
              </div>
            ))}

            {/* Terms */}
            <div className="mb-6 flex items-center text-sm">
              <input type="checkbox" className="mr-2" required />
              <label className="text-gray-600">
                I agree to all statements in{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms of Service
                </a>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin border-4 border-t-4 border-blue-600 rounded-full w-6 h-6 mx-auto"></div>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>

        {/* Right illustration section */}
        <div className="w-full lg:w-1/2 hidden sm:flex flex-col items-center justify-center mt-10 lg:mt-0">
          <img
            src="/Images/signup-image.jpg"
            alt="Signup illustration"
            className="w-3/4 max-w-xs"
          />
          <a
            href="/login"
            className="mt-6 text-sm text-blue-700 underline hover:text-blue-900"
          >
            I am already a member!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
