const app = require('./app');

const PORT = process.env.PORT || 3001; // Alterado para 3001

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
