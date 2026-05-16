import axios from "axios";

export const improveDescription = async (description: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama2", // o "mistral", "codellama", etc.
      prompt: `Mejora la siguiente descripción corrigiendo ortografía y redacción. No agregues información nueva. Devuelve solo la descripción mejorada sin explicaciones adicionales.

      Descripción original: "${description}"

      Descripción mejorada:`,
      stream: false,
    });

    const improvedDescription = response.data.response?.trim() || description;
    return improvedDescription;
  } catch (error) {
    console.error("Error improving description with Ollama:", error);
    return description;
  }
};
