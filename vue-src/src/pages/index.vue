<script lang="ts" setup>
import axios from 'axios';

const w = window;
</script>

<template>
  <div class="flex flex-col items-start">
    hello
    <v-btn color="primary" variant="outlined" @click="$router.push('/about')">
      Go to About
    </v-btn>

    <v-btn
      @click="() => axios.get('/').then(({ data }) => w.alert(data.hello))">
      Test Axios
    </v-btn>
  </div>
</template>
