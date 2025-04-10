import React, { useState } from 'react';

interface CustomerRegistration {
  name: string;
  cpf: number | string;
  email: string;
  password: string;
}

export const Login = () => {
  const [loginOrRegistration, setLoginOrRegistration] = useState<"login" | "registration">("login");
  const [dataClient, setDataClient] = useState<CustomerRegistration>({
    name: "",
    cpf: "",
    email: "",
    password: "",
  });

  const handleLoginClick = async () => {
    
    if(!dataClient.email || !dataClient.password){
      alert("Por favor insira um E-mail ou Senha")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: dataClient.email, password: dataClient.password }),
      });
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  const handleRegisterClick = async () => {

    if(!dataClient.email || !dataClient.password || !dataClient.cpf || !dataClient.name){
      alert("Por favor preencher todos os campos")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataClient),
      });
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  const handleSwitchToRegistration = () => {
    setLoginOrRegistration("registration");
  };

  const handleSwitchToLogin = () => {
    setLoginOrRegistration("login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-white shadow-lg rounded-lg">
      {loginOrRegistration === "login" ? (
        <div>
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
            <button onClick={handleSwitchToRegistration} className="text-blue-500 hover:underline">
              Cadastre-se
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl mb-4">Cadastro</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={dataClient.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={dataClient.cpf}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
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
            onClick={handleRegisterClick}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Cadastrar
          </button>
          <p className="mt-4 text-sm text-center">
            Já tem cadastro?{" "}
            <button onClick={handleSwitchToLogin} className="text-blue-500 hover:underline">
              Voltar ao Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};