import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface CustomerRegistration {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const [dataClient, setDataClient] = useState<CustomerRegistration>({
    name: "",
    cpf: "",
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

  const handleRegisterClick = async () => {
    const { name, cpf, email, password } = dataClient;

    if (!name || !cpf || !email || !password) {
      alert("Por favor preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataClient),
      });

      const data = await response.json();
      alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-white shadow-lg rounded-lg">
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
        <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline">
          Voltar ao Login
        </button>
      </p>
    </div>
  );
};