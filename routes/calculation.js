const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Función que lee el archivo y parsea su contenido
function readValidationData() {
  const filePath = path.join(__dirname, "../data/validation_top2boxes.json"); // Ruta correcta al archivo
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Función que realiza el cálculo del Top 2 Boxes
function calculateTop2Boxes(data) {
  const optionFrequency = {};

  // A partir de aqui contamos las frecuencias de cada opción en los datos
  data.forEach((response) => {
    if (optionFrequency[response.optionId]) {
      optionFrequency[response.optionId].count += 1;
    } else {
      optionFrequency[response.optionId] = { count: 1, label: response.label };
    }
  });

  // Ordenar las opciones por frecuencia (de mayor a menor)
  const sortedOptions = Object.keys(optionFrequency)
    .map((optionId) => ({
      optionId,
      label: optionFrequency[optionId].label,
      frequencyCount: optionFrequency[optionId].count,
    }))
    .sort((a, b) => b.frequencyCount - a.frequencyCount); // De mayor a menor ordenamos las frecuencias

  // Tomamos las 2 opciones más frecuentes como se indicó en las instrucciones del github
  const top2Options = sortedOptions.slice(0, 2);

  // Calcular el puntaje de los Top 2 Boxes
  const totalResponses = data.length;
  const top2BoxesCount = top2Options.reduce(
    (acc, option) => acc + option.frequencyCount,
    0
  );
  const score = (top2BoxesCount / totalResponses).toFixed(4);

  // Forma de nuestra respuesta
  const response = {
    calculation: "top2boxes",
    sampleSize: totalResponses,
    totalParticipants: totalResponses,
    score: parseFloat(score),
    histogram: top2Options.map((option, index) => ({
      optionId: option.optionId,
      label: option.label,
      order: index + 1,
      frequencyCount: option.frequencyCount,
      frequencyPercentage: (option.frequencyCount / totalResponses).toFixed(4),
      sampleSize: totalResponses,
    })),
  };

  return response;
}

// Ruta POST /calculation/metric/top-2-boxes según lo indicado en el readme
router.post("/metric/top-2-boxes", (req, res) => {
  try {
    // La utilizamos para leer los datos del archivo validation_top2boxes.json
    const validationData = readValidationData();

    if (!Array.isArray(validationData) || validationData.length === 0) {
      return res
        .status(400)
        .json({ error: "The validation data file is empty or invalid" });
    }

    // Obteniendo los resultados
    const result = calculateTop2Boxes(validationData);

    // Finalmente respondemos con el resultado
    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
