const express = require('express');
const stripe = require('stripe')('TU_CLAVE_SECRETA'); // Reemplaza con tu clave secreta de Stripe
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Endpoint para procesar el pago
app.post('/charge', async (req, res) => {
  try {
    const { token } = req.body;
    const charge = await stripe.charges.create({
      amount: 5000, // Monto en centavos, aquí sería $50.00 USD
      currency: 'usd',
      source: token.id,
      description: 'Prueba de pago'
    });
    res.status(200).send(charge);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
