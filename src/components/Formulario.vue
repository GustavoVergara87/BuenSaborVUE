<template>
  <div>
    <b-form @submit="onSubmit">
      <table>
        <tr>
          <td class="primera_columna">
            <template v-for="(value, propertyName, index) in formTemplate">
              <template v-if="value == 'text' || value == 'number'">
                <b-form-group :label="propertyName" :key="index">
                  <b-form-input
                    v-model="form[propertyName]"
                    :type="value"
                    required
                  ></b-form-input>
                </b-form-group>
              </template>

              <template v-if="value == 'boolean'">
                <b-form-group :key="index">
                  <b-form-checkbox
                    v-model="form[propertyName]"
                    value="true"
                    unchecked-value="false"
                    >{{ propertyName }}</b-form-checkbox
                  >
                </b-form-group>
              </template>
            </template>
          </td>
          <td class="segunda_columna">
            <template v-for="(value, propertyName, index) in formTemplate">
              <template v-if="value == 'image'">
                <b-form-group :label="propertyName" :key="index">
                  <input @change="imageModel" type="file" accept="image/*" />
                </b-form-group>
              </template>
            </template>
            <b-img :src="imagenPreview" fluid :alt="imagenPreview"></b-img>
          </td>
        </tr>
      </table>

      <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
      <b-button type="button" @click="onReset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["formTemplate", "formACargar","imageApiProxy"],
  data() {
    return {
      form: null,
      imagenPreview: null,
      imagenArchivo: null,
    };
  },
  methods: {
    imageModel({ target }) {
      this.imagenPreview = URL.createObjectURL(target.files[0]);
      this.imagenArchivo = target.files[0];
      this.form.Imagen = this.imagenArchivo.name;
    },

    onSubmit(event) {
      event.preventDefault();
      if (this.$route.params.id) this.form.id = this.$route.params.id;
      this.$emit("form-submited", {
        json: this.form,
        imagen: this.imagenArchivo,
      });
    },

    onReset() {
      for (const prop in this.form) {
        for (const propTipo in this.formTemplate) {
          if (prop.toUpperCase() == propTipo.toUpperCase()) {
            switch (this.formTemplate[propTipo]) {
              case "text":
                this.form[prop] = "";
                break;
              case "number":
                this.form[prop] = 0;
                break;
              case "boolean":
                this.form[prop] = false;
                break;
              case "image":
                this.form[prop] = "";
                break;
            }
          }
        }
      }
      this.imagenPreview = null;
      this.imagenArchivo = null;
      // Trick to reset/clear native browser form validation state(?)
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.formTemplate));
    this.onReset();
  },
  watch: {
    formACargar: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler() {
        //handler(val, oldVal) {
        for (const x in this.form) {
          for (const y in this.formACargar) {
            if (x.toUpperCase() == y.toUpperCase()) {
              this.form[x] = this.formACargar[y];
            }
          }
        }

        for (const prop in this.form) {
          for (const propTipo in this.formTemplate) {
            if (prop.toUpperCase() == propTipo.toUpperCase()) {
              if (this.formTemplate[propTipo] == "image") {
                this.imagenPreview = this.imageApiProxy + this.form[prop];
              }
            }
          }
        }
      },
    },
  },
};
</script>

<style scoped>
.segunda_columna {
  padding: 1em;
}
.primera_columna {
  padding: 1em;
  width: 100%;
}
</style>