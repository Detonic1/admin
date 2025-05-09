import React, { useState, useEffect } from 'react';
import '../styles/tailwind.css';

const API_BASE_URL_PAYMENT = 'http://localhost:8085';

const SignUp = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [csrfToken, setCsrfToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL_PAYMENT}/admin/csrf-token`, {
      credentials: 'include'
    })
      .then(res => {
        const token = res.headers.get("X-Csrf-Token");
        if (token) {
          setCsrfToken(token);
          document.cookie = `csrf_token=${token}; path=/; SameSite=Lax`;
        }
      })
      .catch(err => {
        console.error("❌ Failed to fetch CSRF token:", err);
        setGeneralError("Failed to initialize form.");
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber.replace(/[-()\s]/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setGeneralError('');

    try {
      const res = await fetch(`${API_BASE_URL_PAYMENT}/admin/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
          'x-api-key': 'adminkey-xyz-12345'
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          phone: formData.phoneNumber,
          role: formData.country
        })
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Account created! Redirecting to login...');
        onSwitch('login');
      } else {
        setGeneralError(result.error || '❌ Signup failed. Try again.');
      }
    } catch (error) {
      console.error("Signup error:", error);
      setGeneralError('❌ Network or server error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Create Your Account</h1>
          <p className="text-sm opacity-90">Fill in the form below to get started</p>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {generalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm font-medium text-center">
              {generalError}
            </div>
          )}

          {/* First Name and Last Name in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                placeholder="First Name" 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                placeholder="Last Name" 
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>
          </div>

          {/* Username and Phone Number in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                id="username"
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="Username" 
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.username ? 'border-red-500 bg-red-50' : ''}`} 
              />
              {errors.username && <div className="text-xs text-red-500 mt-1">{errors.username}</div>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber"
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                placeholder="Phone Number (optional)" 
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phoneNumber ? 'border-red-500 bg-red-50' : ''}`} 
              />
              {errors.phoneNumber && <div className="text-xs text-red-500 mt-1">{errors.phoneNumber}</div>}
            </div>
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email" 
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500 bg-red-50' : ''}`} 
            />
            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
          </div>

          {/* Role selection */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              id="country"
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            >
              <option value="">Select Role</option>
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
              <option value="Superadmin">Superadmin</option>
              <option value="Support">Support</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500 bg-red-50' : ''}`}
              />
              <button 
                type="button" 
                onClick={() => setPasswordVisible(!passwordVisible)} 
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
            {!errors.password && <div className="text-xs text-gray-500 mt-1">Must be at least 8 characters</div>}
          </div>

          {/* Confirm Password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.confirmPassword ? 'border-red-500 bg-red-50' : ''}`}
              />
              <button 
                type="button" 
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <div className="text-xs text-red-500 mt-1">{errors.confirmPassword}</div>}
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? 
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span> : 
              "Create Account"
            }
          </button>

          <p className="text-center mt-6 pt-4 border-t text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => onSwitch('login')} className="text-blue-600 font-medium hover:underline focus:outline-none">
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;