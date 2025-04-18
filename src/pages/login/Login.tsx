import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CustomerRegistration {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [dataClient, setDataClient] = useState<CustomerRegistration>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    const { email, password } = dataClient;

    if (!email || !password) {
      alert("Por favor, insira um E-mail e Senha");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        
        navigate("/dashboard"); // mandar para uma tela de sucesso, no caso real seria a home page
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={dataClient.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={dataClient.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleLoginClick}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <p className="mt-4 text-sm text-center">
        Ainda não tem cadastro?{" "}
        <button onClick={() => navigate("/register")} className="text-blue-500 hover:underline">
          Cadastre-se
        </button>
      </p>
    </div>
  );
};