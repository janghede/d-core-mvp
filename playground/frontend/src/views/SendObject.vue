<script setup lang="ts">
import { z, ZodIssue } from "zod";
import axios, { AxiosError } from "axios";
import { ZUser } from "@app-shared/interface/sendObject.interface";
import { getIssues, isZodIssueArray } from "@app-shared/utils/zod.util";
import { ref } from "vue";

// User
type TUser = z.infer<typeof ZUser>;
const user = ref<TUser>({
  id: "",
  email: "",
});

// Validation
const validationOk = ref(false);
const validationIssues = ref<ZodIssue[]>();
const getValidationIssues = (key: keyof TUser) => getIssues(key, validationIssues.value);
const validatePayload = () => {
  validationIssues.value = undefined;
  const ZResult = ZUser.safeParse(user.value);
  if (!ZResult.success) {
    validationIssues.value = ZResult.error.issues;
  } else {
    validationOk.value = true;
  }
}

// Send
const sendSuccess = ref<boolean | undefined>(undefined);
const sendPayload = () => {
  sendSuccess.value = undefined;
  validationIssues.value = undefined;
  axios.post("http://localhost:3003/api/sendObject", user.value).then(() => {
    sendSuccess.value = true;
  }).catch((err: AxiosError) => {
    if (isZodIssueArray(err.response?.data)) {
      validationIssues.value = err.response.data;
    }
    sendSuccess.value = false;
  })
}


</script>

<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>
            <input v-model="user.id" type="text" placeholder="id" :disabled="validationOk" />
          </td>
        </tr>
        <tr v-for="issue of getValidationIssues('id')">
          <td>
            <span style="color: red;">
              {{ issue }}
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <input v-model="user.email" type="text" placeholder="email" :disabled="validationOk" />
          </td>
        </tr>
        <tr v-for="issue of getValidationIssues('email')">
          <td>
            <span style="color: red;">
              {{ issue }}
            </span>
          </td>
        </tr>
        <tr v-if="!validationOk">
          <td>
            <button @click="validatePayload">Validate</button>
          </td>
          <td>
            <button @click="sendPayload">Send w/o f/e validation</button>
          </td>
        </tr>
        <tr v-else>
          <td>
            <button @click="sendPayload">Send</button>
          </td>
          <td>
            <button @click="validationOk = !validationOk">Reset</button>
          </td>
        </tr>
        <tr v-if="sendSuccess == true">
          <td>
            <span style="color: green;">
              Success.
            </span>
          </td>
        </tr>
        <tr v-else-if="sendSuccess == false">
          <td>
            <span style="color: red;">
              Something went wrong.
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
