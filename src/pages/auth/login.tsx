import { useState } from "react";
import { loginURL } from "../../core/endpoints";
import { setToken } from "../../utilities/functions";
import useAuthenticationContext from "../../context/authenticationContext";
import useRoleContext from "../../context/roleContext";


interface FormData {
  email: string,
  password: string
}

const Login = (): React.ReactNode => {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const { login } = useAuthenticationContext();

  const { addRole } = useRoleContext();


  const postLoginData = async (loginObject: FormData) => {

    const data = await fetch(loginURL, {
      method: 'POST',
      body: JSON.stringify(loginObject),
        headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(resolved => {
      console.log('resolved', resolved);
      return resolved;
    })
    .catch(error => {
      console.log('error', error);
    });

    if (data.status === 'failed' || data.status === 'fail' && Array.isArray(data.errors)) {
      const groupedErrors: Record<string, string[]> = {};

      data.errors.forEach((err: any) => {
        console.log('in foreeach', err);
        if (!groupedErrors[err.path]) {
          groupedErrors[err.path] = [];
        }

        groupedErrors[err.path].push(err.msg);
      });

      setFieldErrors(groupedErrors);
      return;
    }

    setFieldErrors({});
    setFormData({
      email: '',
      password: '',
    });

    setToken(JSON.stringify(data));
    login(data.user.id, data.user.name, data.user.email);
    addRole(data.user.role);
  }


  const submitLoginForm = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await postLoginData(formData);
  }

  const handleInputChange = (field: string, value: string) => {
    // Update your form state (not shown here)
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear the error for this field if it exists
    setFieldErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[field]) {
        delete newErrors[field];
      }
      return newErrors;
    });
  };


  return (
    <form
      onSubmit={submitLoginForm}
      className="flex flex-col items-center justify-center max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2 w-full text-center">
        Login
      </h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {fieldErrors.email && fieldErrors.email.map((err, idx) => (
        <p key={idx} className="w-full mb-1 text-sm text-red-600 font-medium">{err}</p>
      ))}

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {fieldErrors.password && fieldErrors.password.map((err, idx) => (
        <p key={idx} className="w-full mb-1 text-sm text-red-600 font-medium">{err}</p>
      ))}

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-medium"
      >
        Login
      </button>
    </form>
  )
}

export default Login;