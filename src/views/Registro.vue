<template>
  <form class="container">
    <label for="Email">Email</label>
    <input type="email" name="email" v-model="form.email" placeholder="Email" />

    <label for="Clave">Cliente</label>
    <input
      type="password"
      name="password"
      v-model="form.password"
      placeholder="Clave"
    />

    <label for="Nombre">Nombre</label>
    <input
      type="text"
      name="nombre"
      v-model="form.nombre"
      placeholder="Nombre"
    />

    <label for="Apellido">Apellido</label>
    <input
      type="text"
      name="apellido"
      v-model="form.apellido"
      placeholder="Apellido"
    />

    <label for="Telefono">Telefono</label>
    <input
      type="number"
      name="telefono"
      v-model="form.telefono"
      placeholder="Telefono"
    />

    <button type="submit">Registrarse</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        telefono: "",
      },
    };
  },
};
</script>

<style scoped>
/* Full-width inputs */
input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Bordered form */
form {
  border: 3px solid #f1f1f1;
  margin-top: 2em;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

</style>